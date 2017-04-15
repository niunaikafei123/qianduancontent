'use strict';

angular.module('shady')
		.factory('dataanalysisService',dataanalysisService);
		dataanalysisService.$inject = ['$http','address'];
		function dataanalysisService($http,address) {
			return {
				globalStatistics : globalStatistics,
				fundStatistics : fundStatistics,
				getFundInfoList : getFundInfoList
			};
			function globalStatistics() {
				return $http.post(address+'/fund/globalStatistics.do',{});
			}
			function fundStatistics(fundId) {
				return $http.post(address+'/fund/fundStatistics.do',{
					'fundId' : fundId
				});
			}
			function getFundInfoList() {
				return $http.post(address+'/fund/getFundInfoList.do',{});
			}
		}