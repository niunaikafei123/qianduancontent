
 angular.module('myapp').controller('myCtrl', function($scope) {


	$scope.items=[
	{name:'工商银行',touzi1:'3万/笔',touzi2:'5万/笔'},
	{name:'农业银行',touzi1:'3万/笔',touzi2:'5万/笔'}];
      $scope.choose(function(item){
      	sessionStorage.name=item.name;
   		sessionStorage.touzi1=item.touzi1;
      	sessionStorage.touzi2=item.touzi2;
      	$rootScope.name = item.name;
      	$rootScope.touzi1 = item.touzi1;
      	$rootScope.touzi2 = item.touzi2;      	$state.go(tab.banding);      })
      }) 