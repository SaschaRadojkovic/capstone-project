import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useAtom } from "jotai";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import dynamic from "next/dynamic";
import { SVGIcon } from "@/components/SVGIcon";
const BgImage = dynamic(() => import("@/components/BGImage"), {
  ssr: false,
});

const StyledImage = styled(Image)`
  margin: 2rem;
  width: 25%;
  height: 25%;
  object-fit: cover;
`;

const StyledProductName = styled.h2`
  padding-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
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
  border-radius: 0.7rem;
  box-shadow: 0px 0px 10px 2px rgba(128, 128, 128, 0.25);
  height: 50%;
`;
const StyledBackButton = styled.div`
  position: fixed;
  left: 0.1rem;
  top: 0.3rem;
  color: white;
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
  box-shadow: 0px 0px 10px 2px rgba(128, 128, 128, 0.25);
  height: 50%;
`;
const StyledInsideCard = styled.div`
  display: flex;
`;
const StyledPAdditives = styled.p`
  display: flex;
`;
const StyledPAllergens = styled.p`
  display: flex;
`;

const StyledAdditivesH3 = styled.p`
  font-weight: bold;
`;
const StyledAllergensH3 = styled.p`
  font-weight: bold;
`;

//getting additives from Localstorage with atom from jotai
const initialAdditives = atomWithStorage("additives", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});
//getting  allergens from Localstorage with atom from jotai
const initialAllergens = atomWithStorage("allergens", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});
export default function DetailPage() {
  const [additivesFromStorage] = useAtom(initialAdditives);
  const [allergensFromStorage] = useAtom(initialAllergens);

  const router = useRouter();
  const { code } = router.query;
  const { data } = useSWR(
    `https://de.openfoodfacts.org/api/v0/product/${code}.json`
  );

  function Additives({ additive }) {
    return <div>{additive}</div>;
  }

  function BackToScanner() {
    return (
      <StyledBackButton>
        <span
          onClick={() => {
            router.push("/barcodeScanner");
          }}
        >
          <SVGIcon variant="back" width="50px" />
        </span>
      </StyledBackButton>
    );
  }
  if (!data) {
    return (
      <>
        <BackToScanner />
        <p>...läd</p>
      </>
    );
  }
  if (!data.product) {
    return (
      <>
        <BackToScanner />
        <NoProduct>Scan Nochmal!</NoProduct>
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

  const filteredAdditives = additivesFromStorage.filter((additive) => {
    return additivesArray.some((addi) => addi.id === additive.id);
  });

  const filteredAllergens = allergensFromStorage.filter((allergen) => {
    return allergensArray.some((allerg) => allerg.id === allergen.id);
  });

  return (
    <>
      <BackToScanner />

      {/* Found Product */}

      {data && data.product ? (
        <>
          <StyledAllCards>
            <StyledProductCard>
              <StyledProductName>
                {data.product.product_name}{" "}
              </StyledProductName>

              {/* if user have not chosen additives show message */}
              <StyledInsideCard>
                <StyledImage
                  width={1000}
                  height={1000}
                  src={data.product.image_front_url}
                  alt={data.product.product_name}
                />
                <StyledCheck>
                  {additivesFromStorage.length > 0 ? (
                    <StyledPAdditives>
                      Additive:
                      {filteredAdditives.length > 0 ? (
                        <span> ❌</span>
                      ) : (
                        <span> ✅</span>
                      )}
                    </StyledPAdditives>
                  ) : (
                    <p>keine Zusatzstoffe in den Einstellungen gewählt</p>
                  )}
                  {/* if user have not chosen allergens show message */}
                  {allergensFromStorage.length > 0 ? (
                    <StyledPAllergens>
                      Allergene:
                      {filteredAllergens.length > 0 ? (
                        <span> ❌</span>
                      ) : (
                        <span> ✅</span>
                      )}
                    </StyledPAllergens>
                  ) : (
                    <p>keine Allergene in den Einstellunegn gewählt</p>
                  )}
                </StyledCheck>
              </StyledInsideCard>

              <p>Hersteller:{data.product.brands}</p>
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
          <p>Scanne Nochmal!</p>
        </>
      )}
    </>
  );
}
