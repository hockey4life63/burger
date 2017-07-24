const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const router = require("./controllers/burgers_controller")

const app = express();
const port = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use("/public", express.static("public"));

app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use("/", router)

app.listen(port)
