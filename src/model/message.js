const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  msg: {
    type: String,
    required: [true, 'Message content is required'],
    minlength: [1, 'Message cannot be empty'],
  },
  sender: {
    type: String,
    required: [true, 'Sender is required'],
    enum: ['user', 'bot'],
    lowercase: true
  }
}, { _id: false });

const sessionSchema=new mongoose.Schema({
    sessionId:{
        type:String,
        required:[true,"sessionId is required"],
        unique:true,
    },
    user:{
        type:String,
        required:[true,"user is required"],
    },
        messages:[
            {
                type:messageSchema,
                 required:[true,"messages are required"],
                  validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one message is required'
    }
            }
        ],
         endedAt: {
    type: Date,
    required: [true, 'End date is required'],
    default: Date.now
  },
    createdAt: {
    type: Date,
    default: Date.now
  }
});
 
const Message=mongoose.model("MessageHistory",sessionSchema);

module.exports=Message;