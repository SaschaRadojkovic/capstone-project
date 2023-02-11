import dbConnect from "@/db/connect";
import Allergen from "@/db/models/Allergen";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request, secret });
  const { id } = request.query;

  if (request.method === "DELETE") {
    const deletedAllergen = await Allergen.findOneAndDelete({
      _id: id,
      userId: token.sub,
    });
    return response.status(200).json({ status: "Allergen deleted" });
  }

  return response.status(405).json({ status: "Method not allowed" });
}
