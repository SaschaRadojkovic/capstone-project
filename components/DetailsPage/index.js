// import styled from "styled-components";
// import { useBarcodeScanner } from "../BarcodeScanner";
// import Image from "next/image";
// import useSWR from "swr";

// const StyledImage = styled(Image)`
//   width: 25%;
//   height: 25%;
//   object-fit: cover;
// `;

// export default function DetailsPage(data) {
//   const { scanning, setScanning, result, setResult } = useBarcodeScanner();
//   console.log("scanning", scanning);
//   const { data } = useSWR(
//     result ? `https://de.openfoodfacts.org/api/v0/product/${result}.json` : null
//   );

//   return (
//     <>
//       <button
//         onClick={() => {
//           setScanning(true);
//           setResult(null);
//         }}
//       >
//         Try again!
//       </button>

//       {/* Found Product */}

//       {data && data.product && (
//         <>
//           <p>{data.product.product_name} </p>

//           <StyledImage
//             width={1000}
//             height={1000}
//             src={data.product.image_front_url}
//             alt={data.product.product_name}
//           />

//           <p>{data.product.brands} </p>
//         </>
//       )}
//     </>
//   );
// }
