import { useAtom } from "jotai";
import Image from "next/image";
import styled from "styled-components";
import { initialProducts } from "../product/[code]";

const StyledImage = styled(Image)`
  margin: 2rem;
  width: 25%;
  height: 25%;
  object-fit: cover;
`;

export default function Products() {
  const [products] = useAtom(initialProducts);
  console.log("products", products);
  return (
    <>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.code}>
              {product.name}
              <StyledImage
                width={1000}
                height={1000}
                src={product.url}
                alt={product.name}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
