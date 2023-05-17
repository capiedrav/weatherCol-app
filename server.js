import express from "express";
import { makeQuery } from "./weatherAPI.js";

const app = express();

app.get("/", makeQuery);

app.listen(8000, ()=>{
    console.log("WheatherCol listening at port 8000");
});