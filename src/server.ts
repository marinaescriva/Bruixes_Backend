import express, { Application } from "express";
import dotenv from "dotenv";

// import { AppDataSource } from "./database/db";

const app : Application = express();

app.use(express.json());

const PORT = process.env.PORT || 4001;

app.get('/healthy', (req, res) => {
    res.status(200).json(
        {
            success: true,
            message:"server is healthy"
        }
    )      
})


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})

dotenv.config();
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
