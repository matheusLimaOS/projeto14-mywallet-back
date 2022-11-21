import express from 'express';
import { getTransactions,insertTransaction,updateTransaction,deleteTransaction  } from '../Controllers/transactionsController.js';
import { verifyToken, verifyTransaction,verifyDeleteTransaction} from '../Middlewares/transactionMiddlewares.js';
const transactionRouter = express.Router();

transactionRouter.get('/transactions', verifyToken,getTransactions);
transactionRouter.post("/transactions",verifyToken ,verifyTransaction, insertTransaction)
transactionRouter.put("/transactions",verifyToken ,verifyTransaction, updateTransaction)
transactionRouter.delete("/transactions/:id",verifyToken ,verifyDeleteTransaction, deleteTransaction)
export default transactionRouter;