import { UserModel } from "../models/User.model.js";
import {sendTokenResponse} from "../utils/token.js"

export const register = async (req, res) => {
  const { email, password, fullname, contact } = req.body;

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
    })

    await sendTokenResponse(user, res, "User registered successfully");


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      sucess: false,
    });
  }
};
