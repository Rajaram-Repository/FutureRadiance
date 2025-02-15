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

const router = express.Router();

// Home route for localhost
router.get('/', (req, res) => {
    console.log(" test ")
    res.send('Welcome to the Home Page');
});


router.post('/signup',UserController.signup); // signup
router.get('/org/:orgId', getTabsByOrgId); // Get all tab from org id
router.get('/org/tab/:tabId', getFieldDetailsByTabId); // get all field from tab



router.post('/tabs', createTab);

router.put('/tabs/:tabId', editTab);

router.delete('/tabs/:tabId', deleteTab);

export default router;
