import dbConnect from "@/db/connect";
import Allergen from "@/db/models/Allergen";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const allergens = await Allergen.find().sort("name");

    return response.status(200).json(allergens);
  }
  if (request.method === "POST") {
    try {
      const allergenData = request.body;

      console.log("request", JSON.stringify(allergenData));
      const allergen = new Allergen(allergenData);
      await allergen.save();
      response.status(201).json({ status: "allergen created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
