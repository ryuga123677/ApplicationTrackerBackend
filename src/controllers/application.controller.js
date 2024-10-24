import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.model.js";
import { Provider } from "../models/provider.model.js";

const applicationcreater = asyncHandler(async (req, res) => {
    const { email,
        title,
        location,
        companyname,
        amount,
        description,
        skillsrequired,
        duration,
        status, } = req.body;
    if (!(email && title && companyname && location && amount && description && skillsrequired && duration && status)) {
        return res.status(404).send({
            message: "Please fill all details"
        })
    }
    const user = await Provider.findOne({ email: email });
    if (!user) {
        return res.status(404).send({
            message: "User not found"
        })

    }
    const newapplication = await Application.create({ title, companyname, location, amount, description, skillsrequired,duration,status });
    if (!newapplication) {

        return res.status(404).send({
            message: "Something went wrong in creating application"
        })
    }
    user.application.push(newapplication._id);
    newapplication.createdby=user._id;
    await user.save();
    await newapplication.save();
    return res.status(200).send({
        message: "Application created successfully"
    })
});
const applicationmodifier = asyncHandler(async (req, res) => {
    const { title, companyname, location, amount, description,duration,statu, skillsrequired, id } = req.body;
    if (!(title && companyname && location && amount && description && skillsrequired)) {
        res.status(404).send({
            message: "Please fill all details"
        })
    }

    const application = await Application.findByIdAndUpdate(id, {
        $set: {
            title: title,
            companyname,
            location,
            amount,
            description,
            skillsrequired,
            duration,
            statu

        },

    }, {
        new: true
    });
    if (!application) {
        res.send({ message: "Application not found" });
    }

    return res.status(200).send({
        message: "application updated successfully"
    });

});
const applicationTobeDeleted = asyncHandler(async (req, res) => {
    const  applicationid  = req.query.id;
    const application = await Application.findByIdAndDelete(applicationid);
    if (!application) {
        res.status(404).send({ message: "Application not found" });
    }
    return res.status(200).send({ message: "Application deleted successfully" });
});
const applicationlists = asyncHandler(async (req, res) => {
    const applications= await Application.find({});
    return res.status(200).send(applications);
});
const applicationForDisplay = asyncHandler(async (req, res) => {
    const  applicationid  = req.query.search;
    const application = await Application.findOne({
        _id: applicationid
    });
    if (!application) {
        res.status(404).send({ message: "Application not found" });
    }
    return res.status(200).send(application);
});
const myapplication =asyncHandler(async (req, res) => {
    const user=await Provider.findOne({username: req.query.search}).populate('application');
    if(!user)
    {
        res.status(404).send({ message: "User not found" });

    }
    
    return res.status(200).send(user.application);


});
const applicantsinfolist=asyncHandler(async(req,res)=>{
const jobid=req.query.search;
const job=await Application.findById(jobid).populate('applicants');

if(!job)
    {
        return res.status(402).send("Application not found");
    }

console.log("yess",job.applicants);
return res.status(200).send(job.applicants);


});

export { applicationcreater, applicationmodifier, applicationTobeDeleted,applicationlists,myapplication, applicationForDisplay,applicantsinfolist }