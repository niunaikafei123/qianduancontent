'use strict';

angular.module('shady')
	.factory('projectService',projectService);
	projectService.$inject = ['$http','address','Upload','$localStorage','globalchunksize'];
	function projectService($http,address,Upload,$localStorage,globalchunksize) {
		return {
			addProject : addProject,
			addProjectFile : addProjectFile,
			addProjectFile2 : addProjectFile2,
			searchPublicProject : searchPublicProject,
			searchPrivateProject : searchPrivateProject,
			searchProject : searchProject,
			getProjectDetail : getProjectDetail,
			ownProject : ownProject,
			shareProject : shareProject,
			transferProject : transferProject,
			quitProject :  quitProject,
			cloneProject : cloneProject,
			stopUpload : stopUpload,
			mergeFileRequest : mergeFileRequest,
			getProjectFounder : getProjectFounder,
			getIntentionInvest : getIntentionInvest,
			getSharedUser : getSharedUser
		};
		function addProject(data) {
			return $http.post(address+'/project/addProject.do',data);
		}

		function addProjectFile(projectId,description,file) {
			return Upload.upload({
				'url': address+'/file/addProjectFile.do',
				'resumeSizeUrl': null,
				'resumeChunkSize': null,
				'data' : {
					'projectId' : projectId,
					'description' : description
				},
				'file' : file
			});
		}

		function addProjectFile2(file) {
			return Upload.upload({
				'url': address+'/file/uploadProjectFileChunk.do',
				'resumeSizeUrl': address+'/file/uploadProjectFileChunk.do?token='+$localStorage.token,
				'resumeChunkSize': globalchunksize,
				'data' : {
				},
				'file' : file
			});
		}

		function mergeFileRequest(projectId, file) {
			return $http.post(address+'/file/uploadProjectFileCompleted.do',{
				'projectId':projectId,
				'description':file.description,
				'fileName':file.file.name
			});
		}

		function stopUpload() {
			return $http.post(address+'/file/stopUpload.do',{
				'target':'all'
			});
		}

		function searchPublicProject(pageNumber,pageSize,name,areaId,categoryId,roundId) {
			return $http.post(address+'/project/searchPublicProject.do',{
				'pageNumber' :  pageNumber,
				'pageSize' :  pageSize,
				'name' : name,
				'areaId' : areaId,
				'categoryId' : categoryId,
				'roundId' : roundId
			});
		}
		function searchPrivateProject(pageNumber,pageSize,name,areaId,categoryId,roundId,status) {
			return $http.post(address+'/project/searchPrivateProject.do',{
				'pageNumber' : pageNumber,
				'pageSize' :  pageSize,
				'name' : name,
				'areaId' : areaId,
				'categoryId' : categoryId,
				'roundId' : roundId,
				'status' : status
			});
		}
		function searchProject(pageNumber,pageSize,name,areaId,categoryId,roundId,status) {
			return $http.post(address+'/project/searchProject.do',{
				'pageNumber' : pageNumber,
				'pageSize' : pageSize,
				'name' : name,
				'areaId' : areaId,
				'categoryId' : categoryId,
				'roundId' : roundId,
				'status' : status
			});
		}

		function getProjectDetail(projectId) {
			return $http.post(address+'/project/getDetail.do',{
				'projectId' : projectId
			});
		}

		function ownProject(projectId) {
			return $http.post(address+'/user/ownProject.do',{
				'projectId' : projectId
			});
		}

		function shareProject(projectId, sharedUserId) {
			return $http.post(address+'/user/shareProject.do',{
				'projectId' : projectId,
				'sharedUserId' : sharedUserId
			});
		}

		function transferProject(projectId, transferUserId) {
			return $http.post(address+'/user/transferProject.do',{
				'projectId' : projectId,
				'transferUserId' : transferUserId
			});
		}

		function quitProject(data) {
			return $http.post(address+'/invest/quit.do',data);
		}

		function cloneProject(projectId) {
			return $http.post(address+'/project/copyProject.do',{
				'projectId' : projectId
			});
		}

		function getProjectFounder(projectId) {
			return $http.post(address+'/people/getProjectFounder.do',{
				'projectId' : projectId
			});
		}

		function getIntentionInvest(projectId) {
			return $http.post(address+'/invest/getIntentionInvest.do', {
				'projectId' : projectId
			});
		}

		function getSharedUser(projectId) {
			return $http.post(address+'/project/getSharedUser.do',{
				'projectId' : projectId
			});
		}

	}