import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;

mongoClient.connect().then(() => {
	db = mongoClient.db("batepapoUol");
});

app.use(express.json())
app.use(cors())
app.listen(5000);