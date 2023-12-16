import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { statusCodes } from "../constants/statusCodes.js";

export const auth =
  (...allowedRoles) =>
  async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        res.error({
          statusCode: statusCodes.UNAUTHORIZED,
          message: "Unauthorized: Missing access token",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        res.error({ message: "Invalid token" });
      }

      const user = await User.findOne({
        _id: decoded._id,
      });

      if (!user) {
        return res.error({
          statusCode: statusCodes.UNAUTHORIZED,
          message: "Unauthorized",
        });
      }

      if (allowedRoles.length > 0) {
        const users = await User.find({ role: { $in: allowedRoles } });
        const includes = users?.find(({ role }) => role === user.role);
        if (!includes)
          return res.error({
            statusCode: statusCodes.FORBIDDEN,
            message: "Access denied",
          });
      }

      req.userId = user._id;
      req.user = user;

      next();
    } catch (error) {
      return res.error({ message: error.message });
    }
  };
