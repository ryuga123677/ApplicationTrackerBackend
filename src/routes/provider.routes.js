import {Router} from "express"
import {registerProvider,loginProvider,jobsposted,enablechat,getprofile,getemails, verifyuserprovider,logoutprovider} from "../controllers/provider.controller.js"
import uploadphoto from '../middlewares/photomulter.middleware.js';

const router=Router();
router.route('/registerprovider').post(uploadphoto.single("profilephoto"),registerProvider);
router.route('/loginprovider').post(loginProvider);
router.route('/isproviderlogin').get(verifyuserprovider);
router.route('/jobsposted').get(jobsposted);
router.route('/getapplieremail').get(getemails);
router.route('/enablechat').post(enablechat);
router.route('/getprofile').get(getprofile);
router.route('/logoutprovider').get(logoutprovider);

export default router;