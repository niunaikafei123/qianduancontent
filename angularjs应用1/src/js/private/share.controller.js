'use strict';

angular.module('shady')
	.controller('shareController',shareController);
	shareController.$inject = ['$stateParams','projectService','privateService','$state'];
	function shareController($stateParams,projectService,privateService,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.doshare = doshare;
		vm.loaduser = loaduser;
		function doshare() {
			projectService.shareProject(vm.projectId,vm.sharedUserId)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("分享成功");
					$state.go("main.privateprojectdetail",{'projectId': vm.projectId});
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
					vm.sharedUserId = vm.userlist[0].userId;
				} else if (data.retCode === -1) {
					vm.userlist = [];
				}
			})
			.error(function(error) {
				vm.userlist = [];
			});
		}
	}