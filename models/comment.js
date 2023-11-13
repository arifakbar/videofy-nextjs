import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    videoId: {
      type: ObjectId,
      ref: "Video",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
