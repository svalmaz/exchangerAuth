import router from './routes/auth.js';
import express from 'express';
const app = express();

app.use(express.json());
app.use("/auth/code", router);


const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Servert start");
})