import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";




const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password, companyname } = req.body;
    if (!(fullname && email && password && companyname && username)) {
        res.status(404).send({
            message: "all fields are required"
        })


    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        res.status(404).send({ message: "user already exists" });
    }
    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        companyname,

    });
    if (!user) {
        res.status(400).send({ message: "something went wrong in creating user" });
    }
    return res.status(200).send({
        message: "user created successfully"
    });


});
const loginUser=asyncHandler(async (req,res) => {
    const {username,password}=req.body;
    if(!(username && password))
    {
        res.status(400).send({
            message: "username and password are required"
        })
    }
    const user=await User.findOne({ username,password});
    if (!user) {
        res.status(400).send({ message: "user not found" });
        
    }
    return res.status(200).send({message:"logged in successfully"})


});




export { registerUser,loginUser }
