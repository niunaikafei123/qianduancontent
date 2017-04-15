'use strict';

angular.module('shady')
	.factory('usermanageService',usermanageService);
	usermanageService.$inject = ['$http','address'];
	function usermanageService($http,address) {
		return {
			changePassword : changePassword,
			modifyPassword : modifyPassword,
			addUser : addUser,
			addCategory : addCategory,
			getUserList : getUserList,
			activeUser : activeUser,
			deactiveUser :  deactiveUser,
			upUser: upUser,
			downUser: downUser,
			getAllUserInfo : getAllUserInfo,
			getUserProfile : getUserProfile,
			editUserProfile : editUserProfile
		};

		function changePassword(newPassword) {
			return $http.post(address+'/user/changePassword.do', {
				'newPassword' : newPassword
			});
		}
		function modifyPassword(userId, newPassword) {
			return $http.post(address+'/user/modifyPassword.do',{
				'userId' : userId,
				'newPassword' : newPassword
			});
		}
		function addUser(user) {
			return $http.post(address+'/user/addUser.do',user);
		}
		function addCategory(categoryName) {
			return $http.post(address+'/constant/addCategory.do', {
				'categoryName' : categoryName
			});
		}
		function getUserList(pageNumber,pageSize) {
			return $http.post(address+'/user/getUserList.do',{
				'pageNumber' : pageNumber,
				'pageSize' : pageSize
			});
		}
		function activeUser(userId) {
			return $http.post(address+'/user/activeUser.do',{
				'userId' :  userId
			});
		}
		function deactiveUser(userId) {
			return $http.post(address+'/user/deactiveUser.do',{
				'userId' :  userId
			});
		}
		function upUser(userId) {
			return $http.post(address+'/user/upUser.do',{
				'userId': userId
			});
		}
		function downUser(userId) {
			return $http.post(address+'/user/downUser.do',{
				'userId': userId
			});
		}
		function getAllUserInfo() {
			return $http.post(address+'/user/getAllUserInfo.do',{});
		}
		function getUserProfile() {
			return $http.post(address+'/user/getUserProfile.do',{});
		}
		function editUserProfile(param) {
			return $http.post(address+'/user/editUserProfile.do',param);
		}
	}