function mainController ($scope, $state, $rootScope, $stateParams, $localStorage) {
$rootScope.storage = getData()
$rootScope.edit_item = undefined                    
}

function removeController ($scope, $state, $stateParams, $localStorage) {
key = $stateParams.id+"_widget"            
localStorage.removeItem(key) 
$state.go('widget')
}

function getData() {
var data = []
for(var i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).indexOf('_widget') != -1) {
       var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
       data.push(obj)           
    }   
}
return data
}