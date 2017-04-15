'use strict';

angular
	.module('shady')
	.controller('addfundController',addfunController);
	addfunController.$inject =  ['fundmanagerService','peopleService','$timeout','$filter','$localStorage','errorService'];
	function addfunController (fundmanagerService,peopleService,$timeout,$filter,$localStorage,errorService) {
		/* jshint validthis: true */
		var vm=this;
		vm.moneyTypelist = [{typeId:0,typeName:'美元'},{typeId:1,typeName:'人民币'}];

		vm.doStep1 = doStep1;
		vm.addgp = addgp;
		vm.addlp = addlp;
		vm.addlpfundlink = addlpfundlink;
		vm.addgpfundlink = addgpfundlink;
		vm.prepare = prepare;
		vm.loadfile1 = loadfile1;
		vm.loadfile2 = loadfile2;
		vm.loadfile3 = loadfile3;
		vm.uploadregulationFile2 = uploadregulationFile2;
		vm.uploadbusinessFile2 = uploadbusinessFile2;
		vm.uploadrecordFile2 = uploadrecordFile2;
		vm.open2 = open2;
		vm.loadpeople = loadpeople;
		vm.loadlp = loadlp;
		vm.loadgp = loadgp;

		vm.regulationFile = {fileType:1,progress:-1};
		vm.businessFile = {fileType:2,progress:-1};
	    vm.recordFile = {fileType:3,progress:-1};

		vm.filelist1=[];
		vm.filelist2=[];
		vm.filelist3=[];

		vm.prepare();
		function prepare() {
			vm.step=1;
			vm.newfund = {};
			vm.newfund.moneyType = 1;
			vm.startDate = "";
		}

		function open2() {
			vm.opened = true;
		}

		function doStep1() {
			vm.newfund.startDate = $filter('date')(vm.startDate,'yyyy-MM-dd');
			vm.newfund.money = vm.newfund.moneynum * 10000;
			fundmanagerService.addFund(vm.newfund)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.step=2;
					vm.currentFundId=data.result.fundId;
				}
				else if(data.retCode === -1) {
					errorService.errorModal(data.retMsg);
				}
 			})
 			.error(function(data) {
 				alert("提交信息有误，请检查输入");
 			});
		}


		function loadpeople() {
			vm.loadlp();
			vm.loadgp();
		}

		function loadlp() {
			fundmanagerService.getFundLp(vm.currentFundId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.lplist = data.result.lp;
				}
				else if (data.retcode === -1) {
					vm.lplist = [];
				}
			})
			.error(function(error){
				vm.lplist = [];
			});
		}

		function loadgp() {
			fundmanagerService.getFundGp(vm.currentFundId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.gplist = data.result.gp;
				}
				else if (data.retCode === -1) {
					vm.gplist =[];
				}
			})
			.error(function(error) {
				vm.gplist =[];
			});
		}

		function addgp(param) {
			fundmanagerService.addGp(param)
			.success(function(data) {
				if(data.retCode === 1) {
					var params = {
						'fundId':vm.currentFundId,
						'peopleId' : data.result.gpId
					};
					vm.addgpfundlink(params);
					vm.newgp = {};
				}
			})
			.error(function(error) {
			});
		}

		function addlp(param) {
			param.money = param.moneynum * 10000;
			fundmanagerService.addLp(param)
			.success(function(data) {
				if(data.retCode === 1) {
					var params = {
						'fundId':vm.currentFundId,
						'peopleId' : data.result.lpId
					};
					vm.addlpfundlink(params);
					vm.newlp = {};
				}
			})
			.error(function(error) {
			});
		}

		function addgpfundlink(people) {
			fundmanagerService.addGpFundLink(people)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("gplink添加成功");
					vm.loadgp();
				}
			})
			.error(function(error) {
			});
		}

		function addlpfundlink(people) {
			fundmanagerService.addLpFundLink(people)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("lplink添加成功");
					vm.loadlp();
				}
			})
			.error(function(error) {
			});
		}

		function loadfile1() {
			fundmanagerService.getFundFile(vm.currentFundId,1)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.filelist1 = data.result;
				} else if (data.retCode === -1) {
					vm.filelist1 = [];
				}
			})
			.error(function (error) {
				vm.filelist1 = [];
			});
		}

		function loadfile2() {
			fundmanagerService.getFundFile(vm.currentFundId,2)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.filelist2 = data.result;
				} else if (data.retCode === -1) {
					vm.filelist2 = [];
				}
			})
			.error(function (error) {
				vm.filelist2 = [];
			});		
		}

		function loadfile3() {
			fundmanagerService.getFundFile(vm.currentFundId,3)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.filelist3 = data.result;
				} else if (data.retCode === -1) {
					vm.filelist3 = [];
				}
			})
			.error(function (error) {
				vm.filelist3 = [];
			});			
		}
		
		function uploadregulationFile2() {
			fundmanagerService.uploadRegulationFile(vm.regulationFile)
			.then(function(response) {
				console.log("正在合并文件");
				fundmanagerService.mergeFileRequest(vm.currentFundId, vm.regulationFile)
				.then(function(response){
					if(response.data.retCode == 1){
						vm.regulationFile.result = response.data;
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					$timeout(function() {
						vm.regulationFile.result = null;
						vm.regulationFile = {fileType:1,progress:-1};
					},1000);
					vm.loadfile1();
				});
			},function (response) {
			},function (evt) {
				vm.regulationFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function uploadbusinessFile2() {
			fundmanagerService.uploadBusinessFile(vm.businessFile)
			.then(function(response) {
				console.log("正在合并文件");
				fundmanagerService.mergeFileRequest(vm.currentFundId, vm.businessFile).then(function(response){
					if(response.data.retCode == 1){
						vm.businessFile.result = response.data;
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					$timeout(function() {
						vm.businessFile.result = null;
						vm.businessFile = {fileType:2,progress:-1};
					},1000);
					vm.loadfile2();
				});
			},function (response) {
			},function (evt) {
				vm.businessFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function uploadrecordFile2() {
			fundmanagerService.uploadRecordFile(vm.recordFile)
			.then(function(response) {
				console.log("正在合并文件");
				fundmanagerService.mergeFileRequest(vm.currentFundId, vm.recordFile).then(function(response){
					if(response.data.retCode == 1){
						vm.recordFile.result = response.data;
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					$timeout(function() {
						vm.recordFile.result = null;
						vm.recordFile = {fileType:3,progress:-1};
					},1000);
					vm.loadfile3();
				});
			},function (response) {
			},function (evt) {
				vm.recordFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}				
	}