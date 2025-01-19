import { Request, Response } from 'express';
// import Tab from 'src/db/models/tab';
import { Op } from 'sequelize'; // Used for query filtering
import UserOrganization from '../db/models/user_organization'; // Assuming this is the model for User
import FieldDetails from '../db/models/fieldDetails';
import Tab from "../db/models/tab";

// Get all tabs for a specific organization
export const getTabsByOrgId = async (req: Request, res: Response) => {
    const { orgId } = req.params;

    try {
        const tabs = await Tab.findAll({
            where: {
                orgId: orgId, // Filter by organization ID
            },
            include: [
                { model: UserOrganization, as: 'modifiedByUser' }, // Including modifiedByUser if needed
                { model: UserOrganization, as: 'createdByUser' }, // Including createdByUser if needed
            ],
        });
        return res.status(200).json(tabs);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving tabs', details: error });
    }
};


const createSystemFields = async (tabId: number, createdBy: number) => {
    const systemFields = [
        {
            fieldName: `${tabId}Name`,
            fieldType: 1,
            uiType: 1,
            fieldSequence: 1,
            active: true,
            generatedType: 1,
            isMandatory: true,
            isHidden: false,
        },
        {
            fieldName: 'createdBy',
            fieldType: 2,
            uiType: 2,
            fieldSequence: 2,
            active: true,
            generatedType: 1,
            isMandatory: true,
            isHidden: false,
        },
        {
            fieldName: 'modifiedBy',
            fieldType: 3,
            uiType: 3,
            fieldSequence: 3,
            active: true,
            generatedType: 1,
            isMandatory: true,
            isHidden: true,
        },
        {
            fieldName: 'createTime',
            fieldType: 2,
            uiType: 2,
            fieldSequence: 4,
            active: true,
            generatedType: 1,
            isMandatory: true,
            isHidden: true,
        },
        {
            fieldName: 'modifiedTime',
            fieldType: 3,
            uiType: 3,
            fieldSequence: 5,
            active: true,
            generatedType: 1,
            isMandatory: true,
            isHidden: true,
        },
        {
            fieldName: 'Owner',
            fieldType: 2,
            uiType: 2,
            fieldSequence: 6,
            active: true,
            generatedType: 1,
            isMandatory: true,
            isHidden: false,
        },
    ];

    // Create the system fields
    for (const field of systemFields) {
        await FieldDetails.create({
            ...field,
            tabId: tabId,
            createdBy: createdBy,
            createTime: new Date(),
            modifiedTime: new Date(),
            modifiedBy: createdBy, // Assuming the creator modifies as well
        });
    }
};

// Tab creation API
export const createTab = async (req: Request, res: Response) => {
    const { name, orgId, createdBy } = req.body;

    try {
        // Create the new tab
        const newTab = await Tab.create({
            name,
            orgId,
            createdBy,
            createdTime: new Date(),
            modifiedBy: createdBy,
            modifiedTime: new Date(),
            active: true,
            tabSequence: 1, // You can modify the tab sequence logic as needed
            tabLabel: name,
            generatedType: 1,
            visibility: false,
            tabType: 1,
            description: ''
        });

        // Create system fields for the newly created tab
        await createSystemFields(newTab.tabId, createdBy);

        // Send response
        return res.status(201).json({ message: 'Tab created successfully', tab: newTab });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating tab and system fields', error: error.message });
    }
};

// Edit an existing Tab
export const editTab = async (req: Request, res: Response) => {
    const { tabId } = req.params;
    const { name, active, tabSequence, tabLabel, modifiedBy, generatedType, visibility, parentTabId, tabType, description } = req.body;

    try {
        const tab = await Tab.findByPk(tabId);

        if (!tab) {
            return res.status(404).json({ error: 'Tab not found' });
        }

        // Update the tab's fields
        tab.name = name || tab.name;
        tab.active = active || tab.active;
        tab.tabSequence = tabSequence || tab.tabSequence;
        tab.tabLabel = tabLabel || tab.tabLabel;
        tab.modifiedBy = modifiedBy || tab.modifiedBy;
        tab.modifiedTime = new Date();
        tab.generatedType = generatedType || tab.generatedType;
        tab.visibility = visibility || tab.visibility;
        tab.parentTabId = parentTabId || tab.parentTabId;
        tab.tabType = tabType || tab.tabType;
        tab.description = description || tab.description;

        await tab.save();

        return res.status(200).json(tab);
    } catch (error) {
        return res.status(500).json({ error: 'Error editing tab', details: error });
    }
};

// Delete a Tab
export const deleteTab = async (req: Request, res: Response) => {
    const { tabId } = req.params;

    try {
        // Find the tab by its primary key (tabId)
        const tab = await Tab.findByPk(tabId);

        if (!tab) {
            return res.status(404).json({ error: 'Tab not found' });
        }

        // Delete the associated FieldDetails for this tab
        await FieldDetails.destroy({
            where: {
                tabId: tabId,  // Delete all field details associated with this tab
            },
        });

        // Now, delete the tab itself
        await tab.destroy();

        return res.status(200).json({ message: 'Tab and associated field details deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting tab and its field details', details: error.message });
    }
};
