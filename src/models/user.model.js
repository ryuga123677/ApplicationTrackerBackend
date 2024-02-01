import mongoose,{Schema} from "mongoose";

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        companyname:{
            type:String,
            required:true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        application:[{

            type: Schema.Types.ObjectId,
            ref: "Application"
        }],
        refreshToken:{
            type:String,
        }
    }
);
export const User = mongoose.model("User", userSchema);