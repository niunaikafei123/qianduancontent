'use strict';

angular.module('shady')
	.controller('sidenavController',sidenavController);
	sidenavController.$inject = ['$localStorage'];
	function sidenavController ($localStorage) {
		/* jshint validthis: true */
		var vm=this;
		vm.username = $localStorage.username;
		vm.isAdmin	= $localStorage.isAdmin;
		vm.realName = $localStorage.realName;
	}