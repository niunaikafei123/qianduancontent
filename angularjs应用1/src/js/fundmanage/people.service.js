'use strict';

angular.module('shady')
	.factory('peopleService',peopleService);
	peopleService.$inject = ['$http','address'];
	function peopleService($http,address) {
		return {
			getAllGp: getAllGp,
			getAllLp: getAllLp,
			getAllFounder: getAllFounder,
			addFounder: addFounder,
			addProjectFounderLink: addProjectFounderLink
		};

		function getAllGp() {
			return $http.post(address+'/people/getAllGp.do', {});
		}

		function getAllLp() {
			return $http.post(address+'/people/getAllLp.do', {});
		}

		function getAllFounder() {
			return $http.post(address+'/people/getAllFounder.do',{});
		}

		function addFounder(data) {
			return $http.post(address+'/people/addFounder.do',data);
		}

		function addProjectFounderLink(data) {
			return $http.post(address+'/people/addProjectFounderLink.do',data);
		}
	}