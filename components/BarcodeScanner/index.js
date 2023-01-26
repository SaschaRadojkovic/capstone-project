"use client";
import { Inter } from "@next/font/google";
import Scanner from "@/components/Scanner";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

const StyledSection = styled.section`
  // border: 3px solid red;
  position: relative;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0px;
  height: 100%;
  // border: 3px solid green;
`;

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
  const [result, setResult] = useState(null);
  const { data, error, isLoading } = useSWR(
    result
      ? `https://de.openfoodfacts.org/api/v0/product/${result}.json`
      : null,
    fetcher
  );
  // console.log("data", data);

  //   const { width, height } = useWindowDimensions();
  const scannerRef = useRef(null);

  function onDetected(_result) {
    setResult(_result.codeResult.code);
    // console.log("result", JSON.stringify(_result));

    setScanning(false);
  }
  useEffect(() => {}, [result]);

  useLayoutEffect(() => {
    setScanning(true);
  }, []);

  return (
    <>
      <button onClick={() => setScanning(!scanning)}>
        {scanning ? "Stop" : "Start"}
      </button>

      {result && <p>{result}</p>}

      <article suppressHydrationWarning={true}>
        {typeof window && (
          <StyledSection ref={scannerRef}>
            {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
            <StyledCanvas className="drawingBuffer" width="640" height="480" />
            {scanning ? (
              //vor testers in capstone,please be aware that the numbers that are scanned are not always correct.
              //Scan it again until you get the correct number. later when fetching the api it will be an output e.g. "no product found scan again"
              //that result can later be modified with the errorRate.maybe the user will get option to adjust his scanner related to his device/camera.
              <Scanner
                errorRate={0.55}
                scannerRef={scannerRef}
                onDetected={onDetected}
              />
            ) : null}
          </StyledSection>
        )}
      </article>
    </>
  );
}
