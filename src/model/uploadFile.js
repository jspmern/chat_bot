const mongoose=require("mongoose");
const fileSchema=new mongoose.Schema({
    sessionId:{
        type:String,
        required:true,
        index:true
    },
    uploadedBy:{
        type:String,
        enum:["user","bot"],
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
   fileName: {
       type:String,
       required:true
    },
    mimeType: {
    type: String,
    required: true
  },
    fileSize: {
    type: Number, // bytes
    required: true
  },

  messageId: {
    type: Number, // link to message.id (optional)
    default: null
  },
    embedding: {
    type: [Number], // vector embedding (optional)
    default: null
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  deletedAt: {
    type: Date,
    default: null
  }
})

module.exports=mongoose.model("UploadedFile",fileSchema)