import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CATEGORY_TYPE = ["MUSIC", "GAMING", "NEWS", "SPORTS"];

const videoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: CATEGORY_TYPE,
    },
    video: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    views: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model("Video", videoSchema);
