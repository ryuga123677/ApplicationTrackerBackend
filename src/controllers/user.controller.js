import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../middlewares/cloudinary.middlewares.js";
import { Provider } from "../models/provider.model.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    res.status(404).send({
      message: "all fields are required",
    });
  }
  if (!req.file) {
    return res.status(400).send({
      message: "image upload failed",
    });
  }

  const profilephoto = req.file.path;
  const existedUser = await User.findOne({
    email: email,
  });
  if (existedUser) {
    res.status(404).send({ message: "user already exists" });
  }
  const imageurl = await uploadCloudinary(profilephoto);
  const user = await User.create({
    name,
    email,
    password,
    profilephoto: imageurl.url,
  });
  if (!user) {
    res.status(400).send({ message: "something went wrong in creating user" });
  }
  return res.status(200).send({
    message: "user created successfully",
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send({
      message: "email and password are required",
    });
  }
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).send({ message: "user not found" });
  }
  const accessToken = jwt.sign({ email: email}, "access-token-seeker", {
    expiresIn: "3600s",
  });
  const refreshToken = jwt.sign(
    { email: email },
    "refresh-token-seeker",
    { expiresIn: "10h" }
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "None", 
   
  
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 36000000, 
      sameSite: "None",
    
     
    })
    .send({ message: "logged in successfully" });
});

const getemails = asyncHandler(async (req, res) => {
  const email = req.query.search;
  const user = await User.findOne({ email });
  return res.status(200).send(user.chatenable);
});
const getprofile = asyncHandler(async (req, res) => {
  const email = req.query.search;
  const user = await User.findOne({ email });
  return res.status(200).send(user);
});
const enablechat = asyncHandler(async (req, res) => {
  const { provideremail, seekeremail } = req.body;

  const provider = await Provider.findOne({ email: provideremail });

  if (!provider) return res.status(404).send("No user found");
  provider.chatenable.push(seekeremail);
  await provider.save();
  return res.status(200).send("success");
});
const logoutuser = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken', { 
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.clearCookie('accessToken', { 
    httpOnly: true,
    secure: true,
    sameSite: "None",
  })

  res.status(200).json({ message: 'Logged out successfully' });
});
const verifyuserseeker = async (req, res) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
      if (renewtokenseeker(req, res)) {
        return res.status(200).send("success");
      }
    } else {
      jwt.verify(accesstoken, "access-token-seeker", (err, decoded) => {
        if (err) {
          return res.json("invalid access token");
        } else {
          req.email = decoded.email;
          return res.status(200).send("success");
        }
      });
    }
  };
  const renewtokenseeker = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    
    if (!refreshtoken) {
       res.json("no refreshtoken");
       return false;
    } else {
      jwt.verify(refreshtoken, "refresh-token-seeker", (err, decoded) => {
        if (err) {
           res.json("invalid refresh token");
           return false;
        } else {
          const accessToken = jwt.sign(
            { email: decoded.email },
            "access-token-seeker",
            { expiresIn: "3600s" }
          );
  
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
            sameSite: "None",
    
          });
        
        }
      });
      return true;
    }
  
  };
export { registerUser, loginUser, getemails, getprofile, enablechat,verifyuserseeker,logoutuser };
