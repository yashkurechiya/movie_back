import express from 'express'
import { Register, userLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// GET all videos
userRouter.post("/register",Register );
userRouter.post("/login", userLogin );

// GET single video by id
// userRouter.get("/:id", getVideoById);
// router.get("/indi/:id", indifun);
// router.post("/add", addmovie);

export default userRouter;
