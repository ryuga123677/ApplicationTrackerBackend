import { asyncHandler } from "../utils/asyncHandler.js";
import { Userinfo } from "../models/userinfo.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";
import upload from "../middlewares/multer.middleware.js"

const createdetails = asyncHandler( async (req, res) => {
    
    const { name, email, address, college, cgpa, skills, hirereason, coverletter, jobid } = req.body;

    if (!name || !email || !address || !college || !cgpa || !skills || !hirereason || !coverletter || !jobid) {
      return res.status(400).send({
        message: "Please fill all details",
      });
    }


    if (!req.file) {
      return res.status(400).send({
        message: "Resume upload failed",
      });
    }

    const resumePath = req.file.path;

    const details = await Userinfo.create({
      name,
      email,
      address,
      college,
      cgpa,
      skills,
      hirereason,
      coverletter,
      resume: resumePath,  
    });
    console.log("yes1");
    if (!details) {
      return res.status(500).send({
        message: "Something went wrong in creating the application",
      });
    }

    const job = await Application.findById(jobid);

    if (!job) {
      return res.status(404).send({
        message: "Job not found",
      });
    }
    

    job.applicants.push(details._id); 
    
    
    await job.save();
    
  
    return res.status(200).send({
      message: "Application sent successfully",
    });
  });
  
const myjobs=asyncHandler(async (req, res) => {
    const {email}=req.body;
    const user =await User.findOne({email:email});
    const data=user.applyto;
    if(!data){
        return res.status(404).send({
            message: "No data"
        })
    }
    return res.status(200).send(data);


});
export { createdetails,myjobs}