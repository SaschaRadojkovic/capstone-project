import { SVGIcon } from "@/components/SVGIcon";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

const StyledAllCards = styled.div`
  margin-left: 0.4rem;
  width: 97vw;
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
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
  height: 2.3rem;
  border-radius: 0.4rem 0.4rem 0 0;
  background: #ffcc80;
  padding: 0.5rem;
  font-weight: bold;
  font-size: ${(props) => (props.length > 12 ? "0.8rem" : "1rem")};
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
  const router = useRouter();

  const { data: storedProducts, mutate: changeProducts } =
    useSWR(`/api/products`);

  async function handleDeleteProduct(id) {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      changeProducts();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <StyledAllCards>
        {storedProducts &&
          storedProducts.map((product) => {
            return (
              <StyledProductCard key={product.code}>
                <StyledProductName length={product.name.length}>
                  {product.name}
                </StyledProductName>
                <StyledButtonPosition>
                  <StyledLink
                    aria-label="link to product details"
                    href={`/product/${product.code}`}
                  >
                    <SVGIcon
                      aria-label={variant}
                      variant="details"
                      width="26px"
                    />
                  </StyledLink>
                  <StyledDeleteButton
                    aria-label="delete product"
                    variant="delete"
                    width="30px"
                    type="button"
                    onClick={() => {
                      handleDeleteProduct(product._id);
                    }}
                  >
                    <SVGIcon
                      aria-label={variant}
                      variant="delete"
                      width="26px"
                    />
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
