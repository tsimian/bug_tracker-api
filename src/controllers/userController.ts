import { Request, Response } from "express";
import { IUser } from "../types/userTypes";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, salt);

    // Create user
    const user: IUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get user data
// @route   Get /api/users/me
// @access  Private
const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);

    // Check if user exists
    if (!user) {
      res.status(403).json({ msg: "User does not exist" });
      return;
    }

    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Generate JWT
const generateToken = (id: any) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, getMe };
