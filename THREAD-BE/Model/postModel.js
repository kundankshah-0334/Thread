import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    text: {
        type: String,
        maxLength: 500
    },
    img: {
        type: String,
    },
    likes: {
        type : [mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[]
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            username: {
                type: String,
            },
        },
    ],
    followers: {
        type: [String],
        default: []
    },
    following: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            userName: {
                type: String,
            }
        }
    ]

}, {
    timestamps: true
});

const PostModel = model('Post', PostSchema);

export default PostModel;
