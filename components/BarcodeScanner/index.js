import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getWindowDimensions } from "../BGImage";
const Scanner = dynamic(() => import("@/components/Scanner"), {
  nossr: true,
});

const StyledSection = styled.div`
  // white-space: nowrap;
`;

const StyledCanvas = styled.canvas`
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50px;
`;

export default function BarcodeScanner() {
  const [, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const router = useRouter();
  const [width, setWidth] = useState();
  const [height, setheight] = useState();

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions();

      setWidth(width);

      setheight(height);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scannerRef = useRef(null);

  function handleDetected(_result) {
    setResult(_result.codeResult.code);
    setScanning(false);
    router.push(`/product/${_result.codeResult.code}`);
  }
  console.log("width", width);
  return (
    <>
      {result && <p>{result}</p>}
      {/*Scanner Logic optimizable? */}
      <>
        <StyledSection ref={scannerRef}>
          {/*class name drawing buffer is used by quagga
           https://github.com/ericblade/quagga2/search?q=drawingBuffer */}
          <StyledCanvas className="drawingBuffer" />
        </StyledSection>

        <Scanner
          errorRate={0.55}
          scannerRef={scannerRef}
          onDetected={handleDetected}
          constraints={{ width, height }}
        />
      </>
    </>
  );
}
