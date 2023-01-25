"use client";
import { Inter } from "@next/font/google";
import Scanner from "@/components/scanner";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const [currentBarcode, setCurrentBarcode] = useState(null);
  //   const { width, height } = useWindowDimensions();
  const scannerRef = useRef(null);

  function onDetected(result) {
    setResults([...results, result]);
    console.log("result", result);
    const currentBarcodeValue = result;
    setCurrentBarcode(currentBarcodeValue);
    console.log("currentBarcode", currentBarcode);
    // console.log("currentBarcode", currentBarcodeValue);

    setScanning(false);
  }

  const { data, error, isLoading } = useSWR(
    `https://de.openfoodfacts.org/api/v0/product/${currentBarcode}.json`,
    fetcher
  );
  console.log("data", data);

  useLayoutEffect(() => {
    setScanning(true);
    if (currentBarcode) {
    }
  }, [currentBarcode]);

  return (
    <>
      <button onClick={() => setScanning(!scanning)}>
        {scanning ? "Stop" : "Start"}
      </button>
      <ul className="results">
        {results.map(
          (result) =>
            result.codeResult && (
              <li key={result.codeResult.code}>{result.codeResult.code}</li>
            )
        )}
      </ul>
      <div suppressHydrationWarning={true}>
        {typeof window && (
          <div
            ref={scannerRef}
            style={{ position: "relative", border: "3px solid red" }}
          >
            {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
            <canvas
              className="drawingBuffer"
              style={{
                position: "absolute",
                top: "0px",
                // left: '0px',
                height: "100%",
                // width: '100%',
                border: "3px solid green",
              }}
              width="640"
              height="480"
            />
            {scanning ? (
              <Scanner scannerRef={scannerRef} onDetected={onDetected} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
