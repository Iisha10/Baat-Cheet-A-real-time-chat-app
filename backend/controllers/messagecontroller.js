import Conversation from "../models/conversationmodel.js";
import Message from "../models/message.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage=async(req, res)=>{
   try{
        const{message}=req.body;
        const {id: receiverId}=req.params;
        const senderId=req.user._id;

        let conversation= await Conversation.findOne({
          participants: {$all: [senderId, receiverId]}
        })
        if(!conversation){
          conversation=await Conversation.create({ 
               participants: [senderId, receiverId]
          })
        }
        const newMessage=new Message({
         senderId,
         receiverId,
         message,
        }) 
        if(newMessage)
        {
          conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()]);//this will run in parallel

        //Socket io is being implemented here:)

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
          io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
   }catch(error){
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
   }
};


export const getMessages=async(req, res)=>{
  try{
     const{id:userToChatId}= req.params;
     const senderId=req.user._id;
     const conversation=await Conversation.findOne({
      participants:{$all:[senderId, userToChatId]}
     }).populate("messages");//it does not give reference but the actua;l messagee itself
     if(!conversation){
      return res.status(200).json([]);
     }

     const messages=conversation.messages;

     res.status(200).json(messages);
  }catch(error){
        console.log("Error in etMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
   }
}
// export default sendMessage;
