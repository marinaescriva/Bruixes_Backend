import express, { Application } from "express";
import cors from "cors"; // esto porque ?


export const app: Application = express();

app.use(express.json());
app.use(cors());