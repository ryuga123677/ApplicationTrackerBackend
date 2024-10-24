import { asyncHandler } from "../utils/asyncHandler.js";
import { Provider } from "../models/provider.model.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../middlewares/cloudinary.middlewares.js";



const registerProvider = asyncHandler(async (req, res) => {
    const { name, email, password, companyname,title } = req.body;
    if (!(name && email && password && companyname && title)) {
        res.status(404).send({
            message: "all fields are required"
        })


    }
    if (!req.file) {
        return res.status(400).send({
          message: "image upload failed",
        });
      }
  
      const profilephoto = req.file.path;
    const existedUser = await Provider.findOne({
        email:email
    });
    if (existedUser) {
        res.status(404).send({ message: "user already exists" });
    }
    const imageurl=await uploadCloudinary(profilephoto);
    const user = await Provider.create({
         name,
        email,
        password,
      
        companyname,
        title,
        profilephoto:imageurl.url

    });
    if (!user) {
        res.status(400).send({ message: "something went wrong in creating user" });
    }
    return res.status(200).send({
        message: "user created successfully"
    });


});
const loginProvider=asyncHandler(async (req,res) => {
    const {email,password}=req.body;
    if(!(email && password))
    {
       return res.status(400).send({
            message: "email and password are required"
        })
    }
    const user=await Provider.findOne({ email,password});
    if (!user) {
       return res.status(400).send({ message: "user not found" });
        
    }
    return res.status(200).send({message:"logged in successfully"})


});
const jobsposted=asyncHandler(async (req,res) => {

    const user=await Provider.findOne({email:req.query.search});
    if(!user)
    {
        return res.status(400).send("No user found");
    }
    const data = await user.populate('application');
    if(!data)return res.status(400).send("No data");
    return res.status(200).send(
   data.application
    );
});

const enablechat=asyncHandler(async (req,res) => {
const {provideremail,seekeremail}=req.body;
console.log(provideremail,  seekeremail);
const seeker=await User.findOne({email:seekeremail});
console.log(seeker);
if(!seeker)return res.status(404).send("No user found");
seeker.chatenable.push(provideremail);
await seeker.save();
   return res.status(200).send('success');
});
const getemails=asyncHandler(async (req, res) => {
    const email=req.query.search;
    const user=await Provider.findOne({ email});
    return res.status(200).send(user.chatenable);
})
const getprofile=asyncHandler(async (req, res) => {
    const email=req.query.search;
    const user=await Provider.findOne({ email});
    return res.status(200).send(user);
})


export { registerProvider,loginProvider,jobsposted,enablechat,getprofile,getemails}
