import bcrypt from 'bcrypt';
import {db} from '../db.js';

export async function SignUp(req,res){
    let {name,email,password} = req.body;
    
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
    let {email,password} = req.body;
    let find = await db.collection("users").findOne({email:email});

    if(bcrypt.compareSync(password,find.password)){
        res.status(200).send("Login Realizado");
    }
    else{
        res.status(401).send("Senha incorreta");
    }
}