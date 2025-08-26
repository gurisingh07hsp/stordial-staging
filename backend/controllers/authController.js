const User = require('../models/user');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

// Register user
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;


    const isuser = await User.findOne({ email});

    if(isuser){
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      })
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      avatar: {
        public_id: 'sample_id',
        url: 'sample_url'
      }
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password is entered by user
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter email & password'
      });
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Logout user
exports.logout = async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // match login
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // match login
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Get currently logged in user details
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};


exports.changePassword = async(req, res, next) => {
    const {currPassword, newPassword} = req.body;
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare current password with stored password
    const isVerify = await bcrypt.compare(currPassword, user.password);
    
    if (!isVerify) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    
    user.password = newPassword;
    await user.save();

    return res.status(200).json({message: "Password has been Changed Successfully"})
}

exports.forgotPassword = async(req, res, next) => {
  const {email} = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const min = Math.pow(10, 4 - 1);
  const max = Math.pow(10, 4) - 1;
  const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.otp = { code: hashedOtp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) };
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your email id',
        pass: 'your pass',
    },
  });

  const mailOptions = {
    from: 'your email',
    to: email,
    subject: 'Forget OTP Code',
    text: `Your OTP Code is - ${otp} Dont share the otp with anyone`,
  };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }

    return res.status(200).json({ success: true, message: "OTP sent to email" });
}

exports.verifyOTP = async(req, res, next) => {
  const {email,otp} = req.body;
  let Otp = '';
  for(let i=0;i<otp.length;i++)
  {
    Otp = Otp + otp[i];
  }

  const user = await User.findOne({ email });
  if (!user || !user.otp) return res.status(400).json({ message: "Invalid request" });

  const isMatch = await bcrypt.compare(Otp, user.otp.code);
  if (!isMatch || user.otp.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  return res.status(200).json({message: 'OTP verified successfully!'});
}

exports.resetPassword = async(req, res, next) => {
  const {email, newPassword} = req.body;
      const user = await User.findOne({email}).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.password = newPassword;
    await user.save();
    return res.status(200).json({message: "Password has been Changed Successfully"})
}

// Get all users (admin only)
exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    next(error);
  }
};

// Get user details (admin only)
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.isAdmin = async (req,res) =>{
      try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Only Admin can Access!'
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (!decoded || !decoded.id) {
        return res.status(401).json({
          success: false,
          message: 'Only Admin Can Access!'
        });
      }
  
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(404).json({
          success: false,
          message: 'Only Admin Can Access!'
        });
      }
  
      if(req.user.role == 'admin')
      {
        return res.status(200).json({
          success : true,
          message: 'You can Access!'
        })
      }
      else{
        return res.status(404).json({
          success: false,
          message: 'Only Admin Can Access!'
        });
      }

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed'
      });
    }
}