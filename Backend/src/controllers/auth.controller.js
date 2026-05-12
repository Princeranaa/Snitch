import { UserModel } from "../models/User.model.js";
import { sendTokenResponse } from "../utils/token.js";

export const register = async (req, res) => {
  const { email, password, fullname, contact, isSeller } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await UserModel.create({
      email,
      password,
      contact,
      fullname,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse(user, res, "User registered successfully");
  } catch (error) {
    console.log("something went wrong ", error);
    return res.status(500).json({
      message: "Internal server error",
      sucess: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    await sendTokenResponse(user, res, "User Logged in Successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      sucess: false,
      message: "failed to login",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "failed to fetch user",
    });
  }
};
