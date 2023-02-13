import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });

  if (request.method === "GET") {
    const products = await Product.find({ userId: token.sub }).sort("name");

    return response.status(200).json(products);
  }
  if (request.method === "POST") {
    try {
      let productData = request.body;
      productData.userId = token.sub;
      console.log("request", JSON.stringify(productData));
      const product = new Product(productData);
      await product.save();
      response.status(201).json({ status: "product created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
