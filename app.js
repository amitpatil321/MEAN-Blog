var express = require("express");
var app = express();

var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var dbconfig = require("./config/dbconfig");


// Configure body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
 
// controllers
var postsController   = require("./controllers/postsController");
var commentController = require("./controllers/commentController");

// Static folder
app.use(express.static(__dirname + '/public'));
// app.use('/bower_components', express.static(__dirname + '/bower_components'));

// conenct to mlab databse
mongoose.connect(dbconfig.getDBConnectionString());

// controllers
postsController(app);
commentController(app);

// Set defaulr home page
// app.get("/", function(req,res){
//     res.render("index");
// });  
 
app.listen(process.env.port || 3000, function(){
    console.log("Server started");
});