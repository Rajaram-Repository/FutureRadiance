import express from 'express';
import {
    getTabsByOrgId,
    createTab,
    editTab,
    deleteTab,
} from '../controllers/tabsController';
import {
    getFieldDetailsByTabId,
} from '../controllers/fieldController';
import  UserController  from '../controllers/usercontroller';
import * as console from "node:console";
import { getListFieldDetailsByTabId, getRecordDetailsById,createRecord,} from '../controllers/recordController';

const router = express.Router();

// Home route for localhost
router.get('/', (req, res) => {
    console.log(" test ")
    res.send('Welcome to the Home Page');
});


router.post('/signup',UserController.signup); // signupS

router.get('/:orgId', getTabsByOrgId); // get all tab from org id [Main Tab]
router.get('/org/:tabId', getListFieldDetailsByTabId); // get list view from tabid [List View]
router.get('/org/field/:tabId', getFieldDetailsByTabId); // get all field and subform field from tab [Create]
router.get('/org/:tabId/:recordId', getRecordDetailsById); // get record detail view ; All record with subform [Detail View]
router.post('/createRecord',createRecord); // create record with subfrom 


router.post('/tabs', createTab);

router.put('/tabs/:tabId', editTab);

router.delete('/tabs/:tabId', deleteTab);

export default router;
