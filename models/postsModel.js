var mongoose = require("mongoose");
var schema = mongoose.Schema;

var postSchema = new schema({
    image : String,
    title : String,
    slug : String,
    description : String,
    author : String,
    tags : Array,
    publishedon : String,
    comments : Array
}); 

var posts = mongoose.model("posts", postSchema);

module.exports = posts;