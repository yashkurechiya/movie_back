import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import videoRoutes from "./routes/videoRoutes.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

// DB Connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
