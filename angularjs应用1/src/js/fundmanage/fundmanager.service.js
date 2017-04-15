'use strict';

angular.module('shady')
	.factory('fundmanagerService',fundmanagerService);
	fundmanagerService.$inject = ['$http','address','Upload','$localStorage','globalchunksize'];
	function fundmanagerService($http,address,Upload,$localStorage,globalchunksize) {
		return {
			searchFundInfo : searchFundInfo,
			getFundDetail : getFundDetail,
			getFundProject : getFundProject,
			deactiveFund : deactiveFund,
			activeFund : activeFund,
			addFund :  addFund,
			addGp : addGp,
			addLp : addLp,
			addGpFundLink : addGpFundLink,
			addLpFundLink : addLpFundLink,
			getFundLp: getFundLp,
			getFundGp: getFundGp,
			getActiveFundInfoList: getActiveFundInfoList,
			editFund: editFund,
			getFundFile: getFundFile,
			uploadFundFile: uploadFundFile,
			uploadRegulationFile : uploadRegulationFile,
			uploadBusinessFile:uploadBusinessFile,
			uploadRecordFile:uploadRecordFile,
			mergeFileRequest:mergeFileRequest,
			stopUpload:stopUpload

		};
		function searchFundInfo (pageNumber,pageSize,fundName,startDate,moneyType) {
			return $http.post(address+'/fund/searchFundInfo.do',{
				'pageNumber': pageNumber,
				'pageSize': pageSize,
				'fundName': fundName,
				'startDate': startDate,
				'moneyType': moneyType
			});
		}
		function getFundDetail (fundId) {
			return $http.post(address+'/fund/getFundDetail.do',{
				'fundId' : fundId
			});
		}
		function getFundProject (pageNumber,pageSize,fundId) {
			return $http.post(address+'/fund/getFundProject.do',{
				'pageNumber' : pageNumber,
				'pageSize' : pageSize,
				'fundId' : fundId
			});
		}
		function deactiveFund (fundId,comment) {
			return $http.post(address+'/fund/deactiveFund.do',{
				'fundId' : fundId,
				'comment' : comment
			});
		}
		function activeFund (fundId,comment) {
			return $http.post(address+'/fund/activeFund.do',{
				'fundId' : fundId,
				'comment' : comment
			});
		}
		function addFund(data) {
			return $http.post(address+'/fund/addFund.do',data);
		}
		function addGp(data) {
			return $http.post(address+'/people/addGp.do',data);
		}
		function addLp(data) {
			return $http.post(address+'/people/addLp.do',data);
		}
		function addGpFundLink(data) {
			return $http.post(address+'/people/addGpFundLink.do',data);
		}
		function addLpFundLink(data) {
			return $http.post(address+'/people/addLpFundLink.do',data);
		}
		function getFundLp(fundId) {
			return $http.post(address+'/people/getFundLp.do',{
				'fundId': fundId
			});
		}
		function getFundGp(fundId) {
			return $http.post(address+'/people/getFundGp.do',{
				'fundId': fundId
			});
		}
		function getActiveFundInfoList() {
			return $http.post(address+'/fund/getActiveFundInfoList.do',{});
		}
		function editFund(data) {
			return $http.post(address+'/fund/editFund.do',data);
		}

		function getFundFile(fundId,fileType) {
			return $http.post(address+'/file/getFundFile.do',{
				'fundId' : fundId,
				'fileType' : fileType
			});
		}

		function uploadFundFile(fundId,file) {
			return Upload.upload({
				url: address+'/file/addFundFile.do',
				resumeSizeUrl: null,
				resumeChunkSize: null,
				data : {
					'fundId' : fundId,
					'fileType' : file.fileType,
					'description' : file.description
				},
				file : file.content
			});
		}

		function uploadRegulationFile(file) {
			return Upload.upload({
                url: address+'/file/uploadFundRegulationFileChunk.do',
                resumeSizeUrl: address+'/file/uploadFundRegulationFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });
		}

		function uploadBusinessFile(file){
			return Upload.upload({
                url: address+'/file/uploadFundBusinessFileChunk.do',
                resumeSizeUrl: address+'/file/uploadFundBusinessFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });
		}

		function uploadRecordFile(file){
			return Upload.upload({
                url: address+'/file/uploadFundRecordFileChunk.do',
                resumeSizeUrl: address+'/file/uploadFundRecordFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });
		}

		function mergeFileRequest(fundId, file){
			return $http.post(address+'/file/uploadFundFileCompleted.do',{
				'fundId':fundId,
				'fileType':file.fileType,
				'fileName':file.content.name,
				'description': file.description
			});
		}

		function stopUpload() {
			return $http.post(address+'/file/stopUpload.do',{
				'target':'all'
			});
		}

	}