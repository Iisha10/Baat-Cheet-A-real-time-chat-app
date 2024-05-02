import express from "express";
import  {sendMessage}  from "../controllers/messagecontroller.js";
import { getMessages } from "../controllers/messagecontroller.js";
import protectRoute from "../middleware/protectRoute.js";
const router=express.Router();


router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessage);

export default router;