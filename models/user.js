import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            index: true
        },
        phoneNumber: {
            type: Number,
            default: 0
        },
        profilePic: {
            type: String,
            default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
        },
        subscribers: {
            type: Number,
            default: 0
        },
        // subscriptions: [
        //     {
        //         type: ObjectId,
        //         ref: "User"
        //     }
        // ]
        // videos: [
        //     {
        //         type: ObjectId,
        //         ref: "Video"
        //     }
        // ],
        // history: [
        //     {
        //         type: ObjectId,
        //         ref: "Video"
        //     }
        // ],
        // watchLater: [
        //     {
        //         type: ObjectId,
        //         ref: "Video"
        //     }
        // ],
        // likedVideos: [
        //     {
        //         type: ObjectId,
        //         ref: "Video"
        //     }
        // ],
        // userPlaylists: [
        //     {
        //         type: ObjectId,
        //         ref: "Playlist"
        //     }
        // ],
    }, { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", userSchema);