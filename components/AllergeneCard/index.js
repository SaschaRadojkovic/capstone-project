const allergens = [
  {
    id: 1,
    name: "milk",
  },
  {
    id: 2,
    name: "eggs",
  },
  {
    id: 3,
    name: "fish",
  },
  {
    id: 4,
    name: "shellfish",
  },
  {
    id: 5,
    name: "tree nuts",
  },
  {
    id: 6,
    name: "peanuts",
  },
  {
    id: 7,
    name: "wheat",
  },
  {
    id: 8,
    name: "soybeans",
  },
  {
    id: 9,
    name: "gluten",
  },
  {
    id: 10,
    name: "sesame",
  },
  {
    id: 11,
    name: "mustard",
  },
  {
    id: 12,
    name: "celery",
  },
  {
    id: 13,
    name: "lupin",
  },
  {
    id: 14,
    name: "molluscs",
  },
  {
    id: 15,
    name: "sulfites",
  },
  {
    id: 16,
    name: "casein",
  },
  {
    id: 17,
    name: "potato",
  },
  {
    id: 18,
    name: "corn",
  },
  {
    id: 19,
    name: "lactose",
  },
  {
    id: 20,
    name: "vanillin",
  },
];

export default function AllergenCard() {
  return (
    <>
      <ul>
        {allergens.map((allergen) => {
          return <li key={allergen.id}>{allergen.name}</li>;
        })}
      </ul>
    </>
  );
}
