import express from 'express';
import { signUpuser, loginUser , logoutUser , followUnfollowUser , updateUser , getSuggestedUsers ,  getProfile , freezeAccount } from "../Controller/userController.js";
import ProtectRoute from '../middelware/ProtectRoute.js';
const router = express.Router();

router.get("/profile/:query" ,  getProfile);
router.get("/suggested" , ProtectRoute ,  getSuggestedUsers);
router.post("/signup", signUpuser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", ProtectRoute , followUnfollowUser);
router.put("/update/:id", ProtectRoute , updateUser);
router.put("/freeze", ProtectRoute , freezeAccount);

export default router;