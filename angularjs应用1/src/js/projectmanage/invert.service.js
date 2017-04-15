'use strict';

angular.module('shady')
	.factory('investService',investService);
	investService.$inject = ['$http','address'];
	function investService($http,address) {
		return {
			getCanFollowInvest: getCanFollowInvest,
			addIntentionInvest: addIntentionInvest,
			updateProjectStatus: updateProjectStatus,
			followInvest: followInvest,
			getInvestFollowInfo: getInvestFollowInfo
		};
		function getCanFollowInvest() {
			return $http.post(address+'/invest/getCanFollowInvest.do',{});
		}
		function addIntentionInvest(data) {
			return $http.post(address+'/invest/addIntentionInvest.do',data);
		}
		function updateProjectStatus(projectId, status) {
			return $http.post(address+'/project/updateProjectStatus.do',{
				'projectId': projectId,
				'status': status
			});
		}
		function followInvest(investId,amount) {
			return $http.post(address+'/invest/followInvest.do',{
				'investId': investId,
				'amount': amount
			});
		}
		function getInvestFollowInfo() {
			return $http.post(address+'/invest/getInvestFollowInfo.do',{});
		}
	}