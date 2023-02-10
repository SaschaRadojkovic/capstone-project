import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { atom, useAtom } from "jotai";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import { SVGIcon } from "@/components/SVGIcon";
import { useEffect } from "react";
import { initialAdditives, initialAllergens } from "../settings";

const StyledImage = styled(Image)`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const StyledProductName = styled.h2`
  padding-block: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  background: #ffcc80;
  border-radius: 0.4rem 0.4rem 0 0;
`;

const StyledCheck = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100px;
  width: 200px;
  padding-top: 20px;
  padding-right: 2rem;
  margin-top: 2rem;
`;
const StyledProductCard = styled.section`
  background-color: white;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.4rem;
  box-shadow: 1px 4px 10px 1px rgb(127, 133, 136);
  max-height: 310px;
`;
const StyledBackButton = styled.button`
  position: fixed;
  left: 0.1rem;
  top: 0.3rem;
  color: white;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
`;

const NoProduct = styled.p`
  font-size: 35px;
  left: 5rem;
  top: 200px;
  position: absolute;
  z-index: 4;
`;
const StyledAllCards = styled.div`
  margin-top: 4rem;
`;
const StyledIngredientsCard = styled.div`
  margin-top: 0.5rem;
  background-color: white;
  margin-left: 4rem;
  margin-right: 4rem;
  border-radius: 0.4rem;
  box-shadow: 1px 4px 10px 1px rgb(127, 133, 136);
`;
const StyledInsideCard = styled.div`
  display: flex;
`;
const StyledPAdditives = styled.p`
  display: flex;
  flex-grow: 1;
`;
const StyledPAllergens = styled.p`
  display: flex;
  flex-grow: 1;
`;

const StyledAdditivesH3 = styled.p`
  border-radius: 0.4rem 0.4rem 0 0;
  padding: 0.5rem;

  text-align: center;
  font-weight: bold;
`;
const StyledAllergensH3 = styled.p`
  padding: 0.5rem;

  text-align: center;
  font-weight: bold;
`;

const StyledParagraph = styled.p`
  display: flex;
  flex-grow: 1;
  border: 1px solid red;
  padding: 0.5rem;
  font-weight: normal;
  font-size: 0.7rem;
  background: orange;
`;

const StyledSaveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: inherit;
`;
const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledParagraphBold = styled.p`
  border-radius: 0 0 0.4rem 0.4rem;
  padding: 10px;
  font-weight: bold;
  background: #ffcc80;
`;
const StyledBrand = styled.p`
  font-weight: normal;
`;

export const initialProducts = atom([]);

export default function DetailPage() {
  const [savedProducts, setSavedProducts] = useAtom(initialProducts);

  const router = useRouter();
  const { code } = router.query;
  const { data } = useSWR(
    `https://de.openfoodfacts.org/api/v0/product/${code}.json`
  );

  const { data: storedProducts, mutate: changeProducts } =
    useSWR(`/api/products`);

  const { data: additivesFromServer = [] } = useSWR(`/api/additives`);

  const { data: allergensFromServer = [] } = useSWR(`/api/allergens`);

  console.log("sp", savedProducts);

  useEffect(() => {
    setSavedProducts(storedProducts);
  }, [storedProducts, setSavedProducts]);

  async function handleSaveProduct(product) {
    try {
      await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      changeProducts();
    } catch (error) {
      console.error(error.message);
    }
  }

  function Additives({ additive }) {
    return <div>{additive}</div>;
  }

  function BackToScanner() {
    return (
      <StyledBackButton
        onClick={() => {
          router.back();
        }}
      >
        <SVGIcon variant="back" width="50px" />
      </StyledBackButton>
    );
  }
  if (!data) {
    return (
      <>
        <BackToScanner />
        <p>...lädt!</p>
      </>
    );
  }
  if (!data.product) {
    return (
      <>
        <BackToScanner />
        <NoProduct>Scanne Nochmal!</NoProduct>
      </>
    );
  }
  //converting the fetched allergensString to an array of
  //strings and than map to an array of objects

  const allergensArray = data.product.allergens.split(",").map((item) => ({
    id: item,
  }));

  const additivesArray = data.product.additives_original_tags
    ? data.product.additives_original_tags.map((item) => ({
        id: item,
      }))
    : [];

  function Allergens() {
    return (
      <div>
        {allergensArray.map((item) => (
          <div key={item.id}>
            {allergens.tags.find((aller) => aller.id === item.id)?.name}
          </div>
        ))}
      </div>
    );
  }

  const filteredAdditives = additivesFromServer.filter((additive) => {
    return additivesArray.some((addi) => addi.id === additive.id);
  });

  const filteredAllergens = allergensFromServer.filter((allergen) => {
    return allergensArray.some((allerg) => allerg.id === allergen.id);
  });

  const checkExistingProducts = savedProducts
    ? savedProducts.some((product) => product.code === code)
    : false;

  return (
    <>
      <BackToScanner />

      {/* Found Product */}

      {data && data.product ? (
        <>
          <StyledAllCards>
            <StyledProductCard>
              <StyledProductName>{data.product.product_name}</StyledProductName>
              <StyledButtonDiv>
                <StyledSaveButton
                  key={data.product}
                  onClick={() => {
                    handleSaveProduct({
                      name: data.product.product_name,
                      url: data.product.image_front_url,
                      code: code,
                    });
                    // if (!checkExistingProducts) {
                    //   setSavedProducts([
                    //     {
                    //       name: data.product.product_name,
                    //       url: data.product.image_front_url,
                    //       code: code,
                    //     },
                    //     ...savedProducts,
                    //   ]);
                    // }
                  }}
                >
                  <SVGIcon
                    variant={
                      checkExistingProducts
                        ? "saveButtonFilled"
                        : "saveButtonOutlined"
                    }
                    width="26px"
                  />
                </StyledSaveButton>
              </StyledButtonDiv>
              {/* if user have not chosen additives show message */}
              <StyledInsideCard>
                <StyledImage
                  width={1000}
                  height={1000}
                  src={data.product.image_front_url}
                  alt={data.product.product_name}
                />
                <StyledCheck>
                  {additivesFromServer.length > 0 ? (
                    <StyledPAdditives>
                      Additive:
                      {filteredAdditives.length > 0 ? (
                        <SVGIcon variant="bad" width="20px" color="red" />
                      ) : (
                        <SVGIcon variant="good" width="20px" color="#1bde4f" />
                      )}
                    </StyledPAdditives>
                  ) : (
                    <StyledParagraph>
                      Sie haben keine Zusatzstoffe in den Einstellungen gewählt!
                    </StyledParagraph>
                  )}
                  {/* if user have not chosen allergens show message */}
                  {allergensFromServer.length > 0 ? (
                    <StyledPAllergens>
                      Allergene:
                      {filteredAllergens.length > 0 ? (
                        <SVGIcon variant="bad" width="20px" color="red" />
                      ) : (
                        <SVGIcon variant="good" width="20px" color="#1bde4f" />
                      )}
                    </StyledPAllergens>
                  ) : (
                    <StyledParagraph>
                      Sie haben keine Allergene in den Einstellunegn gewählt!
                    </StyledParagraph>
                  )}
                </StyledCheck>
              </StyledInsideCard>
              <StyledParagraphBold>
                Hersteller:
                <StyledBrand>{data.product.brands}</StyledBrand>
              </StyledParagraphBold>
            </StyledProductCard>
            {/* show allergens and additives */}
            <StyledIngredientsCard>
              <StyledAdditivesH3>Additive</StyledAdditivesH3>

              {data.product && data.product.additives_original_tags ? (
                data.product.additives_original_tags.map((additive) => (
                  <Additives
                    key={additive}
                    additive={
                      additives.tags.find((addi) => {
                        return addi.id === additive;
                      })?.name
                    }
                  />
                ))
              ) : (
                <p>keine Additive gelistet</p>
              )}
            </StyledIngredientsCard>
            <StyledIngredientsCard>
              <StyledAllergensH3>Allergene</StyledAllergensH3>
              <Allergens />
            </StyledIngredientsCard>
          </StyledAllCards>
        </>
      ) : (
        <>
          <BackToScanner />
          <p>Scannen Sie noch einmal!</p>
        </>
      )}
    </>
  );
}
