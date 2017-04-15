'use strict';

angular.module('shady')
	.controller('publicdetailController',publicdetailController);
	publicdetailController.$inject = ['$stateParams','privateService','projectService','$state','dashboardService'];
	function publicdetailController($stateParams,privateService,projectService,$state,dashboardService) {
		/* jshint validthis: true */
		var vm=this;
		vm.readonly=true;
		vm.projectId = $stateParams.projectId;
		vm.loaddetail = loaddetail;
		vm.ownProject = ownProject;
		vm.show1 = show1;
		vm.show2 = show2;
		vm.show3 = show3;
		vm.show4 = show4;
		vm.showfile = showfile;
		vm.index = 0;
		vm.pageSize = 5;
		vm.pageNumber = 1;
		function show1 () {
			vm.index = 0;
		}
		function show2(){
			vm.index = 1;
		}
		function show3(){
			vm.index = 2;
		}
		function show4(){
			vm.index = 3;
		}
		function showfile() {
			dashboardService.getProjectFile(vm.projectId,vm.pageSize,vm.pageNumber)
			.success(function(data) {
				if (data.retCode === 1) {
					console.log(data);
					vm.filelist = data.result.list;
					vm.total = data.result.total;
				}
			})
			.error(function(error) {
				vm.filelist = [];
				vm.total = 0;
			});
		}

		function loaddetail() {
			privateService.getDetail(vm.projectId)
			.success(function(data) {
				if(data.retCode === 1) {
					vm.project = data.result;
					if (vm.project.tag) {
						vm.tags = vm.project.tag.split(";");
					}	
				}
			})
			.error(function(error) {
			});

			projectService.getProjectFounder(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.founderlist = data.result.founder;
				}
			})
			.error(function(error) {
				vm.founderlist = [];
			});

			projectService.getIntentionInvest(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.intentioninvest = data.result;
				}
			})
			.error(function(error) {
			});

			vm.showfile();
		}

		function ownProject() {
			projectService.ownProject(vm.projectId)
			.success(function (data) {
				if (data.retCode === 1) {
					$state.go("main.publicproject");
				}
				else {
				}
			})
			.error(function (error) {
			});
		}


	}