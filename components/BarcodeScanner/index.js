import { useRef, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";
import dynamic from "next/dynamic";
const Scanner = dynamic(() => import("@/components/Scanner"), {
  nossr: true,
});

const StyledSection = styled.section`
  position: relative;
  overflow: hidden;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0px;
  height: 100%;
`;

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);

  const { data } = useSWR(
    result ? `https://de.openfoodfacts.org/api/v0/product/${result}.json` : null
  );

  const scannerRef = useRef(null);

  function handleDetected(_result) {
    setResult(_result.codeResult.code);
    setScanning(false);
  }

  return (
    <>
      {result && <p>{result}</p>}
      {/*Scanner Logic optimizable? */}
      {scanning ? (
        <>
          <StyledSection ref={scannerRef}>
            <StyledCanvas className="drawingBuffer" width="640" height="480" />
          </StyledSection>
          <Scanner
            errorRate={0.55}
            scannerRef={scannerRef}
            onDetected={handleDetected}
          />
        </>
      ) : (
        <button onClick={() => setScanning(true)}>Try again!</button>
      )}

      {/* Found Product */}

      {data && (
        <>
          <p>{data.product.product_name} </p>

          <Image
            width={1000}
            height={1000}
            style={{ width: "25%", height: "25%", objectFit: "cover" }}
            src={data.product.image_front_url}
            alt={data.product.product_name}
          />

          <p>{data.product.brands} </p>
        </>
      )}
    </>
  );
}
