var blogAppService = angular.module("blogApp.dataService",[]);

blogAppService.service('api', function($http, httpService) {
    delete $http.defaults.headers.common['X-Requested-With'];

    // Get all posts
    this.getAllPosts = function(callbackFunc) {
        httpService.call("GET","/api/posts/", '', false, callbackFunc);
    };

    // Get posts by tag
    this.getPostsByTag = function(tag, callbackFunc) {
        httpService.call("GET","/api/posts/tag/"+tag, '', false, callbackFunc);
    };    
    
    // Get single post 
    this.getPost = function(slug, callbackFunc) {
        httpService.call("GET", "/api/posts/"+slug, '', false, callbackFunc);
    };

    // Submit a comment on post
    this.postComment = function(form, callbackFunc){
        httpService.call("POST", "/api/comments/", form, false, callbackFunc);
    }

    // Create a new post
    this.savePost = function(form, callbackFunc){
        httpService.call("PUT", "/api/posts", form, false, callbackFunc);
    }

    // Create a new post
    this.deletePost = function(id, callbackFunc){
        httpService.call("DELETE", "/api/posts", {"id" : id}, false, callbackFunc);
    }

});

blogAppService.service('httpService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.call = function(method, url, data, cache, callback){
        $http({
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },            
            method: method,
            url   : url,
            cache : cache,
            data  : data
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callback(data);
        }).error(function(){
            alert("Request failed, Please try again.");
        });
    };
});
