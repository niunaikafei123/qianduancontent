'use strict';

angular.module('shady')
	.factory('loginService',loginService);
	loginService.$inject = ['$http','address'];
	function loginService($http,address){
		return {
			doLogin : doLogin
		};
		function doLogin (data) {
			return $http.post(address+'/user/login.do', data);
		}
	}
