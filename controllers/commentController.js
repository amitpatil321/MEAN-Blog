var postsModel = require("../models/postsModel");

module.exports =  function(app){

    // Add new comment
    app.post("/api/comments", function(req,res){
        postsModel.findOne({"_id": req.body.postid}, function(err, posts){
            var id = req.body.postid;
            // Remove post id from object
            delete req.body.postid;
            // Add date
            // req.body.dateCreated = dateFormat(new Date(), "dddd, mmmm d, yyyy, h:MM TT");
            req.body.dateCreated = new Date().getTime();
            posts.comments.push(req.body);
            postsModel.findByIdAndUpdate(id, {comments : posts.comments}, function(err, response){
                if(err) res.send(err); 
                else if(!response) res.send(JSON.stringify({ success : false, message : 'Unexpected error' }));
                else res.send(posts.comments); 
            });        
        });        
    });  

}