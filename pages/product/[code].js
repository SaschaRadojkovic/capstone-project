import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import { useEffect } from "react";

const StyledImage = styled(Image)`
  width: 25%;
  height: 25%;
  object-fit: cover;
`;
export default function DetailPage() {
  let additivesFromStorage;
  if (typeof window !== "undefined" && window.localStorage) {
    additivesFromStorage = JSON.parse(localStorage.getItem("additives"));
  }
  //   console.log("additives", additivesFromStorage);

  let allergensFromStorage;
  if (typeof window !== "undefined" && window.localStorage) {
    allergensFromStorage = JSON.parse(localStorage.getItem("allergens"));

    // console.log("allergensArray", allergensArray);
  }
  //   console.log("allergens", allergensFromStorage);

  const router = useRouter();
  const { code } = router.query;
  const { data } = useSWR(
    `https://de.openfoodfacts.org/api/v0/product/${code}.json`
  );
  useEffect(() => {
    console.log("additives", additivesFromStorage);
    console.log("allergens", allergensFromStorage);
  }, []);

  if (!data) {
    return <p>loading</p>;
  }
  //   console.log("data3", data);

  function Additives({ additive }) {
    return <div>{additive}</div>;
  }

  const allergens = data.product.allergens;
  const allergensArray = allergens.split(",");

  console.log("allergensArray", allergensArray);

  function Allergens({ allergen }) {
    return (
      <div>
        {data.product.allergens.replace("en:", "", (allergen) => (
          <div key={allergen}>{allergen.split(",", "")}</div>
        ))}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          router.push("/barcodeScanner");
          //   setScanning(true);
          //   setResult(null);
        }}
      >
        <span>◀︎</span>
      </button>

      {/* Found Product */}

      {data && data.product ? (
        <>
          <h2>{data.product.product_name} </h2>

          <StyledImage
            width={1000}
            height={1000}
            src={data.product.image_front_url}
            alt={data.product.product_name}
          />

          <p>{data.product.brands}</p>
          <section>
            <h3>Additives</h3>
            {data.product && data.product.additives_original_tags ? (
              data.product.additives_original_tags.map((additive) => (
                <Additives
                  key={additive}
                  additive={additive.replace("en:", "")}
                />
              ))
            ) : (
              <p>No additives listed</p>
            )}
          </section>
          <section>
            <h3>Allergens</h3>
            {allergensArray.map((item) => (
              <div key={item}>{item.replace("en:", "")}</div>
            ))}
          </section>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </>
  );
}
