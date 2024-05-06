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

module.exports = { getUsersForSidebar };
