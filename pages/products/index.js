import { SVGIcon } from "@/components/SVGIcon";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { initialProducts } from "../product/[code]";

const StyledAllCards = styled.div`
  margin-left: 0.4rem;
  width: 97vw;
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;
const StyledImage = styled(Image)`
  width: 135px;
  height: 135px;
  object-fit: contain;
`;
const StyledProductCard = styled.section`
  witdh: 50%;
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: 1px 4px 10px 1px rgb(127, 133, 136);
`;
const StyledProductName = styled.h2`
  border-radius: 0.4rem 0.4rem 0 0;
  background: #ffcc80;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
`;

const StyledDeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: inherit;
`;

const StyledLink = styled(Link)`
  color: inherit;
`;

const StyledButtonPosition = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function Products() {
  const [products, setProducts] = useAtom(initialProducts);
  const router = useRouter();

  return (
    <>
      <StyledAllCards>
        {products.map((product) => {
          return (
            <StyledProductCard key={product.code}>
              <StyledProductName>{product.name}</StyledProductName>
              <StyledButtonPosition>
                <StyledLink href={`/product/${product.code}`}>
                  <SVGIcon variant="details" width="26px" />
                </StyledLink>
                <StyledDeleteButton
                  variant="delete"
                  width="30px"
                  type="button"
                  onClick={() => {
                    if (products.length === 1) {
                      setProducts(RESET);
                    } else {
                      const newProducts = products.filter(
                        (item) => item.name !== product.name
                      );
                      setProducts(newProducts);
                    }
                  }}
                >
                  <SVGIcon variant="delete" width="26px" />
                </StyledDeleteButton>
              </StyledButtonPosition>
              <div>
                <StyledImage
                  width={1000}
                  height={1000}
                  src={product.url}
                  alt={product.name}
                />
              </div>
            </StyledProductCard>
          );
        })}
      </StyledAllCards>
    </>
  );
}
