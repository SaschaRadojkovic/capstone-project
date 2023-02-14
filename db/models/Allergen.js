import mongoose from "mongoose";

const { Schema } = mongoose;

const allergenSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  userId: { type: String, required: true },
});
allergenSchema.index({ userId: 1, id: 1 }, { unique: true });

const Allergen =
  mongoose.models.Allergen || mongoose.model("Allergen", allergenSchema);

export default Allergen;
