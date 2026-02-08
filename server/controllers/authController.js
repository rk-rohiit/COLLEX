import User from "../models/userModel.js";
import generateToken from "../middlewares/generateToken.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { email, fullName, phone, course, year, hostelBlock, password } =
      req.body;

    if (!email || !fullName || !phone || !course || !year || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      fullName,
      phone,
      course,
      year,
      hostelBlock,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        course: user.course,
        year: user.year,
        hostelBlock: user.hostelBlock,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email & password required",
      });

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGOUT =================
export const logoutUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
