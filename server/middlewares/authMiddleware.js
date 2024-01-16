import UserModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// middleWare for to get sigIn user details
export const requireSignIn = async (req, res, next) => {
  try {
    const decryptToken = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = await UserModel.findById(decryptToken.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: `Not Authorized, No Token`,
    });
  }
};
