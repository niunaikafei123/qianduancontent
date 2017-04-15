'use strict';

angular
	.module('shady')
	.controller('dashboardController', dashboardController);
	dashboardController.$inject = ['dashboardService','constantpie','$localStorage','$state'];
	function dashboardController (dashboardService,constantpie,$localStorage,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.pageNumber = 1;
		vm.pageSize = 2;
		vm.showProject = showProject;
		vm.barconfig = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '50%',
			center:['50%','50%'],
			legend:{show:false}
		};
		vm.pieconfig = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '50%',
			center:['50%','50%'],
			legend:{show:false}
		};

		dashboardService.getWorkforceInfo()
		.success(function(data) {
			if (data.retCode === 1) {
				var datapoints = [];
				for (var item in data.result) {
					datapoints.push({'x':data.result[item].realName,'y':data.result[item].count});
				}
				vm.bardata = [{'datapoints':datapoints}];
			}
		})
		.error(function(error) {
			console.log("error workforce");
		});

		dashboardService.projectStatusStatistics()
		.success(function (data) {
			if (data.retCode === 1) {
				var datapoints = [];
				for (var item in data.result) {
					datapoints.push({'x':item,'y':data.result[item]});
				}
				vm.piedata = [{'datapoints':datapoints}];
			}
		})
		.error(function (error) {
			console.log("status statistics");
		});

		showProject();
		function showProject() {
			return dashboardService.getTrackProject(vm.pageNumber, vm.pageSize)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.list = data.result.list;
				    vm.total = data.result.total;
				    if (vm.total > 0) {
				    	vm.isEmpty = false;
				    }
				    else {
				    	vm.isEmpty = true;
				    }
				}
			})
			.error(function (error) {
				//TODO 为这个错误添加全局的显示错误的方式，而不是简单的前端登出系统
				vm.isEmpty = true;
				console.log("获取数据错误");
			});
		}
	}