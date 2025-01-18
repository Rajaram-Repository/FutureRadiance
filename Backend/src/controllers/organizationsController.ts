import { Request, Response } from 'express';
import Organizations from './models/organization';  // Adjust path as needed

// Controller function to get organization details by id
export const getOrganizationById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Find the organization by ID
        const organization = await Organizations.findByPk(id);

        if (!organization) {
            // If no organization found, return 404 response
            res.status(404).json({ message: 'Organization not found' });
            return;
        }

        // Return the organization details as a JSON response
        res.status(200).json({
            id: organization.id,
            name: organization.name,
            email: organization.email,
            address: organization.address,
            phoneNumber: organization.phoneNumber,
            enabled: organization.enabled,
            createdAt: organization.createdAt,
            updatedAt: organization.updatedAt,
            about: organization.about,
            contact1: organization.contact1,
            role1: organization.role1,
            phone1: organization.phone1,
            email1: organization.email1,
            contact2: organization.contact2,
            role2: organization.role2,
            phone2: organization.phone2,
            email2: organization.email2,
            contact3: organization.contact3,
            role3: organization.role3,
            phone3: organization.phone3,
            email3: organization.email3
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Error fetching organization:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
