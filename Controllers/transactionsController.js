import {db} from '../db.js';

export async function getTransactions(req,res){
    let find = await db.collection("Transactions").find().toArray();

    res.status(200).send(find);
}