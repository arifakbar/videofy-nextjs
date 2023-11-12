import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  videoId: {
    typeof: ObjectId,
    ref: "Video",
  },
  userId: {
    typeof: ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
