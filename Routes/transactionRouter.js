import express from 'express';
import { getTransactions,insertTransaction } from '../Controllers/transactionsController.js';
import { verifyToken, verifyTransaction } from '../Middlewares/transactionMiddlewares.js';
const transactionRouter = express.Router();

transactionRouter.get('/transactions', verifyToken,getTransactions);
transactionRouter.post("/transactions",verifyToken ,verifyTransaction, insertTransaction)

export default transactionRouter;