import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    videos: [
      {
        type: ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Playlist ||
  mongoose.model("Playlist", playlistSchema);
