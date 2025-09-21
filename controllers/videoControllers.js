import Video from "../models/Video.js";
import {GoogleGenerativeAI} from "@google/generative-ai";

// GET all videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single video
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const chat = async (req, res) => {
  try {
 
    const { messages } = req.body; // array of {role, content}

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Merge system + user conversation
    // const fullPrompt = [systemPrompt, ...messages]
    //   .map((m) => `${m.role}: ${m.content}`)
    //   .join("\n");

    const result = await model.generateContent(messages);
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteCard = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (video) {
      res.json({ message: "Video deleted", video });
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addmovie = async(req, res) =>{
    try {
        
        const {title,description, thumbnailImg, underImg, url, trailer, category } = req.body;
        const newVideo = new Video({ title, description,thumbnailImg,underImg,url, trailer, category});

        await newVideo.save();

        res.status(201).json({ message: "Video added" , video: newVideo})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

const indifun = async (req, res) =>{
  try {
    const {id} = req.body;
    if (id) {
      res.json(url);
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getVideos, getVideoById , addmovie, indifun ,deleteCard, chat};
