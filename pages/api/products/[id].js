import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request, secret });
  const { id } = request.query;

  if (request.method === "DELETE") {
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      userId: token.sub,
    });
    return response.status(200).json({ status: "Product deleted" });
  }

  return response.status(405).json({ status: "Method not allowed" });
}
