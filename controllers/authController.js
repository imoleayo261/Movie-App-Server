const User = require("../models/user");
const bcrypt = require("bcrypt");
const customError = require("../utils/customError");
const jwt = require("jsonwebtoken");
//register

const register = async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;
  if (!email) {
    return next(customError("Provide an Email", 400));
    // res.status(400).json({
    //   message: "Please Provide an Email",
    // });
  }
  if (!password) {
    return next(customError("Provide a Password", 400));
    // res.status(400).json({
    //   message: "Please Provide an Password",
    // });
  }

  if (password !== repeatPassword) {
    return next(customError("Password Mismatch", 400));
    // return res.status(400).json({
    //   message: "Password Mismatch",
    // });
  }
  // bcrypt - for hashing and unhasing passwords

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  //try to create the user on the DB

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res.status(200).json({ id: user._id, token });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email) {
      return next(customError("Email Already Exists", 400));
    }
    if (error.errors.email.message) {
      return next(customError(error.errors.email.message));
    }
    next(customError("Something went wrong", 500));
  }

  res.status(200).json({
    message: "Regiser Here",
  });
};

//login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(customError("please Provide an email", 400));
  }
  if (!password) {
    return next(customError("please provide a password", 400));
  }
  const user = await User.findOne({ email });

  if (!user) {
    return next(customError("User does not exist", 400));
  }

  const isPasswordMatch = bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(customError("wrong Password", 401));
  }

  //generate a token and give to the user

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.status(200).json({
    token,
    id: user._id,
  });
};

const getUser = (req, res, next) => {
  const { userId } = req.user;
  res.status(200).json({ id: userId});
};

module.exports = { register, login, getUser };
