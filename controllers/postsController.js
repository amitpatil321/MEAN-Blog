var postsModel = require("../models/postsModel");
var apiConfig = require("../config/apiConfig.json");
//var dateFormat = require('dateformat');

module.exports =  function(app){

    // Get all posts
    app.get(apiConfig.posts.get_all_posts, function(req,res){
        postsModel.find({}).sort({publishedon : 'desc'}).exec(function(err, posts) { 
            if(err || (!posts)) throw err;
            res.send(posts);
        });
    });  

    // Get single post by id
    app.get(apiConfig.posts.get_one_post, function(req,res){
        postsModel.findOne({"slug": req.params.slug}, function(err, post){
            if(err || (!post))  
                res.send(JSON.stringify({ success : false, message : 'This post doesnt exist' }));
            else
                res.send(post);          
        });
    });

    // Add/Update post
    app.put(apiConfig.posts.create_post, function(req,res){
        // Update existing post
        if(req.body._id){
            post = {
                image      : req.body.image, 
                title      : req.body.title,
                description: req.body.description,
                slug       : req.body.slug,
                tags       : req.body.tags
            };
            console.log(post);
            postsModel.findByIdAndUpdate(req.body._id, post, function(err, response){
                if(err || (!response)) 
                    res.send(JSON.stringify({ success : false, message : 'Failed to update post' }));                    
                else   
                    res.send(JSON.stringify({ success : true }));  
            });
        }else{
            // check if slug already exists ? 
            postsModel.count({ slug : req.body.slug}, function(err, count){
                if(!count){
                    // Add new post   
                    post = {
                        image      : req.body.image, 
                        title      : req.body.title,
                        description: req.body.description,
                        author     : "Admin",
                        slug       : req.body.slug,
                        tags       : req.body.tags.trim().split(","),
                        publishedon: new Date().getTime()
                    };  
                    console.log(req.body.tags);     
                    postsModel.create(post, function(err, posts){
                        if(err || (!posts)) 
                            res.send(JSON.stringify({ success : false, message : 'Failed to add post' }));                        
                        else 
                            res.send(JSON.stringify({ success : true }));    
                    });
                }else 
                    res.send(JSON.stringify({ success : false, message : 'Slug already exists, Plese use unique slug.' }));  
            });
        }
    });

    // Delete post by id
    app.delete(apiConfig.posts.delete_post, function(req,res){
        postsModel.findByIdAndRemove(req.body.id, function(err, response){
            if(err) throw err;
            res.send(response);
        });
    });
}