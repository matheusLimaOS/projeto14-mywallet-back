import express from 'express';
import { getTransactions,insertTransaction,updateTransaction } from '../Controllers/transactionsController.js';
import { verifyToken, verifyTransaction } from '../Middlewares/transactionMiddlewares.js';
const transactionRouter = express.Router();

transactionRouter.get('/transactions', verifyToken,getTransactions);
transactionRouter.post("/transactions",verifyToken ,verifyTransaction, insertTransaction)
transactionRouter.put("/transactions",verifyToken ,verifyTransaction, updateTransaction)

export default transactionRouter;