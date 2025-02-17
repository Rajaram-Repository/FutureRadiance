import { Request, Response } from 'express';
import FieldDetails from '../db/models/fieldDetails';
// import Tab from 'src/db/models/tab';
import UserOrganization from 'src/db/models/user_organization';
import Tab from "../db/models/tab"; // Import UserOrganization model
import RecordDetails1 from '../db/models/recordDetails1';
import SubRecordDetails1 from '../db/models/subRecordDetails1';
  
import { Sequelize } from 'sequelize';
import sequelize from '../db/connection'; // Assuming you have the sequelize instance here


// Get all field details by tabId
export const getListFieldDetailsByTabId = async (req: Request, res: Response) => {
    
    const { tabId } = req.params;
    const { current_page, per_page } = req.body;

    // Default pagination if not provided
    const currentPage = current_page ? parseInt(current_page) : 1;
    const perPage = per_page ? parseInt(per_page) : 10;
    const offset = (currentPage - 1) * perPage;

    try {
        // Fetch list fields based on tabId and listview being true
        const list_fields = await FieldDetails.findAll({
            where: { tabId: parseInt(tabId), listview: true }
        });

        // Extract the field names dynamically
        const selectedColumns = list_fields.map(field => field.colname);
        console.log(selectedColumns);
        // Fetch records with pagination
        // const records = await RecordDetails1.findAll({
        //     attributes: ['id', ...selectedColumns],
        //     limit: perPage,        // Set the limit for records per page
        //     offset: offset         // Set the offset based on the current page
        // });
        const records = await RecordDetails1.findAll({
            attributes: ['id', ...selectedColumns], // Select the necessary columns
            group: ['id', ...selectedColumns],      // Add group by the non-aggregated columns
            limit: perPage,
            offset: offset
        });
        console.log(records);
        // Calculate total pages
        // const totalRecords = await RecordDetails1.count({
        //     attributes: ['id'], // We only need to count the records
        //     where: { tabId: parseInt(tabId) }
        // });
        // const totalRecords = await RecordDetails1.count({
        //     attributes: ['id'], // We only need to count the records
        //     where: { tabId: parseInt(tabId) }
        // });

        // const totalPages = Math.ceil(totalRecords / perPage);

        // Return the response with pagination info
        return res.status(200).json({
            list_fields,
            records,
            // pagination: {
            //     current_page: currentPage,
            //     total_pages: totalPages,
            //     per_page: perPage,
            //     total_records: totalRecords
            // }
        });
      
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching field details', details: error.message });
    }
};


export const getRecordDetailsById = async (req: Request, res: Response) => {
    
    const { tabId } = req.params;
    const { recordId } = req.params;
    const { current_page, per_page } = req.body;

    // Default pagination if not provided
    const currentPage = current_page ? parseInt(current_page) : 1;
    const perPage = per_page ? parseInt(per_page) : 10;
    const offset = (currentPage - 1) * perPage;

    try {
        // Fetch list fields based on tabId and listview being true
        const all_fields = await FieldDetails.findAll({
            where: { tabId: parseInt(tabId) }
        });
        const sub_id = await Tab.findAll({
            where: {  parentTabId: parseInt(tabId)  }
        });

        const subTabIds = sub_id.map(tab => tab.tabId);

        const sub_all_fields = await FieldDetails.findAll({
            where: { tabId: subTabIds }
        });
        // Extract the field names dynamically
        const selectedColumns = all_fields.map(field => field.colname);
        console.log(selectedColumns);
        const sub_selectedColumns = sub_all_fields.map(field => field.colname);

        // Fetch records with pagination
        // const records = await RecordDetails1.findAll({
        //     attributes: ['id', ...selectedColumns],
        //     limit: perPage,        // Set the limit for records per page
        //     offset: offset         // Set the offset based on the current page
        // });
        const records = await RecordDetails1.findAll({
            attributes: ['id', ...selectedColumns], 
            where: {
                id: recordId
              }
        });
        console.log(records);
        const sub_records = await SubRecordDetails1.findAll({
            attributes: ['id','recordId', ...sub_selectedColumns], 
            where: {
                recordId: recordId
              }
        });
        // Calculate total pages
        // const totalRecords = await RecordDetails1.count({
        //     attributes: ['id'], // We only need to count the records
        //     where: { tabId: parseInt(tabId) }
        // });
        // const totalRecords = await RecordDetails1.count({
        //     attributes: ['id'], // We only need to count the records
        //     where: { tabId: parseInt(tabId) }
        // });

        // const totalPages = Math.ceil(totalRecords / perPage);

        // Return the response with pagination info
        return res.status(200).json({
            all_fields,
            sub_all_fields,
            records,
            sub_records
            // pagination: {
            //     current_page: currentPage,
            //     total_pages: totalPages,
            //     per_page: perPage,
            //     total_records: totalRecords
            // }
        });
      
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching field details', details: error.message });
    }
};

export const createRecordwithoutsubfrom = async (req: Request, res: Response) => {
    
    const { tab_id, fields } = req.body;

    try {
        let recordData: { tabId: number; [key: string]: any } = { tabId: tab_id }; 
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
    
          // Find the corresponding FieldDetails record by field_id
          const fieldDetail = await FieldDetails.findOne({
            where: { fieldId: field.field_id }
          });
          console.log(fieldDetail);
          if (fieldDetail) {
            // Dynamically assign the value to the corresponding column name (col1, col2, etc.)
            recordData[fieldDetail.colname] = field.value;
          } else {
            console.warn(`Field with field_id ${field.field_id} not found in FieldDetails.`);
          }
        }
        console.log(recordData);
        // Create the record in RecordDetails1
        const record = await RecordDetails1.create(recordData);
    
        // Return success response
        res.status(201).json({
          message: 'Record created successfully!'
        });
      } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ message: 'Error creating record', error: error.message });
      }
    }



 
    export const createRecord = async (req: Request, res: Response) => {
        const { tab_id, fields, subforms } = req.body;
        const createdRecords = [];
        try{
        const tab = await Tab.findOne({
            where: { tabId: tab_id }
          });
          if (!tab) {
            return res.status(400).json({ message: `Tab not found for tab_id ${tab_id}` });
          }
          const tableName = tab.tableName;  
          console.log(tableName);
          const recordDetailsTable = sequelize.models[tableName];
          if (!recordDetailsTable) {
            return res.status(400).json({ message: `No corresponding table found for tab_id ${tab_id}` });
          }
          let recordData: { tabId: number; [key: string]: any } = { tabId: tab_id };
          for (let field of fields) {
            const fieldDetail = await FieldDetails.findOne({
              where: { fieldId: field.field_id }
            });
    
            if (fieldDetail) {
              recordData[fieldDetail.colname] = field.value;
            } else {
              console.warn(`Field with field_id ${field.field_id} not found in FieldDetails.`);
            }
          }
          const createdRecord = await recordDetailsTable.create(recordData);
          createdRecords.push(createdRecord);
          for (let subform of subforms) {
            const subformTab = await Tab.findOne({ where: { tabId: subform.subform } });
  
            if (!subformTab) {
              return res.status(400).json({ message: `Subform Tab not found for subform ${subform.subform}` });
            }
            const subformTableName = subformTab.tableName; 
            const subformDetailsTable = sequelize.models[subformTableName];
  
            if (!subformDetailsTable) {
              return res.status(400).json({ message: `No corresponding table found for subform ${subform.subform}` });
            }
            for (let subformRecordFields of subform.subform_fields) {
                let subformData = {
                  recordId: createdRecord.id // Link subform to main record using recordId
                };
                for (let subformField of subformRecordFields) {
                const fieldDetail = await FieldDetails.findOne({ where: { fieldId: subformField.field_id } });
    
                if (fieldDetail) {
                  subformData[fieldDetail.colname] = subformField.value;
                }
              }
    
              // Save the subform record
              await subformDetailsTable.create(subformData);
            }
        }
        res.status(201).json({
          message: 'Records created successfully!'
        });
    
      } catch (error) {
        console.error('Error creating records:', error);
        res.status(500).json({ message: 'Error creating records', error: error.message });
      }
    };
  
    export const editRecord = async (req: Request, res: Response) => {
      const { tab_id, record_id, fields, subforms } = req.body;
    
      try {
        // Find the Tab related to the provided tab_id
        const tab = await Tab.findOne({
          where: { tabId: tab_id }
        });
    
        if (!tab) {
          return res.status(400).json({ message: `Tab not found for tab_id ${tab_id}` });
        }
    
        const tableName = tab.tableName;
        console.log(tableName);
    
        // Get the table model for the specific tab
        const recordDetailsTable = sequelize.models[tableName];
        if (!recordDetailsTable) {
          return res.status(400).json({ message: `No corresponding table found for tab_id ${tab_id}` });
        }
    
        // Find the existing record by its record_id
        const existingRecord = await recordDetailsTable.findOne({
          where: { id: record_id }
        });
    
        if (!existingRecord) {
          return res.status(400).json({ message: `Record not found with record_id ${record_id}` });
        }
    
        // Update fields based on provided data
        for (let field of fields) {
          const fieldDetail = await FieldDetails.findOne({
            where: { fieldId: field.field_id }
          });
    
          if (fieldDetail) {
            existingRecord[fieldDetail.colname] = field.value;
          } else {
            console.warn(`Field with field_id ${field.field_id} not found in FieldDetails.`);
          }
        }
    
        // Save updated main record
        await existingRecord.save();
    
        // Process subforms
        for (let subform of subforms) {
          const subformTab = await Tab.findOne({ where: { tabId: subform.subform } });
    
          if (!subformTab) {
            return res.status(400).json({ message: `Subform Tab not found for subform ${subform.subform}` });
          }
    
          const subformTableName = subformTab.tableName;
          const subformDetailsTable = sequelize.models[subformTableName];
    
          if (!subformDetailsTable) {
            return res.status(400).json({ message: `No corresponding table found for subform ${subform.subform}` });
          }
    
          // Process each subform row and update or create subform records
          for (let subformRecordFields of subform.subform_fields) {
            const subformData = {
              recordId: existingRecord.id, // Link subform to main record using recordId
            };
    
            // Add fields from the subform
            for (let field of subformRecordFields) {
              if (field.field_id) {
                const fieldDetail = await FieldDetails.findOne({ where: { fieldId: field.field_id } });
    
                if (fieldDetail) {
                  subformData[fieldDetail.colname] = field.value;
                } else {
                  console.warn(`Field with field_id ${field.field_id} not found in FieldDetails for subform.`);
                }
              }
            }
    
            // Check if subform record already exists by its id (if provided)
            if (subformRecordFields[0].id) {
              const existingSubformRecord = await subformDetailsTable.findOne({
                where: { id: subformRecordFields[0].id, recordId: existingRecord.id }
              });
    
              if (existingSubformRecord) {
                await existingSubformRecord.update(subformData);
              } else {
                return res.status(400).json({ message: `Subform record with id ${subformRecordFields[0].id} not found.` });
              }
            } else {
              // If no subform record ID is provided, create a new subform record
              await subformDetailsTable.create(subformData);
            }
          }
        }
    
        res.status(200).json({
          message: 'Records updated successfully!'
        });
    
      } catch (error) {
        console.error('Error updating records:', error);
        res.status(500).json({ message: 'Error updating records', error: error.message });
      }
    };
    