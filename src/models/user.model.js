import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profilephoto:{
  type: String,
  },
  chatenable:[{
    type:String,
  }],
  details: [
    {
      type: Schema.Types.ObjectId,
      ref: "Userinfo",
    },
  ],
  applyto: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});
export const User = mongoose.model("User", userSchema);
