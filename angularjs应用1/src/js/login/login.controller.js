'use strict';

angular
	.module('shady')
	.controller('LoginCtrl', LoginCtrl);
	LoginCtrl.$inject = ['$state','$localStorage','loginService','errorService'];
	function LoginCtrl ($state,$localStorage,loginService,errorService) {
		/* jshint validthis: true */
		var vm=this;
		vm.login= login;
		function login(data){
			loginService.doLogin(data)
			.success(function(data) {
				if(data.retCode==1){
					$localStorage.login=true;
					$localStorage.isAdmin = data.result.isAdmin;
					$localStorage.token = data.result.token;
					$localStorage.username = data.result.username;
					$localStorage.realName = data.result.realName;
					$state.go("main.dashboard");
				}else{
					errorService.errorModal(data.retMsg);
				}
			})
			.error(function(data){
				errorService.errorModal("网络通讯出错，请检查本地网络或者联系系统管理员");
			});
		}
	}
	