'use strict';

angular
	.module('shady')
	.controller('dataanalysisController', dataanalysisController);
	dataanalysisController.$inject = ['dataanalysisService','constantpie'];
	function dataanalysisController (dataanalysisService,constantpie) {
		/* jshint validthis: true */
		var vm=this;
		vm.load = load;
		vm.index = 0;
		vm.config = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '45%',
			center:['50%','50%'],
			legend:{show:false},
		};
		vm.config1 = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '45%',
			center:['50%','50%'],
			legend:{show:false},
			forceClear: true
		};
		vm.showGlobal = showGlobal;
		vm.showLocal = showLocal;
		vm.search = search;
		function showGlobal () {
			vm.index = 0;
		}
		function showLocal () {
			vm.index = 1;
			dataanalysisService.getFundInfoList()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.fundlist = data.result;
					vm.fundId = vm.fundlist[0].fundId;
					vm.search(vm.fundId);
				}
				else {
					vm.fundlist = [];
				}
			})
			.error(function(error) {
				vm.fundlist = [];
			});
		}
		function load() {
			dataanalysisService.globalStatistics()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.fundCount = data.result.fundCount;
					vm.managerCount = data.result.managerCount;
					var datapoints1 = [];
					for (var i in data.result.categoryDisList) {
						var item1 = data.result.categoryDisList[i];
						datapoints1.push({'x':item1.category,'y':item1.projectCount});
					}
					vm.bardata1 = [{'datapoints':datapoints1}];
					var datapoints2 = [];
					for (var j in data.result.peopleDisList) {
						var item2 = data.result.peopleDisList[j];
						datapoints2.push({'x':item2.realName,'y':item2.count});
					}
					vm.bardata2 =  [{'datapoints':datapoints2}];
					var datapoints3 = [];
					for (var k in data.result.roundDisList) {
						var item3 = data.result.roundDisList[k];
						datapoints3.push({'x':item3.round,'y':item3.projectCount});
					}				
					vm.bardata3 = [{'datapoints':datapoints3}];
					var datapoints4 = [];
					for (var l in data.result.projectAreaInfo) {
						var item4 = data.result.projectAreaInfo[l];
						datapoints4.push({'x':item4.areaName,'y':item4.projectCount});
					}
					vm.bardata7 = [{'datapoints':datapoints4,'name':'项目数量'}];
				}
				vm.fundCount = data.result.fundCount;
				vm.managerCount = data.result.managerCount;
			})
			.error(function(error) {
				console.log("error");
			});
		}
		function search(fundId) {
			dataanalysisService.fundStatistics(fundId)
			.success(function(data) {
				if(data.retCode === 1) {
					vm.money = data.result.money;
					vm.usedmoney = data.result.usedmoney;
					vm.manager = data.result.managerCount;
					var datapoints1 = [];
					for (var i in data.result.categoryDisList) {
						var item1 = data.result.categoryDisList[i];
						datapoints1.push({'x':item1.category,'y':item1.projectCount});
					}
					if (datapoints1.length === 0) {
						datapoints1.push({'x':'空数据','y':0});
					}
					vm.bardata4 = [{'datapoints':datapoints1}];
					var datapoints2 = [];
					for (var j in data.result.peopleDisList) {
						var item2 = data.result.peopleDisList[j];
						datapoints2.push({'x':item2.realName,'y':item2.count});
					}
					if (datapoints2.length === 0) {
						datapoints2.push({'x':'空数据','y':0});
					}
					vm.bardata5 =  [{'datapoints':datapoints2}];
					var datapoints3 = [];
					for (var k in data.result.roundDisList) {
						var item3 = data.result.roundDisList[k];
						datapoints3.push({'x':item3.round,'y':item3.projectCount});
					}
					if (datapoints3.length === 0) {
						datapoints3.push({'x':'空数据','y':0});
					}
					vm.bardata6 = [{'datapoints':datapoints3}];

					var datapoints4 = [];
					for (var l in data.result.projectAreaInfo) {
						var item4 = data.result.projectAreaInfo[l];
						datapoints4.push({'x':item4.areaName,'y':item4.projectCount});
					}
					if (datapoints4.length === 0) {
						datapoints4.push({'x':'空数据','y':0});
					}
					vm.bardata8 = [{'datapoints':datapoints4,'name':'项目数量'}];
				}
				else {

				}
			})
			.error(function(error) {
				console.log("error");
			});
		}

		vm.load();
	}