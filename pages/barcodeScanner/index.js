import Head from "next/head";
import BarcodeScanner from "@/components/BarcodeScanner";
import dynamic from "next/dynamic";
const BgImage = dynamic(() => import("@/components/BGImage"), {
  ssr: false,
});

export default function BarcodeScannerPage() {
  return (
    <>
      <BarcodeScanner />
    </>
  );
}
