import { db } from '../db.js';
import dayjs from "dayjs";
import { ObjectId } from 'mongodb';

export async function getTransactions(req,res){
    let id = ObjectId(res.locals.userID)
    let find = await db.collection("transactions").find({userID:id}).toArray();
    res.status(200).send(find);
}

export async function insertTransaction(req,res){
    let {valor,descricao,tipo} = res.locals.transaction;
    let userID = ObjectId(res.locals.userID);
    let status = Date.now();
    let insert = await db.collection("transactions").insertOne({
        valor: valor,
        descricao: descricao,
        data: dayjs(status).format('DD/MM'),
        tipo: tipo,
        userID: userID
    })
    if(insert){
        res.status(200).send("Inserido com sucesso");
    }
    else{
        res.status(500).send("erro");
    }
}

export async function updateTransaction(req,res){
    let {valor,descricao,id} = res.locals.transaction;
    console.log(id)
    let update = await db.collection("transactions").updateOne({_id:ObjectId(id)},{$set:{valor,descricao}});

    if(update){
        res.status(200).send("Atualizado com sucesso");
    }
    else{
        res.status(500).send("erro");
    }
}

export async function deleteTransaction(req,res){
    let id = res.locals.id;
    let update = await db.collection("transactions").deleteOne({_id:ObjectId(id)});

    if(update){
        res.status(200).send("Deletado com sucesso");
    }
    else{
        res.status(500).send("erro");
    }
}