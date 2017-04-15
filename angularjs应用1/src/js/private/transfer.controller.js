'use strict';

angular.module('shady')
	.controller('transferController',transferController);
	transferController.$inject = ['$stateParams','projectService','privateService','$state'];
	function transferController($stateParams,projectService,privateService,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.dotransfer = dotransfer;
		vm.loaduser = loaduser;
		function dotransfer() {
			projectService.transferProject(vm.projectId,vm.transferUserId)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("转让成功");
					$state.go("main.privateproject");
				}
			})
			.error(function(error) {
			});
		}

		function loaduser() {
			privateService.getUserNotJoinProject(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.userlist = data.result;
					vm.transferUserId = vm.userlist[0].userId;
				} else if (data.retCode === -1) {
					vm.userlist = [];
				}
			})
			.error(function(error) {
				vm.userlist = [];
			});
		}
	}