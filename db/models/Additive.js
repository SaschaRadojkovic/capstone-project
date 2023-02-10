import mongoose from "mongoose";

const { Schema } = mongoose;

const additiveSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
});

const Additive =
  mongoose.models.Additive || mongoose.model("Additive", additiveSchema);

export default Additive;
