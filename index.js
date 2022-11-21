import express from "express";
import cors from "cors";
import userRouter from "./Routes/userRouter.js";
import transactionRouter from "./Routes/transactionRouter.js";
const app = express();


app.use(express.json())
app.use(userRouter)
app.use(transactionRouter)

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,authorization");
    app.use(cors());
    next();
})
app.listen(process.env.PORT,console.log('On The Line'));