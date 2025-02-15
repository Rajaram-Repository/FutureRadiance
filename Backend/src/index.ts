import express from 'express';
import { syncDatabase } from './db/sync';
import router from "./routes/tabsRoutes";

const App = express();



App.use(express.json())
App.use('/', router);

syncDatabase({ alter: true })
    .then(() => {
        console.log('Database Connected and Synced');
    })
    .catch(console.error);

App.listen(3001, () => console.log('Express server started'));
