import { useState } from "react";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Card from "@/components/Card";

const initialAdditives = atomWithStorage("additives", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

const initialAllergens = atomWithStorage("allergens", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export default function Settings() {
  const [showAdditives, setShowAdditives] = useState(true);

  return (
    <>
      <button
        style={{ fontWeight: showAdditives ? "bold" : "normal" }}
        onClick={() => {
          setShowAdditives(true);
        }}
      >
        Additives
      </button>
      <button
        style={{ fontWeight: !showAdditives ? "bold" : "normal" }}
        onClick={() => {
          setShowAdditives(false);
        }}
      >
        Allergens
      </button>

      {showAdditives ? (
        <Card initialItems={initialAdditives} items={additives} />
      ) : (
        <Card initialItems={initialAllergens} items={allergens} />
      )}
    </>
  );
}
