import { StyledDeleteButton } from "@/components/Card";
import { SVGIcon } from "@/components/SVGIcon";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import {
  initialProducts,
  StyledAllCards,
  StyledImage,
  StyledProductCard,
  StyledProductName,
} from "../product/[code]";

export default function Products() {
  const [products, setProducts] = useAtom(initialProducts);

  console.log("products", products);
  return (
    <>
      <StyledAllCards>
        {products.map((product) => {
          return (
            <StyledProductCard key={product.code}>
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

              <StyledProductName>{product.name}</StyledProductName>
              <StyledImage
                width={1000}
                height={1000}
                src={product.url}
                alt={product.name}
              />
            </StyledProductCard>
          );
        })}
      </StyledAllCards>
    </>
  );
}
