import joi from 'joi';
import {stripHtml} from "string-strip-html";
import {db} from '../db.js';
const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
})
const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})

export async function verifySignUp(req,res,next){
    let {name,email,password,confirmPassword} = req.body;
    let user = {
        name: stripHtml(name === undefined ? "" : name).result.trim(),
        email: stripHtml(email === undefined ? "" : email).result.trim(),
        password: stripHtml(password === undefined ? "" : password).result.trim(),
        confirmPassword:stripHtml(confirmPassword  === undefined ? "" : confirmPassword).result.trim()
    };

    let validation = signUpSchema.validate(user,{abortEarly:false});

    if(validation.error){
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
    }
    else{   
        if(user.password !==user.confirmPassword){
            res.status(422).send("Senha e confirmação de senha divergem!");
        }
        else{
            let find = await db.collection("users").findOne({email:user.email});
            if(find){
                res.status(422).send("E-mail já cadastrado");
            }
            else{
                res.locals.user = {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
                next();
            }
            
        }
    }
}
export async function verifySignIn(req,res,next){
    let {email,password} = req.body;
    let user = {
        email: stripHtml(email === undefined ? "" : email).result.trim(),
        password: stripHtml(password === undefined ? "" : password).result.trim(),
    };

    let validation = signInSchema.validate(user,{abortEarly:false});

    if(validation.error){
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
    }
    else{   
        let find = await db.collection("users").find({email:user.email}).toArray();

        if(find.length > 0){
            res.locals.user = {
                email:email,
                password:password
            };
            next();
        }
        else{
            res.status(422).send("Email não encontrado!");
        }
    }
}