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
  const [torchOn, setTorchOn] = useState(true);

  const canvasRef = useRef(null);
  //https://www.kirupa.com/canvas/canvas_high_dpi_retina.htm
  useEffect(() => {

    function handleResize() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { width, devicePixelRatio } = getWindowDimensions();
      const size = width;
      setWidth(size);

      setheight(size);
      ctx.scale(devicePixelRatio, devicePixelRatio);
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

  const handleClick = () => {
    setTorchOn(!torchOn);
  };

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

        <Scanner
          errorRate={0.55}
          scannerRef={scannerRef}
          onDetected={handleDetected}
          constraints={{ width, height }}
          torch={true} 
        />
          <button onClick={handleClick} style={{marginLeft:400}}>
        {torchOn ? "Turn Torch Off" : "Turn Torch On"}
      </button>
      </>
    </>
  );
}
