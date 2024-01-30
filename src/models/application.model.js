import mongoose, { Schema } from "mongoose";
const applicationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,

        },
        postedby: {
            type: Schema.Types.ObjectId,
            ref: "user"
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
        description:{
            type: String,
        },
        skillsrequired:{
            type: String,
            required: true
        },


    }
);
export const Application=mongoose.model("Application",applicationSchema);