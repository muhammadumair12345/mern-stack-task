import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.js";
import { statusCodes } from "../constants/statusCodes.js";
import { paginateAndFilter } from "../helpers/paginateAndFilter.js";

export const getUsers = async (req, res) => {
  try {
    const users = await paginateAndFilter({
      model: User,
      query: req.query,
    });

    return res.success({
      statusCode: statusCodes.OK,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.error({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.error({ message: "Email already exists" });

    if (!existingUser.role)
      return res.error({ message: "Role does not exist yet." });

    const newUser = new User({
      ...user,
      password: hashPassword,
    });
    await newUser.save();

    res.success({
      statusCode: statusCodes.CREATED,
      message: "User created successfully",
    });
  } catch (error) {
    res.error({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.error({
        statusCode: statusCodes.NOT_FOUND,
        message: "No user with  that id",
      });

    if (user.role) {
      const role = await User.find({ role: user.role });
      if (!role) return res.error({ message: "Role does not exist yet." });
    }

    const updateUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.success({ message: "User updated successfully", data: updateUser });
  } catch (error) {
    res.error({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid({ _id: id }))
      return res.error({
        statusCode: statusCodes.NOT_FOUND,
        message: "No user with  that id",
      });

    await User.findByIdAndRemove({ _id: id });
    res.success({ message: "User deleted successfully" });
  } catch (error) {
    res.error({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.error({ message: "User not found" });
    res.success({ message: "User by ID", data: user });
  } catch (error) {
    res.error({ message: error.message });
  }
};
