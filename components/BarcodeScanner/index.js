import { useRef, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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
  const [, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const scannerRef = useRef(null);

  function handleDetected(_result) {
    setResult(_result.codeResult.code);
    setScanning(false);
    router.push(`/product/${_result.codeResult.code}`);
  }

  return (
    <>
      {result && <p>{result}</p>}
      {/*Scanner Logic optimizable? */}
      <>
        <StyledSection ref={scannerRef}>
          {/*class name drawing buffer is used by quagga
           https://github.com/ericblade/quagga2/search?q=drawingBuffer */}
          <StyledCanvas className="drawingBuffer" width="640" height="480" />
        </StyledSection>

        <Scanner
          errorRate={0.55}
          scannerRef={scannerRef}
          onDetected={handleDetected}
        />
      </>
    </>
  );
}
