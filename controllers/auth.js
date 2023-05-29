const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    // CHECK IF USER EXIST IN OUR DB
    const findUsername = await userModel.findOne({ username });
    const findEmail = await userModel.findOne({ email });
    if (findUsername) {
      return res.status(500).json("User already exist");
    }
    if (findEmail) {
      return res.status(500).json("Email already exist");
    }
    //  IF USER DOES NOT EXIST IN OUR DB, CREATE A NEW USER
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (err) {
    throw err;
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    // FIND USER WITH THIS EMAIL
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json("user not found!");
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
      res.status(400).json("password incorrect!");
    }

    const { password, ...others } = user._doc;
    const privateKey = fs.readFileSync(`${__dirname}/src/privateKey`, "utf8");

    const token = await jwt.sign({ id: others._id }, privateKey, {
      algorithm: "RS256",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    if (err) throw err;
  }
};

// LOGOUT
const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};

module.exports = { register, login, logout };
