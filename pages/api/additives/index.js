import dbConnect from "@/db/connect";
import Additive from "@/db/models/Additive";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });

  if (request.method === "GET") {
    const additives = await Additive.find({ userId: token.sub }).sort("name");

    return response.status(200).json(additives);
  }
  if (request.method === "POST") {
    try {
      const additiveData = { ...request.body, userId: token.sub };

      const additive = new Additive(additiveData);
      await additive.save();
      return response.status(201).json({ status: "additive created" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    const deletedAdditive = await Additive.deleteMany({ userId: token.sub });
    return response.status(200).json({ status: "Additives deleted" });
  }

  return response.status(405).json({ status: "Method not allowed" });
}
