import mongoose,{Schema} from "mongoose";

const providerSchema=new Schema(
    {
        name:{
            type:String,
            required:true,
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
    
        companyname:{
            type:String,
            required:true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        title:{
            type:String,
            required:true,
        },  chatenable:[{
            type:String,
          }],
        profilephoto:{
            type: String,
            },
        application:[{

            type: Schema.Types.ObjectId,
            ref: "Application"
        }],
        applicantsinfo:[{

            type: Schema.Types.ObjectId,
            ref: "Userinfo"
        }],
        refreshToken:{
            type:String,
        }
    }
);
export const Provider = mongoose.model("Provider", providerSchema);