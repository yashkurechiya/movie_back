import express from 'express'
import {addmovie, getVideoById, getVideos, indifun, deleteCard , chat} from '../controllers/videoControllers.js'

const router = express.Router();

// GET all videos
router.get("/", getVideos);
router.post("/chat", chat);

// GET single video by id
router.delete("/delete/:id", deleteCard);
router.get("/:id", getVideoById);
router.get("/:id", indifun);
router.post("/add", addmovie);

export default router;
