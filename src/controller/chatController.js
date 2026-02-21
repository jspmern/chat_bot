const Message = require("../model/message");
const generateMsg = require("../services/llmservice");

const chatHandleController=async(req,res)=>{
    const {message}=req.body;
     try{
        if(!message)return res.status(400).json({error:"message is required"})
        // here you can add your logic to process the message and generate a response
        const responseMessage = await generateMsg(message);
        return res.json({message:responseMessage})
     }
     catch(error){
        res.status(500).json({error:"something went wrong"+error})
     }
}
const  saveChatSessionToDB=async(req,res)=>{
   try {
     const {sessionId,messages,endedAt,user}=req.body;
     if(!sessionId || messages.length===0)return res.status(400).json({error:"sessionId and messages are required"})
         const newMessage=new Message({
             sessionId,
             messages,
             user,
             endedAt:endedAt,})
         await newMessage.save()
     res.status(200).json({message:"chat session saved successfully"})
   } catch (error) {
       return res.status(500).json({error:"something went wrong"+error})
   }
}
const getAllChatHandler=async(req,res)=>{
    try{
        const user=req.query.user;
        if(!user) return res.status(400).json({error:"must have login to access this resource"})
            const allChatMessages=await Message.find({user:user}).sort({endedAt:-1})
         res.status(200).json({messages:allChatMessages})
    }
    catch(error){
        res.status(500).json({error:"something went wrong"+error})
    }
}
module.exports={
    chatHandleController,
    saveChatSessionToDB,
    getAllChatHandler
}