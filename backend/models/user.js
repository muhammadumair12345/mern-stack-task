import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    addresses: [
      {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
      },
    ],
    role: { type: String, enum: ["admin", "user"], default: "user" },
    phoneNo: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
