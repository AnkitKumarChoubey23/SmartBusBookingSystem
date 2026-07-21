const User = require("../models/User");

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

module.exports = {
  createUser,
  findUserByEmail,
};