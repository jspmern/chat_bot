const express = require('express');
const  generateMsg  = require('../services/llmservice');
const { chatHandleController, saveChatSessionToDB,getAllChatHandler } = require('../controller/chatController');
const getUploadFileHandler = require('../controller/uploadFileController');
const router = express.Router();
router.post("/chat",chatHandleController)
router.post('/save', saveChatSessionToDB);
router.get('/getAllChat',getAllChatHandler)
router.post('/upload-file',getUploadFileHandler)
module.exports=router;