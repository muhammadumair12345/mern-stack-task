import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth("admin"), getUsers).post(auth("admin"), createUser);

router
  .route("/:id")
  .get(auth(), getUserById)
  .patch(auth(), updateUser)
  .delete(auth("admin"), deleteUser);

export default router;
