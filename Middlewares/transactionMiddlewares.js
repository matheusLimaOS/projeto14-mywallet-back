import joi from 'joi';
import {stripHtml} from "string-strip-html";
import {db} from '../db.js';

const transactionSchema = joi.object({
    valor: joi.number().required(),
    descricao: joi.string().required().max(45)
})

export async function verifyToken(req,res,next){
    let {token} = req.headers

    let find = await db.collection("sessions").findOne({token:token});

    if(find){
        res.locals.userID = find.userId;
        next();
    }
    else{
        res.status(401).send("Sessão não encontrada");
    }
}
export function verifyTransaction(req,res,next){
    let {valor,descricao,tipo,_id} = req.body;
    let transaction = {
        valor: valor,
        descricao: stripHtml(descricao === undefined ? "" : descricao).result.trim(),
    };

    let validation = transactionSchema.validate(transaction,{abortEarly:false});

    if(validation.error){
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
    }
    else{
        if(tipo === 'E' || tipo === 'S'){
            res.locals.transaction = {
                valor: transaction.valor,
                descricao: transaction.descricao,
                tipo:tipo,
                id:_id
            }
            next();
        }
        else{
            res.status(422).send("Tipo incorreto");
        }
    }
}