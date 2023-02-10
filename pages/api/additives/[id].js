import dbConnect from "@/db/connect";
import Additve from "@/db/models/Additve";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const additve = await Additve.findById(id);

    if (!additve) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(additve);
  }
  if (request.method === "POST") {
    const createAdditve = await Additve.create(id);
    return response.status(200).json(createAdditve);
  }

  if (request.method === "DELETE") {
    const deletedAdditve = await Additve.findByIdAndDelete(id);
    return response.status(200).json({ status: "Additve deleted" });
  }

  return response.status(405).json({ status: "Method not allowed" });
}
