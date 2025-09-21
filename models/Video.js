import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnailImg: { type: String },
    underImg : { type:String },
    url: { type: String, required: true },
    trailer: { type:String }, 
    category: { type: String }
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
