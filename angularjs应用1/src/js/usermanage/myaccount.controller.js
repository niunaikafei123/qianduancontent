'use strict';

angular
	.module('shady')
	.controller('myaccountController', myaccountController);
	myaccountController.$inject = ['usermanageService','errorService'];
	function myaccountController (usermanageService,errorService) {
		/* jshint validthis: true */
		var vm=this;
		vm.readonly = true;
		vm.taggle = taggle;
		vm.load = load;
		vm.save = save;
		vm.load();
		function load() {
			usermanageService.getUserProfile()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.realName = data.result.realName;
					vm.position = data.result.position;
				}
			})
			.error(function(error) {
			});

		}
		function taggle (){
			vm.readonly = !vm.readonly;
		}

		function save() {
			var param = {};
			param.position = vm.position;
			param.realName = vm.realName;
			if (vm.password !== "") {
				param.password = vm.password;
			}
			usermanageService.editUserProfile(param)
			.success(function(data) {
				if (data.retCode === 1) {
					errorService.errorModal("更新成功");
					vm.password = "";
				}
			})
			.error(function(error) {
			});
		}
	}