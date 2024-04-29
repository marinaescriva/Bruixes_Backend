
// import { AppDataSource } from "./database/db";

import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app : Application = express();

const PORT = process.env.PORT || 4001;

app.get('/healthy', (req, res) => {
    res.send("server is healthy")
})

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})

// const startServer = () => {
    
//     AppDataSource.initialize()
//     .then(() => {

//         console.log(`Database connected`);

//         app.listen(PORT, () => {
//             console.log(`server is running on port: ${PORT}`);
//         });
//     })
//     .catch(error => {

//         console.log(error);
//     })
// };

// startServer();
