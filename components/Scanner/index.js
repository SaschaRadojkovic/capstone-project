//copied from https://github.com/ericblade/quagga2-react-example/blob/master/src/components/Scanner.js
import { useCallback, useLayoutEffect } from "react";
import Quagga from "@ericblade/quagga2";



function getMedian(arr) {
  const myArray = [...arr].sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
  const errors = decodedCodes
    .filter((x) => x.error !== undefined)
    .map((x) => x.error);
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}
// function onCapabilitiesReady(capabilities) {  
//   if (capabilities.torch) {
//     track.applyConstraints({
//       advanced: [{torch: true}]
//     })
//     .catch(e => console.log(e));
//   }
// }

const defaultConstraints = {
  aspectRatio: { ideal: 1 },
  width: 300,
  height: 300,
};

const defaultLocatorSettings = {
  patchSize: "medium",
  halfSample: true,
};

const defaultDecoders = ["ean_reader"];

function Scanner({
  onDetected,
  scannerRef,
  onScannerReady,
  cameraId,
  facingMode = "environment",
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  numOfWorkers = 0,
  decoders = defaultDecoders,
  locate = true,
  torch = false,
  errorRate = 0.5,
}) {
  const errorCheck = useCallback(
    (result) => {
      if (!onDetected) {
        return;
      }
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 90% certain that it read correctly, then accept the code.
      if (err < errorRate) {
        onDetected(result);
        // If detected; Further actions here
      }
    },
    [onDetected, errorRate]
  );

  useLayoutEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            ...constraints,
            ...(cameraId && { deviceId: cameraId }),
            ...(!cameraId && { facingMode }),
            ...(torch && { torch: true }),
          },
          target: scannerRef.current,
        },
        locator,
        numOfWorkers,
        decoder: { readers: decoders },
        locate,
     
      },
      (err) => {
        if (err) {
          return;
        }
        if (scannerRef && scannerRef.current) {
          Quagga.start();
          if (torch) {
            Quagga.CameraAccess.enableTorch();
          }
          if (onScannerReady) {
            onScannerReady();
          }
        }
      }
    );

    Quagga.onDetected(errorCheck);

    return () => {
      Quagga.offDetected(errorCheck);
      Quagga.stop();
    };
  }, [
    constraints,
    cameraId,
    facingMode,
    scannerRef,
    locator,
    numOfWorkers,
    decoders,
    locate,
    errorCheck,
    onScannerReady,
  ]);
  return null;
}

export default Scanner;
