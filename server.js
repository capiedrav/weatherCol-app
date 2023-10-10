import express from "express";
import expressHandlebars from "express-handlebars";
import { dirname } from "path";
import {fileURLToPath} from "url"
import { makeQuery } from "./weatherAPI.js";

const app = express();

// setup template engine
app.engine("hbs", expressHandlebars.engine({defaultLayout: false, extname: ".hbs"}));
app.set("view engine", "hbs");
// app.set("views", [`${dirname(fileURLToPath(import.meta.url))}/views/`,]);

// *** static files are served by nginx ***
//app.use(express.static("./public"));

// middleware for form processing
app.use(express.urlencoded({extended: false}));

app.get("/", (request, response) => {
    response.render("home");
});

app.post("/", makeQuery);

app.listen(8000, ()=>{
    console.log("WheatherCol listening at port 8000");
});
