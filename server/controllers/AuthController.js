const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// SIGNUP ROUTE
const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.staus(400).json({ success: false, message: "Please Login" });
    }

    const securePassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: securePassword,
    });

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "Signup Successful" });
  } catch (error) {
    return res.stauts(500).json({ success: false, message: error.message });
  }
};

// LOGIN ROUTE
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please Signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // const isAdmin = user.isAdmin;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ success: true, message: "Login Successful",user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGOUT ROUTE
const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER ROUTE
const getUser = async (req, res) => {
  const reqId = req.id;

  try {
    let user = await User.findById(reqId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user, message: "User found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
var transporter = nodemailer.createTransport({
  service:"gmail",
  // port: 2525, s
  auth: {
    user:process.env.SENDER_EMAIL,
    pass:process.env.SENDER_PASSWORD
  },
});

// RESET PASSWORD ROUTE
const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
   

    let user = User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please Signup" });
    }

    const generateOtp = Math.floor(Math.random() * 10000); // Generate a 4 digit OTP
    
    

      const info = await transporter.sendMail({
        from: process.env.SENDER_EMAIL, // sender address
        to: email, // list of receivers
        subject: "New Otp has been generated for Canteen Management System", // Subject line
        html: `<h3>Your Generated Otp for resetting your password is : <i>${generateOtp}</i></h3>`, // html body
      });
    
      
   

    if ( info.messageId) {
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            otp: generateOtp,
          },
        }
      );
      return res
        .status(200)
        .json({ success: true, message: "Otp has been sent to your email" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// VERIFY OTP ROUTE
const verifyOtp = async (req, res) => {
  const { otp, newPassword } = req.body;

  try {
    const securePassword = await bcrypt.hash(newPassword, 10);

    let user = await User.findOneAndUpdate(
      { otp },
      {
        $set: {
          password: securePassword,
          otp: 0,
        },
      }
    );

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Otp" });
    }

    return res.status(200).json({ success: true, message: "Password Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Controller function to get details of all users
const getAllUsers = async (req, res) => {
// Controller function to get details of all non-admin users
  try {
    // Query the database to fetch details of all non-admin users
    const users = await User.find({ isAdmin: false }, { password: 0, otp: 0 }); // Exclude password and otp, and filter by isAdmin: false
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {signup, login, logout, getUser, resetPassword,getAllUsers, verifyOtp}