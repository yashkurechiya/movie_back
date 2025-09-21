import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Video from "./models/Video.js";

dotenv.config();
connectDB();

const videos = [
  {
    title: "Nature Documentary",
    description: "Relax with this beautiful nature video",
    thumbnail: "https://images.unsplash.com/photo-1756649627237-d367a3e3a311?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    category: "Documentary"
  },
  {
    title: "Action Movie Trailer",
    description: "An exciting action trailer",
    thumbnail: "https://images.unsplash.com/photo-1756550120927-dede81d8b2bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    url: "img",
    category: "Action"
  }
];

const importData = async () => {
  try {
    await Video.deleteMany();
    await Video.insertMany(videos);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
