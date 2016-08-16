var app = angular.module('widgetApp', ['ngStorage', 'ui.router', 'ui.bootstrap', 'angular-confirm']);

app.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider      
        .state('widget', {
          url: '/',          
          views: {
            '': { templateUrl: 'templates/widget.html', controller: 'mainController'},                         
          }          
        })       
        .state('detail', {
           url: '/{id:int}',                                
           views: {          
            '': { templateUrl: 'templates/widget.html'},              
            'detail@detail': { templateUrl: 'templates/detail.html', controller: 'detailController'}, 
           }
        })
        .state('edit', {
           url: '/edit/{id:int}',                      
           views: {          
            '': { templateUrl: 'templates/edit.html', controller: 'editController'},                           
           }
        })
        .state('add', {
           url: '/edit',                      
           views: {          
            '': { templateUrl: 'templates/edit.html', controller: 'editController'},                           
           }
        })
        .state('remove', {
           url: '/remove/{id:int}',                      
           views: {          
            '': { controller: 'removeController'},                           
           }
        })
    }
  ]);
  

app.run(function($rootScope, $state) {
    $rootScope.deleteWidget = function(id) {    
       $state.go('remove',{'id': id})    
    }        
});

  
app.filter('words', function() {
  function isInteger(x) {
        return x % 1 === 0;
  }
  
  return function(value) {
    if (value && isInteger(value))
      return  toWords(value);
    
    return value;
  };

}); 

app.directive("dynamicName",function($compile) {
  return {
      restrict:"A",
      terminal:true,
      priority:1000,
      link:function(scope,element,attrs) {
          element.attr('name', scope.$eval(attrs.dynamicName));
          element.removeAttr("dynamic-name");
          $compile(element)(scope);
      }
   };
}); 
  
app.controller('mainController', mainController)
app.controller('detailController', detailController)
app.controller('editController', editController)
app.controller('removeController', removeController)