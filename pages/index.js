import AdditiveCard from "@/components/AdditiveCard";
import AllergenCard from "@/components/AllergenCard";
import { useState } from "react";

export default function HomePage() {
  const [showAdditives, setShowAdditives] = useState(true);
  return (
    <>
      <button
        onClick={() => {
          setShowAdditives(false);
        }}
      >
        Allergens
      </button>
      <button
        onClick={() => {
          setShowAdditives(true);
        }}
      >
        Additives
      </button>

      {showAdditives ? <AdditiveCard /> : <AllergenCard />}
    </>
  );
}
