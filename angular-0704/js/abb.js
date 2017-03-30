var app=angular.module("app",['ui.router']);
			app.config(function($stateProvider, $urlRouterProvider){
				$stateProvider
			  .state('producers', {  
				    url: '/producers',  
				    templateUrl: 'producers.html',  
				    controller: 'ProducersCtrl'  
				})  
				.state('producer', {  
				    url: '/producer/:producerId',  
				    templateUrl: 'producer.html',  
				    controller: 'ProducerCtrl'  
				}) 
			  
			})
			

app.controller('ProducersCtrl', function ($scope, $state) {  
    $scope.toProducer = function (producerId) {  
        $state.go('producer', {producerId: producerId});  
    };  
});  

app.controller('ProducerCtrl', function ($scope, $state, $stateParams) { 
	 $scope.items=[
	  {name:111,pwd:222},
	  {name:333,pwd:444}
	  ]
   var producerId = $stateParams.producerId;  
});  