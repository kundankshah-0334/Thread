import express from "express";
import ProtectRoute from '../middelware/ProtectRoute.js';
import {sendMessage , getMessages , getConversations } from "../controller/messageController.js";

const router = express.Router();

router.get("/conversations", ProtectRoute, getConversations);
router.get("/:otherUserId", ProtectRoute, getMessages);
router.post("/", ProtectRoute, sendMessage);

export default router;