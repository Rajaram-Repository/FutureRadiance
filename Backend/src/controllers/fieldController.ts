import { Request, Response } from 'express';
import FieldDetails from 'src/db/models/fieldDetails'; // Import the FieldDetails model
import Tab from 'src/db/models/tab'; // Import Tab model
import UserOrganization from 'src/db/models/user_organization'; // Import UserOrganization model

// Get all field details by tabId
export const getFieldDetailsByTabId = async (req: Request, res: Response) => {
    const { tabId } = req.params;

    try {
        const fields = await FieldDetails.findAll({
            where: { tabId: parseInt(tabId) },
            include: [
                { model: Tab, as: 'tab' }, // Include Tab data
                { model: UserOrganization, as: 'creator' }, // Include creator data
                { model: UserOrganization, as: 'modifier' }, // Include modifier data
            ],
        });

        if (fields.length === 0) {
            return res.status(404).json({ message: 'No field details found for this tab' });
        }

        return res.status(200).json(fields);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching field details', details: error.message });
    }
};

// Edit a specific field detail via fieldId
export const updateFieldDetail = async (req: Request, res: Response) => {
    const { fieldId } = req.params;
    const { fieldName, fieldType, fieldSequence, active, generatedType, uiType, readOnly, isMandatory, isSearchable, isLookup, isHidden, referFieldId, modifiedBy } = req.body;

    try {
        const field = await FieldDetails.findByPk(fieldId);

        if (!field) {
            return res.status(404).json({ message: 'Field detail not found' });
        }

        // Update the field with the provided data
        field.fieldName = fieldName || field.fieldName;
        field.fieldType = fieldType || field.fieldType;
        field.fieldSequence = fieldSequence || field.fieldSequence;
        field.active = active !== undefined ? active : field.active;
        field.generatedType = generatedType || field.generatedType;
        field.uiType = uiType || field.uiType;
        field.readOnly = readOnly !== undefined ? readOnly : field.readOnly;
        field.isMandatory = isMandatory !== undefined ? isMandatory : field.isMandatory;
        field.isSearchable = isSearchable !== undefined ? isSearchable : field.isSearchable;
        field.isLookup = isLookup !== undefined ? isLookup : field.isLookup;
        field.isHidden = isHidden !== undefined ? isHidden : field.isHidden;
        field.referFieldId = referFieldId || field.referFieldId;
        field.modifiedBy = modifiedBy || field.modifiedBy;
        field.modifiedTime = new Date();

        await field.save();

        return res.status(200).json({ message: 'Field detail updated successfully', field });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating field detail', details: error.message });
    }
};

// Create a single field detail
export const createFieldDetail = async (req: Request, res: Response) => {
    const { fieldName, createdBy, tabId, fieldType, fieldSequence, active, generatedType, uiType, readOnly, isMandatory, isSearchable, isLookup, isHidden, referFieldId } = req.body;

    try {
        // Validation: Check if Tab exists
        const tab = await Tab.findByPk(tabId);
        if (!tab) {
            return res.status(400).json({ message: 'Tab not found' });
        }

        // Create the new field detail
        const newFieldDetail = await FieldDetails.create({
            fieldName,
            createdBy,
            createTime: new Date(),
            modifiedTime: new Date(),
            fieldType,
            tabId,
            fieldSequence,
            active: active !== undefined ? active : true,
            generatedType,
            uiType,
            readOnly: readOnly !== undefined ? readOnly : false,
            isMandatory: isMandatory !== undefined ? isMandatory : false,
            isSearchable: isSearchable !== undefined ? isSearchable : true,
            isLookup: isLookup !== undefined ? isLookup : false,
            isHidden: isHidden !== undefined ? isHidden : false,
            referFieldId: referFieldId || null,
        });

        return res.status(201).json({ message: 'Field detail created successfully', field: newFieldDetail });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating field detail', details: error.message });
    }
};

// Bulk create field details
export const createBulkFieldDetails = async (req: Request, res: Response) => {
    const fields = req.body; // Expecting the fields data to be an array

    if (!Array.isArray(fields)) {
        return res.status(400).json({ message: 'The body must contain an array of field details' });
    }

    try {
        const validFields = [];
        for (let field of fields) {
            const { fieldName, createdBy, tabId, fieldType, fieldSequence, active, generatedType, uiType, readOnly, isMandatory, isSearchable, isLookup, isHidden, referFieldId } = field;

            // Validation: Check if Tab exists
            const tab = await Tab.findByPk(tabId);
            if (!tab) {
                return res.status(400).json({ message: `Tab with ID ${tabId} not found for field ${fieldName}` });
            }

            // Prepare the field data for creation
            validFields.push({
                fieldName,
                createdBy,
                createTime: new Date(),
                modifiedTime: new Date(),
                fieldType,
                tabId,
                fieldSequence,
                active: active !== undefined ? active : true,
                generatedType,
                uiType,
                readOnly: readOnly !== undefined ? readOnly : false,
                isMandatory: isMandatory !== undefined ? isMandatory : false,
                isSearchable: isSearchable !== undefined ? isSearchable : true,
                isLookup: isLookup !== undefined ? isLookup : false,
                isHidden: isHidden !== undefined ? isHidden : false,
                referFieldId: referFieldId || null,
            });
        }

        // Bulk create valid field details
        const createdFields = await FieldDetails.bulkCreate(validFields);

        return res.status(201).json({ message: 'Field details created successfully', fields: createdFields });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating field details', details: error.message });
    }
};
