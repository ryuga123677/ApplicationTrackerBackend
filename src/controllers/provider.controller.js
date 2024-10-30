import { asyncHandler } from "../utils/asyncHandler.js";
import { Provider } from "../models/provider.model.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
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
        
    }const accessToken = jwt.sign({ email: email}, "access-token-provider", {
        expiresIn: "3600s",
      });
      const refreshToken = jwt.sign(
        { email: email },
        "refresh-token-provider",
        { expiresIn: "10h" }
      );
    return res.status(200).cookie("accessToken", accessToken, {
        httpOnly: false,
        secure: true,
        maxAge: 3600000, 
        sameSite: 'none'
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: true,
        maxAge: 36000000, 
        sameSite: 'none'
      
      }).send({message:"logged in successfully"})


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
const provider=await Provider.findOne({email:provideremail});
console.log(seeker);
if(!seeker)return res.status(404).send("No user found");
provider.chatenable.push(seekeremail);
seeker.chatenable.push(provideremail);
await provider.save();
await seeker.save();
   return res.status(200).send('success');
});
const getemails=asyncHandler(async (req, res) => {
    const email=req.query.search;
   
    const user=await Provider.findOne({ email:email});
    console.log(user);
    return res.status(200).send(user.chatenable);
})
const getprofile=asyncHandler(async (req, res) => {
    const email=req.query.search;
    const user=await Provider.findOne({ email});
    return res.status(200).send(user);
})
const verifyuserprovider = async (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
      if (renewtokenprovider(req, res)) {
        return res.status(200).send("success");
      }
    } else {
      jwt.verify(accesstoken, "access-token-provider", (err, decoded) => {
        if (err) {
          return res.json("invalid access token");
        } else {
          req.email = decoded.email;
          return res.status(200).send("success");
        }
      });
    }
  };
  const renewtokenprovider = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    
    if (!refreshtoken) {
       res.json("no refreshtoken");
       return false;
    } else {
      jwt.verify(refreshtoken, "refresh-token-provider", (err, decoded) => {
        if (err) {
           res.json("invalid refresh token");
           return false;
        } else {
          const accessToken = jwt.sign(
            { email: decoded.email },
            "access-token-provider",
            { expiresIn: "1h" }
          );
  
          res.cookie("accessToken", accessToken, {
            httpOnly: false,
            secure: true,
            maxAge: 3600000,
         sameSite: 'none'
          });
        
        }
      });
      return true;
    }
  
  };
  

export { registerProvider,loginProvider,jobsposted,enablechat,getprofile,getemails,verifyuserprovider}
