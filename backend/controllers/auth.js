import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.error({ message: "Invalid Email" });

    const existingPassword = bcrypt.compare(password, existingUser.password);
    if (!existingPassword) return res.error({ message: "Invalid Password" });
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.success({
      message: "Signin successfully",
      data: { token },
    });
  } catch (error) {
    res.error({ message: error.message });
  }
};
