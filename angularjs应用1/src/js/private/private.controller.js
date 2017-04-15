'use strict';

angular.module('shady')
    .controller('privateController', privateController)
    .directive('projectList', projectList);
privateController.$inject = ['projectService', 'constantService'];
function privateController(projectService, constantService) {
    /* jshint validthis: true */
    var vm = this;
    vm.pageSize = 5;
    vm.statuslist = [
        {id: 0, desc: '所有'},
        {id: 2, desc: '跟进'},
        {id: 3, desc: '已投'},
        {id: 4, desc: '退出'},
        {id: 5, desc: '放弃'}
    ];
    vm.status = 0;
    vm.newsearch = newsearch;
    vm.search = search;
    vm.keyup = keyup;
    vm.show1 = show1;
    vm.show2 = show2;
    vm.show3 = show3;
    vm.show4 = show4;
    vm.index = 0;
    vm.areaId = 0;
    vm.categoryId = 0;
    vm.roundId = 0;
    function show1 () {
        vm.index = 0;
    }
    function show2(){
        vm.index = 1;
    }
    function show3(){
        vm.index = 2;
    }
    function show4(){
        vm.index = 3;
    }
    constantService.getArea()
    .success(function (data) {
        if (data.retCode === 1) {
            vm.arealist = data.result;
            vm.arealist.unshift({areaId: 0, areaName: '所有'});
        }
        else {
            vm.arealist = [];
            vm.areaId = null;
        }
    })
    .error(function (error) {
        vm.arealist = [];
        vm.areaId = null;
    });

    constantService.getCategory()
    .success(function (data) {
        if (data.retCode === 1) {
            vm.categorylist = data.result;
            vm.categorylist.unshift({categoryId: 0, categoryName: '所有'});
        }
        else {
            vm.categorylist = [];
            vm.categoryId = null;
        }
    })
    .error(function (error) {
        vm.categorylist = [];
        vm.categoryId = null;
    });

    constantService.getRound(1)
    .success(function (data) {
        if (data.retCode === 1) {
            vm.roundlist = data.result;
            vm.roundlist.unshift({roundId: 0, roundName: '所有'});
        }
        else {
            vm.roundlist = [];
            vm.roundId = null;
        }
    })
    .error(function (error) {
        vm.roundlist = [];
        vm.roundId = null;
    });

    vm.newsearch();

    function newsearch() {
        vm.pageNumber = 1;
        vm.search();
    }

    function search() {
        projectService.searchPrivateProject(vm.pageNumber, vm.pageSize, vm.projectName,
            vm.areaId, vm.categoryId, vm.roundId, vm.status)
        .success(function (data) {
            if (data.retCode === 1) {
                vm.projectList = data.result.list;
                vm.total = data.result.total;
            }
            else {
                vm.projectList = [];
                vm.total = 0;
            }
        })
        .error(function (error) {
            vm.projectList = [];
            vm.total = 0;
        });
    }

    function keyup(event) {
        if(event.keyCode === 13) {
            vm.newsearch();
        }
    }
}


projectList.$inject = ['projectService'];
function projectList(projectService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title: '@',
            status: '@'
        },
        /*jshint multistr: true */
        template: '\
				<div>\
			        <div class="project-followbox">\
			        	<table  class="table table-border">\
			                <thead>\
	                            <tr>\
		                            <th>项目编号</th>\
		                            <th>项目名称</th>\
		                            <th>所属行业</th>\
		                            <th>地域</th>\
		                            <th>当前轮次</th>\
		                            <th>备注</th>\
		                        </tr>\
		                    </thead>\
		                    <tbody>\
		                        <tr ng-repeat="project in projectList">\
			                	    <td>{{ project.projectId }}</td>\
			                	    <td>{{ project.projectName }}</td>\
			                	    <td>{{ project.categoryName }}</td>\
			                	    <td>{{ project.areaName }}</td>\
			                	    <td>{{ project.roundName }}</td>\
			                	    <td><button ui-sref="main.privateprojectdetail({\'projectId\': project.projectId})" class="btn1 bgc-lv">详情</bu></td>\
			                    </tr>\
			                </tbody>\
		                    </table>\
			        </div>\
			        <div class="tgr">\
			            <span>\
			                <uib-pagination class="pagination-sm" total-items="total" ng-model="pageNumber" items-per-page="pageSize" max-size="7"  boundary-link-numbers="true" ng-change="search()" previous-text="&laquo;" next-text="&raquo;"></uib-pagination>\
			            </span>\
			        </div>\
		        <div>',
        link: function (scope, elem, attrs) {
            scope.pageNumber = 1;
            scope.pageSize = 5;
            scope.search = function () {
                projectService.searchPrivateProject(scope.pageNumber, scope.pageSize, null, 0, 0, 0, scope.status)
                    .success(function (data) {
                        if (data.retCode === 1) {
                            scope.total = data.result.total;
                            scope.projectList = data.result.list;
                        }
                        else {
                            scope.projectList = [];
                            scope.total = 0;
                        }
                    })
                    .error(function (error) {
                        scope.projectList = [];
                        scope.total = 0;
                    });
            };
            scope.search();
        }
    };
}
























