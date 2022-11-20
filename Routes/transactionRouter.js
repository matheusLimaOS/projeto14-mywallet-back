import express from 'express';
import { getParticipants } from './controllers/participantController.js';
const transactionRouter = express.Router();

router.get('/transactions', getTransactions);
router.post("/transactions", verifyTransaction ,insertTransaction)

export default participantRouter;