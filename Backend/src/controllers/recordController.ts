import { Request, Response } from 'express';
import FieldDetails from '../db/models/fieldDetails';
// import Tab from 'src/db/models/tab';
import UserOrganization from 'src/db/models/user_organization';
import Tab from "../db/models/tab"; // Import UserOrganization model
import RecordDetails1 from '../db/models/recordDetails1';
import { Sequelize } from 'sequelize';
import SubRecordDetails1 from '../db/models/subRecordDetails1';

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
