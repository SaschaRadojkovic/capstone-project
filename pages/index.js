import AdditiveCard from "@/components/AdditiveCard";
import AllergenCard from "@/components/AllergenCard";
import { useState } from "react";

export default function HomePage() {
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

      {showAdditives ? <AdditiveCard /> : <AllergenCard />}
    </>
  );
}
