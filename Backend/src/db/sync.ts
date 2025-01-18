import { SyncOptions } from 'sequelize';
import sequelize from './connection';
import Users from './models/users';
import Organizations from './models/organizations';
import Roles from './models/roles';
import UserOrgs from './models/user_organization';
import UserOrgRoles from './models/user_org_roles';
import FieldDetails from './models/fieldDetails';
import Tab from './models/tab';

export async function syncDatabase(options: SyncOptions) {
    await sequelize.authenticate();
    await sequelize.sync(options);
    console.log('All models were synchronized successfully.');
    return sequelize;
}

export const AllModels = {
    Users,
    Organizations,
    Roles,
    UserOrgs,
    UserOrgRoles,
    Tab,
    FieldDetails
};
