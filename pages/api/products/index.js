import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const products = await Product.find().sort("name");

    return response.status(200).json(products);
  }
  if (request.method === "POST") {
    try {
      const productData = request.body;
      console.log("request", productData);
      const product = new Product(productData);
      await product.save();
      response.status(201).json({ status: "product created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PUT") {
    console.log(`want to update product.New Product:${request.body}`);
  }
}
