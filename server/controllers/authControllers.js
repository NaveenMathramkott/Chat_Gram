import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import UserModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, image } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: `Email already Registered`,
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new UserModel({
      name,
      email,
      password: hashedPassword,
      pic: image,
    }).save();
    res.status(200).send({
      success: true,
      message: `User has been registered successfully`,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in Registration`,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: `Invalid Email or Password`,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `Email not Registered`,
      });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(200).send({
        success: false,
        message: `Invalid Password`,
      });
    }
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    res.status(200).send({
      success: true,
      message: `User login successfully`,
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in Login`,
    });
  }
};
