import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController";
import { auth } from "../middleware/authMiddleware";

const userRouter: Router = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", auth, getMe);

export default userRouter;
