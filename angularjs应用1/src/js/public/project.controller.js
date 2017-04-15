'use strict';

angular.module('shady')
	.controller('projectController',projectController);
	projectController.$inject = ['projectService','constantService'];
	function projectController (projectService,constantService) {
		/* jshint validthis: true */
		var vm=this;
		vm.pageSize = 5;
		vm.areaId = 0;
		vm.categoryId = 0;
		vm.roundId = 0;
		vm.newsearch = newsearch;
		vm.search = search;
		vm.keyup = keyup;
		vm.ownProject = ownProject;
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
			projectService.searchPublicProject(vm.pageNumber,vm.pageSize,vm.projectName,vm.areaId,vm.categoryId,vm.roundId) 
			.success(function (data) {
				if (data.retCode === 1) {
					vm.projectList = data.result.list;
					vm.total = data.result.total;
				}
			})
			.error(function (error) {
				console.log("error");
			});
		}
		
		function ownProject(id) {
			projectService.ownProject(id)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.newsearch();
				}
				else {
					console.log(data);
				}
			})
			.error(function (error) {

			});
		}

		function keyup(event) {
	        if(event.keyCode === 13) {
	            vm.newsearch();
	        }
    	}
 	}