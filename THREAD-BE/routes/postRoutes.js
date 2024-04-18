import express from 'express';
import { createPost , getPost ,deletePost , likeUnlikePost , getFeedPost , replyPost} from '../Controller/postController.js';
import ProtectRoute from '../middelware/ProtectRoute.js';

const router = express.Router();

router.get("/feed" , ProtectRoute ,getFeedPost)
router.get("/:id"  ,getPost)
router.post("/create", ProtectRoute ,createPost);
router.delete("/:id" , ProtectRoute ,deletePost)
router.post("/like/:id" , ProtectRoute ,likeUnlikePost)
router.post("/reply/:id" , ProtectRoute ,replyPost)

export default router;