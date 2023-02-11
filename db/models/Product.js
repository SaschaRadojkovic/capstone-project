import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  code: { type: String, required: true },
  userId: { type: String, required: true },
});
productSchema.index({ userId: 1, code: 1 }, { unique: true });

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
