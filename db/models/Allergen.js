import mongoose from "mongoose";

const { Schema } = mongoose;

const allergenSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
});

const Allergen =
  mongoose.models.Allergen || mongoose.model("Allergen", allergenSchema);

export default Allergen;
