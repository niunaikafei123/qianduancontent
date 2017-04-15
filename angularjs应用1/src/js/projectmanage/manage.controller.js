'use strict';

angular.module('shady')
	.controller('manageController',manageController);
	manageController.$inject = ['constantService','projectService','investService'];
	function manageController(constantService,projectService,investService) {
		/* jshint validthis: true */
		var vm=this;
		vm.pageSize = 5;
		vm.statuslist = [
			{id:0,desc:'所有'},
			{id:1,desc:'新建'},
			{id:2,desc:'跟进'},
			{id:3,desc:'已投'},
			{id:4,desc:'退出'},
			{id:5,desc:'放弃'}
		];
		vm.status = 0;
		vm.areaId = 0;
		vm.categoryId = 0;
		vm.roundId = 0;
		vm.newsearch = newsearch;
		vm.search = search;
		vm.keyup = keyup;
		vm.loaddata = loaddata;
		vm.followinvest = followinvest;

		vm.loaddata();
		constantService.getArea()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.arealist = data.result;
				vm.arealist.unshift({areaId:0,areaName:'所有'});
			}
			else {
				vm.arealist = [];
				vm.areaId = null;
			}
		})
		.error(function(error) {
			vm.arealist = [];
			vm.areaId = null;
		});		

		constantService.getCategory()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.categorylist = data.result;
				vm.categorylist.unshift({categoryId:0,categoryName:'所有'});
			}
			else {
				vm.categorylist = [];
				vm.categoryId = null;
			}
		})
		.error(function(error) {
			vm.categorylist = [];
			vm.categoryId = null;
		});

		constantService.getRound(1)
		.success(function(data) {
			if (data.retCode === 1) {
				vm.roundlist = data.result;
				vm.roundlist.unshift({roundId:0,roundName:'所有'});
			}
			else {
				vm.roundlist = [];
				vm.roundId = null;
			}
		})
		.error(function(error) {
			vm.roundlist = [];
			vm.roundId = null;
		});

		vm.newsearch();
		function newsearch() {
			vm.pageNumber = 1;
			vm.search();
		}

		function search() {
			projectService.searchProject(vm.pageNumber,vm.pageSize,vm.projectName,
				vm.areaId,vm.categoryId,vm.roundId,vm.status)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.projectList = data.result.list;
					vm.total = data.result.total;
				}
				else {
					vm.projectList = [];
					vm.total = 0;
				}
			})
			.error(function (error) {
				vm.projectList = [];
				vm.total = 0;
			});
		}

		function loaddata() {
			investService.getCanFollowInvest()
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


			investService.getInvestFollowInfo()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.myfollowlist = data.result;
				}
				else {
					vm.myfollowlist = [];
				}
			})
			.error(function (error) {
				vm.myfollowlist = [];
			});
		}

		function followinvest(param) {
			var amount = param.amountnum * 10000;
			investService.followInvest(param.investId,amount)
			.success(function(data) {
				if (data.retCode === 1) {
					param.amountnum = "";
					vm.loaddata();
				}
			})
			.error(function(error) {
			});
		}

		function keyup(event) {
	        if(event.keyCode === 13) {
	            vm.newsearch();
	        }
    	}
	}