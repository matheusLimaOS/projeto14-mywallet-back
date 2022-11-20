import bcrypt from 'bcrypt';
import {db} from '../db.js';
import { v4 as uuid } from 'uuid';

export async function SignUp(req,res){
    let {name,email,password} = res.locals.user;
    
    let insert = await db.collection("users").insertOne({
        name: name,
        email: email,
        password: bcrypt.hashSync(password,10)
    })

    if(insert){
        res.status(200).send("ok");
    }
    else{
        res.status(500).send("error");
    }
    
}
export async function SignIn(req,res){
    let {email,password} = res.locals.user;
    let find = await db.collection("users").findOne({email:email});

    if(bcrypt.compareSync(password,find.password)){
        const token = uuid();
        await db.collection("sessions").insertOne({
            userId: find._id,
            token
        })

        res.status(200).send(token);
    }
    else{
        res.status(401).send("Senha incorreta");
    }
}