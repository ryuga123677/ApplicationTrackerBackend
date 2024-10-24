import {Router} from 'express';
import { createdetails,myjobs } from '../controllers/userinfo.controller.js';
import upload from '../middlewares/multer.middleware.js';
const router=Router();

router.route('/createdetails').post(upload.single('resume'),createdetails);
router.route('/myjobs').get(myjobs);
export default router;