import Jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { UserModel } from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = Jwt.verify(token, config.JWT_SECRET);

    const user = await UserModel.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    /* Checking the role */
    if (user.role !== "seller") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("something went wrong", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
