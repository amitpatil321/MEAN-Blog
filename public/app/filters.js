var blogAppFilters = angular.module("blogApp.filters",[]);

// Print html string
blogAppFilters.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

// Limit how many characters to show
blogAppFilters.filter('showonly', function() { 
 return function(input, limit) {
    input = input || '';
    if(input.length > limit) 
        return input.substring(0, limit)+"...";
    return input;
  };    
});