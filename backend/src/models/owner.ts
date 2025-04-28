import mongoose from "mongoose"

const ownerSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  addedBy: { type: String, required: true }, // Auth0 ID of the owner who granted access
},
{ timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner; 