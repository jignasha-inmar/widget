function editController ($scope, $state, $stateParams) {
$scope.errorMessage = ''
$scope.added = 1
$scope.item = {}
$scope.item.pairs = []
createPairs()

if ($stateParams.id !== undefined && $stateParams.id !== null) {
    key = $stateParams.id+"_widget"
    data = JSON.parse(localStorage.getItem(key))
    pairs = []
    cnt = 0    
    for(i in data.pairs) {        
        ls = []        
        ls['key'] = i
        ls['value'] = data.pairs[i]        
        pairs.push(ls)
        cnt++
    }
    data.pairs = pairs    
    $scope.item = data
    $scope.added = cnt
    $scope.origin_name = data.name
    $scope.edit = true        
}

$scope.addPairs = function() {
    $scope.added = $scope.added + 1
    createPairs()    
}

$scope.removePairs = function(index) {        
    removePairs(index)    
    $scope.added = $scope.added - 1
}
     
$scope.submitForm = function(isValid) {     
    if (isValid) {  
        data = $scope.item
        count = localStorage.getItem('widget_last_inserted_id')        
        if(count == null)
             count = 0        
        id = parseInt(count) + 1        
        if($scope.item.id != undefined) {      
           id = data.id               
        }                                                                               
        for(var i = 0; i < localStorage.length; i++) {           
           if(localStorage.key(i).indexOf('_widget') != -1) {
              var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));                            
              if(obj.name == data.name && data.name != $scope.origin_name)  {                 
                 $scope.errorMessage = "Duplicate entry of widget name"
                 return
              }                                   
           }   
        }                
        var pairs = {}                
        for (i in data.pairs) {
            if (data.pairs.hasOwnProperty(i)) {
               pairs[data.pairs[i]['key']] = data.pairs[i]['value']               
            }
        }        
        data = {"id": id,"name": data.name, "value": data.value, "pairs": pairs}        
        localStorage.setItem(id+'_widget',JSON.stringify(data))
        if(!$scope.edit)      
           localStorage.setItem('widget_last_inserted_id',id)
        $state.go('widget')       
    }
  }

function createPairs() {
    pairs = []    
    for(i=0;i< $scope.added;i++) {   
        ls = []
        if($scope.item.pairs[i] == undefined)
           ls['key'] = ''
        else   
            ls['key'] = $scope.item.pairs[i]['key']
        if($scope.item.pairs[i] == undefined)
            ls['value'] = ''
        else        
            ls['value'] = $scope.item.pairs[i]['value']     
        pairs.push(ls)
    }
    $scope.item.pairs = pairs
}

function removePairs(index) {
  dt = $scope.item.pairs
  dt.splice(index, 1)
  $scope.item.pairs = dt
}
   
}