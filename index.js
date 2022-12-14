import express from "express";
import cors from "cors";
import userRouter from "./Routes/userRouter.js";
import transactionRouter from "./Routes/transactionRouter.js";
const app = express();


app.use(express.json())
app.use(cors());
app.get("/status",(req,res)=>{
    return res.send("OK");
})
app.use(userRouter)
app.use(transactionRouter)

app.listen(process.env.PORT || 3000,console.log('On The Line'));