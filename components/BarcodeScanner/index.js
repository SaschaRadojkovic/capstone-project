import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getWindowDimensions } from "../BGImage";
const Scanner = dynamic(() => import("@/components/Scanner"), {
  nossr: true,
});

const StyledSection = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
`;

const StyledCanvas = styled.canvas`
  border-radius: 0.4rem;
  position: absolute;
`;

export default function BarcodeScanner() {
  const [, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const router = useRouter();
  const [width, setWidth] = useState();
  const [height, setheight] = useState();
  const [pixelRatio, setPixelRatio] = useState();
  const canvasRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { width, height, devicePixelRatio } = getWindowDimensions();
      console.log("dpr", devicePixelRatio);
      const size = width * 0.9; //((width / devicePixelRatio) * 1.8);
      setWidth(size);

      setheight(size);
      ctx.scale(devicePixelRatio, devicePixelRatio);
      setPixelRatio(devicePixelRatio);
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
          <StyledCanvas
            ref={canvasRef}
            className="drawingBuffer"
            width={width}
            height={height}
          />
        </StyledSection>
        pr: {pixelRatio}
        w: {width}
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
