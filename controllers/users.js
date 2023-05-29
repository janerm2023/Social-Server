const userModel = require("../models/User");

const getUser = async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  
  res.status(200).json(user);
};

module.exports = { getUser };
