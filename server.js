// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

// Requiring Note and Article models
var Note = require("./models/Note");
var Article = require("./models/Article.js");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

var db = require("./models");

var port = 3000;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

var routes = require("./controller/controller.js");

app.use(routes);
// Database configuration with mongoose
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit", { useNewUrlParser: true });

//mongoose.connect("mongodb://localhost/mongoscraper");



// Listen on port
app.listen(port, function() {
  console.log("App running on port " + port);
});