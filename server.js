import express from "express";


const app = express()

app.get("/", (request, response) => response.send("Welcome to weatherCol-app"));

app.listen(8000, ()=>{
    console.log("WheatherCol listening at port 8000");
});