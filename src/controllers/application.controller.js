import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";

const applicationcreater = asyncHandler(async (req, res) => {
    const { title, companyname, location, amount, description, skillsrequired, username,duration,statu } = req.body;
    if (!(title, companyname, location, amount, description, skillsrequired,duration,statu)) {
        return res.status(404).send({
            message: "Please fill all details"
        })
    }
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).send({
            message: "User not found"
        })

    }
    const newapplication = await Application.create({ title, companyname, location, amount, description, skillsrequired,duration,statu });
    if (!newapplication) {

        return res.status(404).send({
            message: "Something went wrong in creating application"
        })
    }
    user.application.push(newapplication._id);
    newapplication.postedby=user._id;
    await user.save();
    await newapplication.save();
    return res.status(200).send({
        message: "Application created successfully"
    })
});
const applicationmodifier = asyncHandler(async (req, res) => {
    const { title, companyname, location, amount, description,duration,statu, skillsrequired, id } = req.body;
    if (!(title, companyname, location, amount, description, skillsrequired)) {
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
    const user=await User.findOne({username: req.query.search}).populate('application');
    if(!user)
    {
        res.status(404).send({ message: "User not found" });

    }
    
    return res.status(200).send(user.application);


});

export { applicationcreater, applicationmodifier, applicationTobeDeleted,applicationlists,myapplication, applicationForDisplay }