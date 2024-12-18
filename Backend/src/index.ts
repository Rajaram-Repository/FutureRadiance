import express from 'express';
import { syncDatabase } from './db/sync';

const App = express();

App.use(express.json());

syncDatabase({ alter: true })
    .then(() => {
        console.log('Database Connected and Synced');
    })
    .catch(console.error);

App.listen(3000, () => console.log('Express server started'));
