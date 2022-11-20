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
        next();
    }
    else{
        res.status(401).send("Sessão não encontrada");
    }
}
export function verifyTransaction(req,res,next){
    let {valor,descricao} = req.body;
    let transaction = {
        valor: valor,
        descricao: stripHtml(descricao === undefined ? "" : descricao).result,
    };

    let validation = transactionSchema.validate(transaction,{abortEarly:false});

    if(validation.error){
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
    }
    else{
        next();
    }
}