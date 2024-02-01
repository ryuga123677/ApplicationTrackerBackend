import {Router} from 'express';
import { applicationcreater, applicationmodifier, applicationTobeDeleted,applicationlists, applicationForDisplay, myapplication } from '../controllers/application.controller.js';
const router=Router();

router.route('/createapplication').post(applicationcreater);
router.route('/applicationmodifier').post(applicationmodifier);
router.route('/applicationtobedeleted').delete(applicationTobeDeleted); 
router.route('/applicationlists').get(applicationlists); 
router.route('/applicationfordisplay').get(applicationForDisplay);
router.route('/applications').get(myapplication);
export default router;