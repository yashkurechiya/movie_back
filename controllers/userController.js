import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Create token
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,  // ✅ send token
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// User Register
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists, Login Now" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "Registration successful",
      token,  // ✅ send token
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

export { Register, getProfile, userLogin };
