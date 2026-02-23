const express = require('express');
const  generateMsg  = require('../services/llmservice');
const { chatHandleController, saveChatSessionToDB,getAllChatHandler } = require('../controller/chatController');
const upload = require('../config/multer');
const getUploadFileHandler = require('../controller/uploadFileController');
const router = express.Router();
router.post("/chat",chatHandleController)
router.post('/save', saveChatSessionToDB);
router.get('/getAllChat',getAllChatHandler)
router.post('/upload-file',upload.array('assets',2),getUploadFileHandler)
module.exports=router;