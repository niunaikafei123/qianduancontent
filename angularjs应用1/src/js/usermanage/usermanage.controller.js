'use strict';

angular
	.module('shady')
	.controller('manageuserController', manageuserController);
	manageuserController.$inject = ['$scope','usermanageService','$timeout','constantService'];
	function manageuserController ($scope,usermanageService,$timeout,constantService) {
		/* jshint validthis: true */
		var vm=this;
		vm.showindex = 1;
		vm.show = show;
		vm.msg = "";
		vm.changePass = changePass;
		vm.addUser = addUser;
		vm.addCategory = addCategory;
		vm.pageNumber = 1;
		vm.pageSize = 10;
		vm.activeUser = activeUser;
		vm.deactiveUser = deactiveUser;
		vm.upUser = upUser;
		vm.downUser = downUser;
		vm.showUser = showUser;
		vm.showCategory = showCategory;
		vm.loadselect = loadselect;
		vm.show(1);
		function show(index) {
			vm.showindex = index;
			if (index === 1) {
				vm.loadselect();
			}
			if (index === 3) {
				vm.showUser();
			}
			if (index ===4) {
				vm.showCategory();
			}
		}

		function changePass(password) {
			usermanageService.changePassword(password)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.msg = data.retMsg;
				}
				else if(data.retCode === -1){
					vm.msg = data.retMsg;
				}
				$timeout(function() {
					vm.msg = "";
				},1000);


			})
			.error(function(error) {
				console.log("error");
			});
		}

		function addUser(user) {
			usermanageService.addUser(user)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.user = {};
					vm.addMsg = data.retMsg;
				}
				else {
					vm.addMsg = data.retMsg;
				}
				$timeout(function() {
					vm.addMsg = "";
				},1000);
			})
			.error(function(error) {
				console.log("error");
			});
		}
			
		function addCategory(categoryName){
			usermanageService.addCategory(categoryName)
			.success(function(data) {
				if(data.retCode===1){
					vm.categoryName = "";
					vm.categoryMsg=data.retMsg;
					vm.showCategory();			
				}
				else{
					vm.categoryMsg=data.retMsg;
				}
				$timeout(function() {
					vm.categoryMsg = "";
				},1000);
			});
		}

		function deactiveUser(userId) {
			usermanageService.deactiveUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function activeUser(userId) {
			usermanageService.activeUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function upUser(userId) {
			usermanageService.upUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function downUser(userId) {
			usermanageService.downUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function (error){
			});
		}

		function loadselect() {
			usermanageService.getAllUserInfo()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.userlist = data.result;
					vm.targetUserId = vm.userlist[0].userId;
				}
			})
			.error(function(error) {
				vm.userlist = [];
			});
		}

		function showUser() {
			usermanageService.getUserList(vm.pageNumber,vm.pageSize)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.userlist = data.result.list;
					vm.total = data.result.total;
				}
				else {
					vm.userlist = [];
					vm.total = 0;
				}

			})
			.error(function(error) {
				vm.userlist = [];
				vm.total = 0;
			});
		}

		function showCategory() {
			constantService.getCategory()
			.success(function(data) {
				if (data.retCode  === 1) {
					vm.categorylist = data.result;
				}
			})
			.error(function() {
				vm.categorylist = [];
			});
		}

	}