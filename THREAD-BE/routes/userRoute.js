import express from 'express';
import { signUpuser, loginUser , logoutUser , followUnfollowUser , updateUser , getProfile } from "../Controller/userController.js";
import ProtectRoute from '../middelware/ProtectRoute.js';
const router = express.Router();

router.get("/profile/:query" ,  getProfile);
router.post("/signup", signUpuser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", ProtectRoute , followUnfollowUser);
router.put("/update/:id", ProtectRoute , updateUser);

export default router;