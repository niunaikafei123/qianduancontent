'use strict';

angular.module('shady')
	.controller('privatedetailController',privatedetailController);
	privatedetailController.$inject = ['$stateParams','privateService','investService','projectService','$state','dashboardService'];
	function privatedetailController($stateParams,privateService,investService,projectService,$state,dashboardService) {
		/* jshint validthis: true */
		var vm=this;
		vm.readonly=true;
		vm.projectId = $stateParams.projectId;
		vm.changeEditabled = changeEditabled;
		vm.loaddetail = loaddetail;
		vm.editProject = editProject;
		vm.showProjectFile = showProjectFile;
		vm.pageSize = 5;
		vm.pageNumber = 1;
		vm.abort = abort;
		vm.clone = clone;
		vm.show1 = show1;
		vm.show2 = show2;
		vm.show3 = show3;
		vm.show4 = show4;
		vm.index = 0;
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
		function changeEditabled() {
			vm.readonly = !vm.readonly;
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

			projectService.getSharedUser(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.ownerlist = data.result;
				}
			})
			.error(function(error) {
				vm.ownerlist = [];
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

			privateService.getProjectInvest(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.investlist = data.result;
				}
				else {
					vm.investlist = [];
				}
 			})
			.error(function(error) {
				vm.investlist = [];
			});

			privateService.getProjectAction(vm.projectId)
			.success(function(data) {

				if (data.retCode === 1) {
					vm.actionlist = data.result;
				}
				else {
					vm.actionlist = [];
				}
			})
			.error(function(error) {
				vm.actionlist = [];
				console.log(error);
			});

			privateService.canTransfer(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.cantransfer = true;
				} else if (data.retCode === -1) {
					vm.cantransfer = false;
				}
			})
			.error(function(error) {
			});


			privateService.getProjectGain(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.payback = data.result.payback;
					vm.comment = data.result.comment;
					vm.timeAdded = data.result.timeAdded;
				}
			})
			.error(function(error) {
			});

			vm.showProjectFile();
		}

		function editProject(params) {
			params.projectId = vm.projectId;
			privateService.editProject(params)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("更新成功");
					vm.loaddetail();
					vm.readonly = true;
				} else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function showProjectFile() {
			dashboardService.getProjectFile(vm.projectId,vm.pageSize,vm.pageNumber)
    		.success(function (data) {
    			if (data.retCode === 1) {
					vm.filelist =data.result.list;
					vm.total = data.result.total;
    			}
				else if(data.retCode === -1) {
					vm.filelist = [];
				}
			})
    		.error(function (error) {
    		});
		}

		function abort(projectId) {
			investService.updateProjectStatus(projectId, 5)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("项目已放弃");
					vm.loaddetail();
					vm.readonly = true;
				}
			})
			.error(function(error) {
			});
		}

		function clone(projectId) {
			projectService.cloneProject(projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("克隆项目成功");
					$state.go("main.publicproject");
				}
			})
			.error(function (error) {
			});
		}



	}