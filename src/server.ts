import 'dotenv/config'
import { app } from './app';

import { AppDataSource } from "./database/db";
import { createRole, deleteRole, getRoles} from './controllers/roleController';

const PORT = process.env.PORT || 4001;

const startServer = () => {
    
    AppDataSource.initialize()
    .then(() => {

        console.log(`Database connected`);

        app.listen(PORT, () => {
            console.log(`server is running on port: ${PORT}`);
        });
    })
    .catch(error => {

        console.log(error);
    })
};

startServer();


// ROLES 

app.get('/roles', getRoles);
app.post('/roles', createRole);
app.delete('/roles', deleteRole);

// USERS

// GAMES

// TABLES

// RESERVATIONS

// EVENTS