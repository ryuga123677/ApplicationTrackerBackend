import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";

const applicationcreater = asyncHandler(async (req, res) => {
    const { title, companyname, location, amount, description, skillsrequired, username } = req.body;
    if (!(title, companyname, location, amount, description, skillsrequired)) {
        res.status(404).send({
            message: "Please fill all details"
        })
    }
    const user = await User.findOne({ username: username });
    if (!user) {
        res.status(404).send({
            message: "User not found"
        })

    }
    const application = await Application.create({ title, companyname, location, amount, description, skillsrequired });
    if (!application) {

        res.status(404).send({
            message: "Something went wrong in creating application"
        })
    }
    user.application=application._id;
    application.postedby=user._id;
    await user.save();
    await application.save();
    return res.status(200).send({
        message: "Application created successfully"
    })
});
const applicationmodifier = asyncHandler(async (req, res) => {
    const { title, companyname, location, amount, description, skillsrequired, username } = req.body;
    if (!(title, companyname, location, amount, description, skillsrequired)) {
        res.status(404).send({
            message: "Please fill all details"
        })
    }
    const user = await User.findOne({ username: username });
    if (!user) {
        res.status(404).send({
            message: "User not found"
        })

    }
    const applicationbyuser = user.application;


    
    const application = await Application.findByIdAndUpdate(applicationbyuser, {
        $set: {
            title: title,
            companyname,
            location,
            amount,
            description,
            skillsrequired

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
    const { applicationid } = req.body;
    const application = await Application.findByIdAndDelete(applicationid);
    if (!application) {
        res.status(404).send({ message: "Application not found" });
    }
    return res.status(200).send({ message: "Application deleted successfully" });
});
const applicationlists = asyncHandler(async (req, res) => {
    const applications= await Application({});
    return res.status(200).send(applications);
});
const applicationForDisplay = asyncHandler(async (req, res) => {
    const { applicationid } = req.body;
    const application = await Application.findOne({
        _id: applicationid
    });
    if (!application) {
        res.status(404).send({ message: "Application not found" });
    }
    return res.status(200).send(application);
});

export { applicationcreater, applicationmodifier, applicationTobeDeleted,applicationlists, applicationForDisplay }