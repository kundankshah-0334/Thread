import User from "../Model/User.js";
import Post from "../Model/postModel.js";
import { v2 as cloudinary} from "cloudinary";

const createPost = async (req, res) => {
    try {
         const { postedBy , text} = req.body;
         let { img } = req.body;

         if(!postedBy || !text) return res.status(400).json({error: "posteBy and textfields are required."})

         const user = await User.findById(postedBy);
         if(!user){
            return res.status(400).json({error: "User not found."})
         }

         console.log(user._id.toString())
         console.log(req.user._id.toString())
         if(user._id.toString() !== req.user._id.toString())  return res.status(400).json({error: "can not post for another user"})

         const maxLength = 500;

         if(text.length > maxLength)  return res.status(400).json({error: `text must be less than ${maxLength}`})

         if(img){
             const uploadedResponce = await cloudinary.uploader.upload(img);
             img = uploadedResponce.secure_url;
            
         }


         const newPost = new Post({postedBy , text ,img})
         await newPost.save();
         res.status(200).json(newPost)

    } catch (error) {
        console.error("Error in post Controller page: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const getPost = async (req, res) => {
    try {
         const post = await Post.findById(req.params.id);

         if(!post){
            return res.status(404).json({error : "post not Found"})
         } 

          res.status(200).json(post);

    } catch (error) {
        console.error("Error in post Controller page: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const deletePost = async (req, res) => {
    try {
         const post = await Post.findById(req.params.id);

         if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({error : "Unauthorized user to delete this post"})
         } 
         if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId)
         }

         await Post.findByIdAndDelete(req.params.id);
         res.status(201).json({message : "post deleted Successfully"})

    } catch (error) {
        console.error("Error in post Controller page: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const likeUnlikePost = async (req, res) => {
    try {
          const {id:postId} = req.params;
       
          const userId = req.user._id;
          const post = await Post.findById(postId);

          if(!post){
            return res.status(401).json({error : "post not found"})
         }

         const likedPost = post.likes.includes(userId);

         if(likedPost){
            // Unlike post
            await Post.updateOne({_id : postId} , {$pull : {likes: userId}});
            res.status(200).json({message : "post unliked"})
         }
         else{
            //like post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message : "post liked"})
         }


    } catch (error) {
        console.error("Error in post Controller page: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const replyPost = async (req, res) => {
    try {
          const {id:postId} = req.params;
       const {text} = req.body;

          const userProfilePic = req.user.userProfilePic;
          const userId = req.user._id;
          const username = req.user.username;
         

          if(!text){ 
            return res.status(401).json({error : "text Field is Empty"})
         }
         const post = await Post.findById(postId);
          if(!post){ 
            return res.status(401).json({error : "post not found"})
         }

         const reply = { text , username , userProfilePic , userId};

         post.replies.push(reply);
         await post.save();

          res.status(200).json(reply)

    } catch (error) {
        console.error("Error in post Controller page: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const getFeedPost = async (req, res) => {
    try {
           const userId = req.user._id;
// console.log(userId)
// console.log(req.user._id)
           const user =  await User.findById(userId);

           if(!user) {
            return res.status(404).json({error : "user not found"});
           }
           const following = user.following;

           const feedPosts = await Post.find({postedBy : {$in : following}}).sort({createdAt : -1})

           res.status(200).json(feedPosts)
    } catch (error) {
        console.error("Error in post Controller page: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
 

const getUserPosts = async (req, res)  => {
    const { username } = req.params;

    try {
        const user = await User.findOne({username});
        if(!user){
            res.status(404).json({ error : "user not found" });
        }
        const posts = await Post.find({postedBy:user._id}).sort({createdAt : -1})
        res.status(200).json(posts);
        } catch (error) {
          console.error("Error in post Controller page: " + error.message);
        res.status(500).json({ error: error.message });
    }
}
 
 
export { createPost , getPost , deletePost , likeUnlikePost , replyPost , getFeedPost , getUserPosts };
