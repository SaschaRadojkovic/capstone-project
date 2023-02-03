import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useAtom } from "jotai";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import dynamic from "next/dynamic";
const BgImage = dynamic(() => import("@/components/BGImage"), {
  ssr: false,
});

const StyledImage = styled(Image)`
  width: 20%;
  height: 20%;
  object-fit: cover;
`;
const StyledProductCard = styled.section`
  background-color: white;
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 5rem;
  border-radius: 0.7rem;
  text-align: center;
  box-shadow: 0px 0px 10px 2px rgba(128, 128, 128, 0.25);
  height: 100%;
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

  const StyledBackButton = styled.div`
    left: 1rem;
    top: 2rem;
    position: absolute;
    z-index: 1;
  `;

  const NoProduct = styled.p`
    font-size: 35px;
    left: 5rem;
    top: 200px;
    position: absolute;
    z-index: 4;
  `;

  function BackToScanner() {
    return (
      <StyledBackButton>
        <span
          onClick={() => {
            router.push("/barcodeScanner");
          }}
        >
          BACK
        </span>
      </StyledBackButton>
    );
  }
  if (!data) {
    return (
      <>
        <BackToScanner />
        <p>loading</p>
      </>
    );
  }
  if (!data.product) {
    return (
      <>
        <BackToScanner />
        <NoProduct>
          Product not found!
          <br /> Scan again!
        </NoProduct>
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
          <StyledProductCard>
            <h2>{data.product.product_name} </h2>
            {/* if user have not chosen additives show message */}
            {additivesFromStorage.length > 0 ? (
              <p>
                Additive:
                {filteredAdditives.length > 0 ? (
                  <span> ❌</span>
                ) : (
                  <span> ✅</span>
                )}
              </p>
            ) : (
              <p>choose your additives</p>
            )}
            {/* if user have not chosen allergens show message */}
            {allergensFromStorage.length > 0 ? (
              <p>
                Allergene:
                {filteredAllergens.length > 0 ? (
                  <span> ❌</span>
                ) : (
                  <span> ✅</span>
                )}
              </p>
            ) : (
              <p>choose your allergens</p>
            )}

            <StyledImage
              width={1000}
              height={1000}
              src={data.product.image_front_url}
              alt={data.product.product_name}
            />

            <p>{data.product.brands}</p>
          </StyledProductCard>
          {/* show allergens and additives */}
          <StyledProductCard>
            <h3>Additives</h3>
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
          </StyledProductCard>
          <StyledProductCard>
            <h3>Allergene</h3>
            <Allergens />
          </StyledProductCard>
        </>
      ) : (
        <>
          <BackToScanner />
          <p>Product not found</p>
        </>
      )}
    </>
  );
}
