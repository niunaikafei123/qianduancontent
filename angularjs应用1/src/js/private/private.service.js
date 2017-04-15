'use strict';

angular.module('shady')
	.factory('privateService',privateService);
	privateService.$inject = ['$http','address','Upload','$localStorage','globalchunksize'];
	function privateService($http,address,Upload,$localStorage,globalchunksize) {
		return {
			getDetail: getDetail,
			editProject: editProject,
			getProjectInvest: getProjectInvest,
			getProjectAction: getProjectAction,
			addInvest: addInvest,
			addAction: addAction,
			uploadActionFile : uploadActionFile,
			stopUpload : stopUpload,
			mergeFileRequest: mergeFileRequest,
			canTransfer: canTransfer,
			getUserNotJoinProject: getUserNotJoinProject,
			getProjectGain: getProjectGain			
		};

		function getDetail(projectId) {
			return $http.post(address+'/project/getDetail.do',{
				'projectId': projectId
			});
		}

		function editProject(data) {
			return $http.post(address+'/project/editProject.do',data);
		}

		function getProjectInvest(projectId) {
			return $http.post(address+'/invest/getProjectInvest.do',{
				'projectId': projectId
			});
		}

		function getProjectAction(projectId) {
			return $http.post(address+'/project/getProjectAction.do',{
				'projectId': projectId
			});
		}

		function addInvest(data) {
			return $http.post(address+'/invest/addInvest.do',data);
		}

		function addAction(projectId,title,content,file) {
			return $http.post(address+'/project/addAction.do',{
				'projectId':projectId,
				'title':title,
				'content': content
			});	
		}

		function uploadActionFile(file){
			return Upload.upload({
                url: address+'/file/uploadActionFileChunk.do',
                resumeSizeUrl: address+'/file/uploadActionFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });			
		}

		function stopUpload() {
			return $http.post(address+'/file/stopUpload.do',{
				'target' : 'action'
			});
		}

		function mergeFileRequest(actionId, file){
			return $http.post(address+'/file/uploadActionFileCompleted.do',{
				'actionId':actionId,
				'fileName':file.name
			});
		}

		function canTransfer(projectId) {
			return $http.post(address+'/project/canTransfer.do',{
				'projectId': projectId
			});
		}

		function getUserNotJoinProject(projectId) {
			return $http.post(address+'/user/getUserNotJoinProject.do',{
				'projectId': projectId
			});
		}

		function getProjectGain(projectId) {
			return $http.post(address+'/project/getProjectGain.do',{
				'projectId': projectId
			});
		}		
	}
