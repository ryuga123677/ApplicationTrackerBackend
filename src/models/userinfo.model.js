import mongoose, { Schema } from "mongoose";
const userinfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  hirereason: {
    type: String,
    required: true,
  },
  coverletter: {
    type: String,
  
  },
  resume: {
    type: String,
  },
});
export const Userinfo = mongoose.model("Userinfo", userinfoSchema);
