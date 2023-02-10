import dbConnect from "@/db/connect";
import Additve from "@/db/models/Additive";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const additves = await Additve.find().sort("name");

    return response.status(200).json(additves);
  }
  if (request.method === "POST") {
    try {
      const additveData = request.body;

      console.log("request", JSON.stringify(additveData));
      const additve = new Additve(additveData);
      await additve.save();
      response.status(201).json({ status: "additve created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
