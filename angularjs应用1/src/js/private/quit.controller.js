'use strict';

angular.module('shady')
	.controller('quitController',quitController);
	quitController.$inject = ['$stateParams','projectService','$state'];
	function quitController($stateParams,projectService,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.doquit = doquit;
		function doquit() {
			vm.newgain.projectId = vm.projectId;
			vm.newgain.money = vm.newgain.moneynum * 10000;
			projectService.quitProject(vm.newgain)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("退出记录添加成功");
					$state.go("main.privateprojectdetail",{'projectId': vm.projectId});
				}
			})
			.error(function(error) {
				console.log("error");
			});
		}
	}