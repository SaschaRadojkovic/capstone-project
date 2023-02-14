import dbConnect from "@/db/connect";
import Allergen from "@/db/models/Allergen";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });

  if (request.method === "GET") {
    const allergens = await Allergen.find({ userId: token.sub }).sort("name");

    return response.status(200).json(allergens);
  }
  if (request.method === "POST") {
    try {
      const allergenData = { ...request.body, userId: token.sub };

      const allergen = new Allergen(allergenData);
      await allergen.save();
      return response.status(201).json({ status: "allergen created" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    const deletedAllergen = await Allergen.deleteMany({ userId: token.sub });
    return response.status(200).json({ status: "Allergens deleted" });
  }

  return response.status(405).json({ status: "Method not allowed" });
}
