import dbConnect from "@/db/connect";
import Allergen from "@/db/models/Allergen";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const allergen = await Allergen.findById(id);

    if (!allergen) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(allergen);
  }
  if (request.method === "POST") {
    const createAllergen = await Allergen.create(id);
    return response.status(200).json(createAllergen);
  }

  if (request.method === "DELETE") {
    const deletedAllergen = await Allergen.findByIdAndDelete(id);
    return response.status(200).json({ status: "Allergen deleted" });
  }

  return response.status(405).json({ status: "Method not allowed" });
}
