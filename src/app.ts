import express, { Application } from "express";
import cors from "cors"; // esto porque ?
import { createRole, deleteRole, getRoles, updateRole } from "./controllers/roleController";


export const app = express();

app.use(express.json());
app.use(cors());


//roles routes

app.get('/roles', getRoles);
app.post('/roles', createRole);
app.put('/roles/:id', updateRole);
app.delete('/roles/:id', deleteRole);


// users routes

// app.get('/users', getAllUsers);
// app.post();
// app.put();
// app.delete();


