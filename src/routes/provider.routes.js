import {Router} from "express"
import {registerProvider,loginProvider,jobsposted,enablechat,getprofile,getemails} from "../controllers/provider.controller.js"
import uploadphoto from '../middlewares/photomulter.middleware.js';

const router=Router();
router.route('/registerprovider').post(uploadphoto.single("profilephoto"),registerProvider);
router.route('/loginprovider').post(loginProvider);
router.route('/jobsposted').get(jobsposted);
router.route('/getprovideremail').get(getemails);
router.route('/enablechat').post(enablechat);
router.route('/getprofile').get(getprofile);

export default router;