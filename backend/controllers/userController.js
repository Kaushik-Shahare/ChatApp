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
  const { id } = req.params;

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log("Error in getUsernameById: ", err);
    return res.status(500).json({ message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log("Error in getUserProfile: ", err);
    return res.status(500).json({ message: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { username, email, fullName } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.log("Error in updateUserProfile: ", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsersForSidebar,
  getUsernameById,
  getUserProfile,
  updateUserProfile,
};
