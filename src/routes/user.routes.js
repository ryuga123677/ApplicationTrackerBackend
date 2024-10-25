import {Router} from "express"
import {registerUser,loginUser,getemails,getprofile,enablechat,verifyuserseeker} from "../controllers/user.controller.js"
import uploadphoto from '../middlewares/photomulter.middleware.js';

const router=Router();
router.route('/registerseeker').post(uploadphoto.single("profilephoto"),registerUser);
router.route('/loginseeker').post(loginUser);
router.route('/isseekerlogin').get(verifyuserseeker);
router.route('/getprovideremail').get(getemails);
router.route('/getprofile').get(getprofile);
router.route('/enablechat').post(enablechat);
export default router;