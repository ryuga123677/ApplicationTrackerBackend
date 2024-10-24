import mongoose,{Schema} from "mongoose";
const chatSchema = new Schema({
    senderemail: {type:String},
    receiveremail: {type:String},
    message: {type:String},
    timestamp: { type: Date, default: Date.now },
  });
 
export const Chat = mongoose.model('Chat', chatSchema);
