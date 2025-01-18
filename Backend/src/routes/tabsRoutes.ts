import express from 'express';
import {
    getTabsByOrgId,
    createTab,
    editTab,
    deleteTab,
} from '../controllers/tabsController';


const router = express.Router();

// Get all tabs for a specific organization by orgId
router.get('/tabs/:orgId', getTabsByOrgId);

// Create a new Tab
router.post('/tabs', createTab);

// Edit an existing Tab by tabId
router.put('/tabs/:tabId', editTab);

// Delete a Tab by tabId
router.delete('/tabs/:tabId', deleteTab);

export default router;
