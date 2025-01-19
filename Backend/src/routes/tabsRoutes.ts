import express from 'express';
import {
    getTabsByOrgId,
    createTab,
    editTab,
    deleteTab,
} from '../controllers/tabsController';
import * as console from "node:console";


const router = express.Router();

// Home route for localhost
router.get('/', (req, res) => {
    console.log("11111111111111111111111111111111111111")
    res.send('Welcome to the Home Page');
});

// Get all tabs for a specific organization by orgId
router.get('/tabs/:orgId', getTabsByOrgId);



// Create a new Tab
router.post('/tabs', createTab);

// Edit an existing Tab by tabId
router.put('/tabs/:tabId', editTab);

// Delete a Tab by tabId
router.delete('/tabs/:tabId', deleteTab);

export default router;
