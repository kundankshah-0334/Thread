import User from "../Model/User.js";
import bcrypt from 'bcryptjs';
import GenerateTokenAndSetCookies from "../utils/helpers/GenerateTokenAndSetCookies.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Post from "../Model/postModel.js"
const signUpuser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        if (newUser) {
            GenerateTokenAndSetCookies(newUser._id, res);
            res.status(201).json({

                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                bio: newUser.bio,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({ error: "Invalid User data" });
        }

    } catch (error) {
        console.error("Error in Signup: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compareSync(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }
        if (user.isFrozen) {
			user.isFrozen = false;
			await user.save();
		}
        

        GenerateTokenAndSetCookies(user._id, res);

        res.status(201).json({

            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic,
            username: user.username

        });


    } catch (error) {
        console.error("Error in login: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const logoutUser = async (req, res) => {
    try {

        res.cookie("jwt", "", { maxAge: 1 })
        res.status(200).json({ message: "user logout successfully" })

    } catch (error) {
        console.error("Error in logout: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) return res.status(400).json({ error: "User can't follow and Unfollow to himself or herself" })

        if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" + req.user._id })

        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user.id } });
            res.status(200).json({ message: "user unfollowed successfully" })
        }
        else {
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            await User.findByIdAndUpdate(id, { $push: { followers: req.user.id } });
            res.status(200).json({ message: "user followed successfully" })
        }


    } catch (error) {
        console.error("Error in FollowAndUnfollow user: " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const getProfile = async (req, res) => {
    // const { username } = req.params;
    const { query } = req.params;

    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");

        } else {
            user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
        }

        if (!user) return res.status(400).json({ error: "User not found" })

        res.status(200).json(user)


    } catch (error) {
        console.error("Error in Get Profile : " + error.message);
        res.status(500).json({ error: error.message });
    }
};
const updateUser = async (req, res) => {
    const { name, username, email, password, bio } = req.body;
    let { profilePic } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);

        if (req.params.id !== userId.toString()) return res.status(400).json({ error: "Can not update others Profile" })

        if (!user) return res.status(400).json({ error: "iuser not found" })

        if (password) {
            const salt = await bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hashSync(password, salt);
            user.password = hashedPassword;
        }
        if (profilePic) {
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }
            const uploadedResponce = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponce.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.profilePic = profilePic || user.profilePic;
        user.username = username || user.username;

        user = await user.save();


        // Find all posts that this user replied and update username and userProfilePic fields
		await Post.updateMany(
			{ "replies.userId": userId },
			{
				$set: {
					"replies.$[reply].username": user.username,
					"replies.$[reply].profilePic": user.profilePic,
				},
			},
			{ arrayFilters: [{ "reply.userId": userId }] }
		);


        user.password = null;
        res.status(200).json(user)

    } catch (error) {
        console.error("Error in Update user: " + error.message);
        res.status(500).json({ error: error.message });
    }


};
const getSuggestedUsers = async (req, res) => {
    try {
        // exclude the current user from suggested users array and exclude users that current user is already following
        const userId = req.user._id;

        const usersFollowedByYou = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            {
                $sample: { size: 10 },
            },
        ]);
        const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach((user) => (user.password = null));

        res.status(200).json(suggestedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const freezeAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		user.isFrozen = true;
		await user.save();

		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


export { signUpuser, loginUser, logoutUser, followUnfollowUser, updateUser, getProfile , getSuggestedUsers , freezeAccount };
