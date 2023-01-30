import { useRef, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DetailsPage from "../DetailsPage";
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
  const router = useRouter();

  console.log("result 1", result);

  // const { data } = useSWR(
  //   result ? `https://de.openfoodfacts.org/api/v0/product/${result}.json` : null
  // );

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
      {/* {scanning ? ( */}
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
      {/* ) : (
         <DetailsPage data={data} />
       )} */}
    </>
  );
}
