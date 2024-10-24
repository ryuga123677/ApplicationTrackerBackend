import mongoose, { Schema } from "mongoose";
const applicationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,

        },
        postedby: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
             },
        companyname:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        duration:{
            type:String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default:Date.now,
        }
        ,
        
        description:{
            type: String,
        },
        skillsrequired:{
            type: String,
            required: true
        },
        createdby:{
            type: Schema.Types.ObjectId,
            ref: "Provider", 
        },
        applicants:[{
            type: Schema.Types.ObjectId,
            ref: "Userinfo",
        }]

    }
);
export const Application=mongoose.model("Application",applicationSchema);