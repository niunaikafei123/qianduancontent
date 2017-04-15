'use strict';

angular.module('shady')
	.controller('addActionController',addActionController);
	addActionController.$inject = ['$stateParams','privateService','$state','$timeout'];
	function addActionController($stateParams,privateService,$state,$timeout) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.addAction = addAction;
		vm.uploadActionFile = uploadActionFile;
		vm.stopUpload = stopUpload;
		vm.newaction = {};
		function addAction(params) {
			if(vm.progress > 0){
				vm.uploadActionFile();
			}else{
				vm.stopUpload();
				params.projectId = vm.projectId;
				privateService.addAction(vm.projectId,params.title,params.content)
				.success(function(data) {
					vm.newaction.actionId = data.result.actionId;
					if (data.retCode === 1) {
						if(!vm.newaction.file){
							$timeout(function(){
								$state.go('main.privateprojectdetail',{'projectId': vm.projectId});
							},1000);
						}else{
							vm.uploadActionFile();
						}
						
					}
				})
				.error(function(error) {

				});
			}			
		}
		
		function uploadActionFile() {
			if(!vm.newaction.actionId){
				alert("创建action时出错，请刷新页面");
			}
			privateService.uploadActionFile(vm.newaction.file)
			.then(function(response){
				privateService.mergeFileRequest(vm.newaction.actionId,vm.newaction.file)
				.success(function(data) {
					if (data.retCode === 1) {
						$timeout(function(){
							$state.go('main.privateprojectdetail',{'projectId': vm.projectId});
						},1000);
					}
				})
				.error(function(error) {

				});
			},function(resoponse) {

			},function(evt) {
				vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function stopUpload() {
			privateService.stopUpload()
			.success(function(data){
				if(data.retCode===1){
					vm.progress = -1;
					return true;
				}
				return false;			
			})
			.error(function(error){
				return false;
			});
		}
	}