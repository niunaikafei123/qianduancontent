'use strict';

angular.module('shady')
	.factory('dashboardService',dashboardService)
	.directive('fileList',fileList)
	.directive('commentList',commentList);
	dashboardService.$inject = ['$http','address','$localStorage'];
	function dashboardService($http,address,$localStorage){
		return {
			getTrackProject : getTrackProject,
			getComment : getComment,
			addComment : addComment,
			getWorkforceInfo : getWorkforceInfo,
			projectStatusStatistics : projectStatusStatistics,
			getProjectFile : getProjectFile
		};
		function getTrackProject (pageNumber,pageSize) {
			return $http.post(address+'/project/getTrackProject.do', {
				'pageNumber': pageNumber,
				'pageSize': pageSize
			});
		}
		function getComment (pageNumber, pageSize, projectId) {
			return $http.post(address+'/project/getComment.do', {
				'pageNumber': pageNumber,
				'pageSize': pageSize,
				'projectId': projectId
			});
		}
		function addComment (projectId, content) {
			return $http.post(address+'/project/addComment.do', {
				'projectId': projectId,
				'content': content
			});
		}
		function getWorkforceInfo () {
			return $http.post(address+'/user/getWorkforceInfo2.do', {
			});
		}
		function projectStatusStatistics () {
			return $http.post(address+'/project/projectStatusStatistics.do', {
			});
		}
		function getProjectFile(projectId,pageSize,pageNumber) {
			return $http.post(address+'/file/getProjectFile.do', {
				'projectId' : projectId,
				'pageSize':pageSize,
				'pageNumber':pageNumber
			});
		}
	}

	fileList.$inject = ['dashboardService','projectService','$timeout'];
	function fileList(dashboardService,projectService,$timeout) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				pid:'@'
			},
			/*jshint multistr: true */
			template: '\
				<div class="files">\
					<a title="文件列表" ng-click="mytaggle()" ng-class="{\'a11\':showfile==true,\'a1\':showfile==false}"></a>\
					<div class="fujian" ng-show="showfile">\
						<span class="shanjiao"></span>\
						<span class="zsj"></span>\
						<div class="guanbi" ng-click="close()"></div>\
						<p class="ptitle">文件列表</p>\
						<table class="table table-border">\
							<thead>\
								<tr>\
									<th>文件名</th>\
									<th>描述</th>\
									<th>上传日期</th>\
								</tr>\
							</thead>\
							<tbody>\
								<tr ng-repeat="item in list">\
									<td><a href="{{ item.projectFileId | projFileUrl }}">{{ item.name }}</a></td>\
									<td>{{ item.description}}</td>\
									<td>{{ item.timeAdded}}</td>\
								</tr>\
							</tbody>\
						</table>\
						<div class="tgc">\
							<span>\
								<uib-pagination total-items="total" ng-model="pageNumber" \
									items-per-page="pageSize" max-size="7"  boundary-link-numbers="true" \
									ng-change="fetchProjectFile()" previous-text="上一页" \
									next-text="下一页"></uib-pagination>\
							</span>\
						</div>\
					</div>\
				</div>',
			link: function (scope,elem,attrs) {	
				scope.pageNumber=1;
				scope.pageSize=5;
				scope.newfile = {};
				scope.progress = -1;
				scope.showfile=false;
				scope.close = function() {
					scope.showfile=false;
				};
				scope.mytaggle = function() {
					scope.showfile = !scope.showfile;
					if (scope.showfile) {
						scope.fetchProjectFile(scope.pid);
					}
					else {
						scope.list = [];
					}
				};
				scope.fetchProjectFile = function () {
            		dashboardService.getProjectFile(scope.pid,scope.pageSize,scope.pageNumber)
            		.success(function (data) {
            			if (data.retCode === 1) {
							scope.list =data.result.list;
							scope.total = data.result.total;
            			}
						else if(data.retCode === -1) {
							scope.list = [];
						}
					})
            		.error(function (error) {
            			console.log("error file list");
            		});
            	};
			}
		};
	}

	commentList.$inject = ['dashboardService'];
	function commentList(dashboardService) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				pid:'@'
			},
			/*jshint multistr: true */
			template: '\
				<div class="comment-sys down-bord">\
					<div class="pinglun">\
						<div class="con-bottom">\
							<file-list pid="{{ item.projectId }}"></file-list>\
						</div>\
						<div >\
							<p class="ptitle">评论</p>\
							<table class="table table-border" ng-show="showComment">\
								<thead>\
									<tr>\
										<th>评论内容</th>\
										<th>评论人</th>\
										<th>评论时间</th>\
									</tr>\
								</thead>\
								<tbody>\
									<tr ng-repeat="item in list">\
										<td>{{ item.content }}</td>\
										<td>{{ item.realName }}</td>\
										<td>{{ item.timeAdded }}</td>\
									</tr>\
								</tbody>\
							</table>\
							<div class="tgc" ng-show="showComment">\
									<span>\
										<uib-pagination total-items="total" boundary-links="true" previous-text="&lsaquo;" \
											next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"\
											ng-model="pageNumber" items-per-page="pageSize" max-size="7" class="pagination-sm" \
											boundary-link-numbers="true" ng-change="fetchComment()" previous-text="上一页" \
											next-text="下一页"></uib-pagination>\
									</span>\
							</div>\
							<div ng-show="!showComment" class="no-comment">暂无评论</div>\
							<form name="CommentForm" ng-submit="doAdd()">\
								<div class="add-comment">\
									<textarea class="form-control" ng-model="content" placeholder="请填写评论!" rows="2" required name="content"></textarea>\
								</div>\
								<button class="btn1 bgc-ju btnok">评论</button>\
							</form>\
						</div>\
					</div>\
				</div>',
            link: function(scope,elem,attrs) {
            	scope.pageNumber = 1;
            	scope.pageSize = 5;
            	scope.doAdd = function () {
            		dashboardService.addComment(scope.pid,scope.content)
            		.success(function(data) {
            			if (data.retCode === 1) {
            				scope.fetchComment();
            			}
            		})
            		.error(function(error) {
						console.log("error add comment");
            		});
            	};
            	scope.fetchComment = function () {
            		dashboardService.getComment(scope.pageNumber,scope.pageSize,scope.pid)
            		.success(function (data) {
            			if (data.retCode === 1) {
            				if (data.result.total === 0) {
            					scope.showComment = false;
            					scope.total = 0;
            					scope.list = [];
            				}
            				else {
            					scope.showComment = true;
            					scope.total = data.result.total;
            					scope.list = data.result.list;
            				}
            			}
            			scope.content = '';
            		})
            		.error(function (error) {
            			scope.showComment = false;
            			scope.total = 0;
            			scope.list = [];
            		});
            	};
				scope.fetchComment();
            }
		};
	}



