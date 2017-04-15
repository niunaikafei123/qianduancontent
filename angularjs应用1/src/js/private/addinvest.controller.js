'use strict';
angular.module('shady')
	.controller('addInvestController',addInvestController);
	addInvestController.$inject = ['$scope','$state','$stateParams','privateService','constantService','fundmanagerService'];
	function addInvestController($scope,$state,$stateParams,privateService,constantService,fundmanagerService) {
		/* jshint validthis: true */
		var vm=this;
		vm.load = load;
		vm.addInvest = addInvest;
		vm.projectId = $stateParams.projectId;
		vm.roundId = $stateParams.roundId;
		vm.newinvest = {};
		vm.newinvest.moneyType = 1;
		vm.fundlist=[];
		
		$scope.$watch('vm.newinvest.fundId',function(newValue){			
			vm.fundlist.forEach(function(ele){
				if(ele.fundId===newValue){
					vm.newinvest.moneyType=ele.moneyType;
				}
			});
		});

		function load () {
			constantService.getRound(vm.roundId)
			.success(function(data) {
				vm.roundlist = data.result;
				vm.newinvest.roundId = vm.roundlist[0].roundId;
			})
			.error(function(error) {
				vm.roundlist = [];
			});

			fundmanagerService.getActiveFundInfoList()
			.success(function(data) {
				vm.fundlist = data.result;
				vm.newinvest.fundId = vm.fundlist[0].fundId;
			})
			.error(function(error) {
				vm.fundlist = [];
			});
		}

		function addInvest(params) {
			params.projectId = vm.projectId;
			params.money = params.moneynum * 10000;
			params.percentage = params.percentagenum / 100;
			params.follow = params.follownum * 10000;
			params.value = 1000000 * vm.newinvest.moneynum / vm.newinvest.percentagenum;
			privateService.addInvest(params)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("投资记录添加成功");
					$state.go("main.privateprojectdetail",{'projectId': vm.projectId});
				}
				else if(data.retCode === -1) {
					alert("投资失败");
				}
			})
			.error(function(error) {
			});
		}
	}