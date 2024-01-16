import UserModel from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // to get users exccept current user
  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.status(200).send(users);
};

export { getAllUsers };
