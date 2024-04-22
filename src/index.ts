import { request, response } from "express";

const app = express();

app.listen(3000,()=>console.log('Servidor levantado en 3000'));

app.get('/',(req:Request,res:Response)=>{
    res.send('Hello world!')
    });