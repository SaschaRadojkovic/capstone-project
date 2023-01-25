import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <Link href="/barcodeScanner">scan</Link>&nbsp;
      <Link href="/settings">settings</Link>
    </>
  );
}
