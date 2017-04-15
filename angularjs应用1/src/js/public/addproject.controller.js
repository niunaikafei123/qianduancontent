'use strict';

angular.module('shady')
	.controller('addprojectController',addprojectController);
	addprojectController.$inject = ['projectService','constantService','peopleService','investService','$timeout','dashboardService'];
	function addprojectController(projectService,constantService,peopleService,investService,$timeout,dashboardService) {
		/* jshint validthis: true */
		var vm = this;
		vm.step=1;
		vm.addtag =  addtag;
		vm.removetag = removetag;
		vm.doStep1 = doStep1;
		vm.addprojectfounderlink = addprojectfounderlink;
		vm.addfounder = addfounder;
		vm.loadfounder = loadfounder;
		vm.newproject = {};
		vm.moneyTypelist = [{typeId:0,typeName:'美元'},{typeId:1,typeName:'人民币'}];
		vm.initstep3 = initstep3;
		vm.finishstep3 = finishstep3;
		vm.upload = upload;
		vm.loadFile = loadFile;
		vm.pageSize = 5;
		vm.pageNumber = 1;
		vm.tags = [];

		constantService.getCategory()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.categorylist = data.result;
				vm.newproject.categoryId = vm.categorylist[0].categoryId;
			}
			else {
				vm.categorylist = [];
				vm.newproject.categoryId = null;
			}
		})
		.error(function(error) {
			vm.categorylist = [];
			vm.newproject.categoryId = null;
		});

		constantService.getArea()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.arealist = data.result;
				vm.newproject.areaId = vm.arealist[0].areaId;
			}
			else {
				vm.arealist = [];
				vm.newproject.areaId = null;
			}
		})
		.error(function(error) {
			vm.arealist = [];
			vm.newproject.areaId = null;
		});

		constantService.getRound(1)
		.success(function(data) {
			if (data.retCode === 1) {
				vm.roundlist = data.result;
				vm.newproject.currentRoundId = vm.roundlist[0].roundId;
			}
			else {
				vm.roundlist = [];
				vm.newproject.currentRoundId = null;
			}
		})
		.error(function(error) {
			vm.roundlist = [];
			vm.newproject.currentRoundId = null;
		});

		function addtag() {
			if (vm.ctag) {
	 			vm.tags.push(vm.ctag);
				vm.ctag = '';
			}
		}

		function removetag(index) {
			vm.tags.splice(index,1);
		}

		function addprojectfounderlink(people) {
			peopleService.addProjectFounderLink(people)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("project founder link 添加成功");
					vm.loadfounder();
				}
			})
			.error(function(error) {
			});
		}

		function addfounder(param) {
			peopleService.addFounder(param)
			.success(function(data) {
				if (data.retCode === 1) {
					var params = {
						'projectId': vm.currentProjectId,
						'peopleId': data.result.founderId,
					};
					vm.addprojectfounderlink(params);
					vm.newfounder = {};
				}
			})
			.error(function(error) {
			});
		}

		function loadfounder() {
			projectService.getProjectFounder(vm.currentProjectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.fouderlist = data.result.founder;
				}
				else if (data.retCode === -1) {
					vm.founderlist = [];
				}
			})
			.error(function(error) {
				vm.founderlist = [];
			});
		}

		function doStep1() {
			if (vm.tags.length === 0) {
				vm.newproject.tag = null;
			}
			else {
				vm.newproject.tag = vm.tags.join(';');
			}
			projectService.addProject(vm.newproject)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.step=2;
					vm.currentProjectId=data.result.projectId;
					vm.newfounder = {};
				}
			})
			.error(function(error) {
				console.log("创建项目失败");
			});
		}

		function initstep3() {
			vm.step = 3;
			vm.newIntentionInvest = {};
			vm.newIntentionInvest.roundId = vm.newproject.currentRoundId;
			vm.roundlist.forEach(function(ele) {
				if (ele.roundId == vm.newIntentionInvest.roundId) {
					vm.roundName = ele.roundName;
				}
			});
			vm.newIntentionInvest.moneyType = 1;
			vm.newIntentionInvest.projectId = vm.currentProjectId;
		}

		function finishstep3() {
			vm.newIntentionInvest.money = vm.newIntentionInvest.moneynum * 10000;
			vm.newIntentionInvest.percentage = vm.newIntentionInvest.percentagenum / 100;
			vm.newIntentionInvest.value = 1000000 * vm.newIntentionInvest.moneynum / vm.newIntentionInvest.percentagenum;

			investService.addIntentionInvest(vm.newIntentionInvest)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("融资意向创建成功");
					vm.step = 4;
				}
			})
			.error(function(data) {
			});
		}

		function upload() {			
			projectService.addProjectFile2(vm.newfile.file)
			.then(function(response) {
				projectService.mergeFileRequest(vm.currentProjectId, vm.newfile)
				.then(function(response){
					if(response.data.retCode == 1){
						console.log("合并完成");
						$timeout(function() {
							vm.progress = -1;
							vm.newfile = {};
							vm.tags = [];
						},1000);
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					vm.loadFile();
				});
			},function (response) {
			},function (evt) {
				vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function loadFile(){
			dashboardService.getProjectFile(vm.currentProjectId,vm.pageSize,vm.pageNumber)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.filelist = data.result.list;
					vm.total = data.result.total;
				}
			})
			.error(function(error) {
				vm.filelist = [];
				vm.total = 0;
			});
		}
	}