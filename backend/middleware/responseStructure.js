import { statusCodes } from "../constants/statusCodes.js";

export const responseStructure = (req, res, next) => {
  res.success = ({ statusCode = statusCodes.OK, message, data = [] }) => {
    res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  };

  res.error = ({ statusCode = statusCodes.BAD_REQUEST, message }) => {
    res.status(statusCode).json({
      status: "error",
      message,
    });
  };

  next();
};
