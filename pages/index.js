import { useState } from "react";
import allergens from "../allergens.json";
import additives from "../additives.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Card from "@/components/Card";
import { useRouter } from "next/router";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to Eatable</h1>

      <p>first go to the settings page </p>
    </>
  );
}
