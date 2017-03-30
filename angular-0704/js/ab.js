var app=angular.module("app",["ui.router"]);
app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('page2',{
		url:"/page2",
		templateUrl:"page2.html",
		controller:"ACtrl"
	})
	.state('page1',{
		url:"/page1/:name",
		templateUrl:"page1.html",
		controller:"BCtrl"
	})
})
app.controller("ACtrl",function($scope,$state, $stateParams){
	var name = $stateParams.name;
})
app.controller("BCtrl",function($scope, $state){
	$scope.items=[
	{imgurl:"../images/ico1.png",name:"xxx01",pwd:"8888"},
	{imgurl:"../images/ico2.png",name:"xxxf01",pwd:"88gf88"},
	{imgurl:"../images/ico3.png",name:"xxxf01",pwd:"88rtt88"},
	{imgurl:"../images/ico4.png",name:"xxx0f1",pwd:"88trew88"},
	{imgurl:"../images/ico5.png",name:"xxxf01",pwd:"88tre88"}, 
	{imgurl:"../images/ico6.png",name:"xxx0ff1",pwd:"88trwe88"}
	]
	
	$scope.toPage1=function(name){
		$state.go('page1', {name:name});
	}
	
})