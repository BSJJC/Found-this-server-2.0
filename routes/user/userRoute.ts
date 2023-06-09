import { Router } from "express";
import { registerUser, loginUser } from "../../controllers/user/userController";
import protect from "../../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/signUp", registerUser);
userRouter.post("/login", loginUser);
// userRouter.get("/userData", protect, getUserData);

export default userRouter;
