(function () {
    'use strict';
    var blogApp = angular.module("blogApp",[
        'ngRoute',
        'ui.tinymce',
        'blogApp.dataService',
        'blogApp.filters',
        'tinymce.service'
    ]);

    blogApp.config(function($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl : "templates/home.html",
                controller  : "homeController"
            })
            .when("/post/:slug", {
                templateUrl : "templates/postDetails.html", 
                controller  : "postDetailsController"            
            })
            .when("/add-post", {
                templateUrl : "templates/postAdd.html",
                controller  : "postAddController"            
            })
            .when("/update-post/:slug", {
                templateUrl : "templates/postUpdate.html",
                controller  : "postUpdateController"            
            })                 
            .otherwise({
                redirectTo: '/home'
            });     
    });

    // Home controller
    blogApp.controller("homeController",['$scope', '$http', 'api',function($scope, $http, api){
        // fetch all posts
        api.getAllPosts(function(response){
            $scope.posts = response;
        });
    }]);

    // Show post details
    blogApp.controller("postDetailsController", ['$routeParams', '$scope', 'api', function($routeParams, $scope, api){
        var slug = $routeParams.slug;
        if(slug){
            api.getPost(slug, function(response){
                $scope.post = response;
            });
        }  

        // Post new comment
        $scope.postComment = function(){
           $scope.comment.postid = $scope.post._id;
           api.postComment($scope.comment, function(response){
               $scope.post.comments = response;
               $scope.$applyAsync();
               // Clear form
               $scope.comment = {};
           });
        }
    }]);

    // Add new post
    blogApp.controller("postAddController", ['$scope', 'api', 'tinymce',function($scope, api, tinymce){
        // config tinymce editor
        $scope.tinymceOptions = tinymce.setOptions(); 

        // Automatically set post slug from title by replacing space with dash
        $scope.$watch('post.title', function (newValue) {
            $scope.post.slug = newValue.replace(/\s+/g, '-').toLowerCase();
        });

        // Add new post
        $scope.submitPost = function(){
            api.savePost($scope.post, function(response){
                if(response.success){
                    $scope.message = {type : "success", message : "Success!"};
                    $scope.post = {};
                }else    
                    $scope.message = {type : "danger", message : response.message};
            })
        }        
    }]);

    // Update post
    blogApp.controller("postUpdateController", ['$scope', '$routeParams', 'api', 'tinymce', function($scope, $routeParams, api, tinymce){
        var slug = $routeParams.slug;
        // config tinymce editor
        $scope.tinymceOptions = tinymce.setOptions(); 

        // Get post contents
        api.getPost(slug, function(response){
            if(response.success == false) $scope.message = {type : "danger", message : response.message};
            else
                $scope.post = response;
        });        

        // Automatically set post slug from title by replacing space with dash
        $scope.$watch('post.title', function (newValue) {
            if(newValue)
                $scope.post.slug = newValue.replace(/\s+/g, '-').toLowerCase();
        });

        // Update post
        $scope.submitPost = function(){
            api.savePost($scope.post, function(response){
                if(response.success){
                    $scope.message = {type : "success", message : "Success!"};
                }else    
                    $scope.message = {type : "danger", message : response.message};
            })
        }

    }]);
    
})();