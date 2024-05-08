const User = require("../models/user");

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUser = req.userId;
    const users = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );
    res.json(users);
  } catch (err) {
    console.log("Error in getUserForSidebar: ", err);
    res.status(500).json({ message: err.message });
  }
};

const getUsernameById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("Error in getUsernameById: ", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsersForSidebar, getUsernameById };
