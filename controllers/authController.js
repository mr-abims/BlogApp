const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

// Sign up a new user
exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password,
    });
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Log in an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
