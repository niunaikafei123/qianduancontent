'use strict';

angular
	.module('shady',['ui.router','angular-echarts','ui.bootstrap','ngStorage','ngFileUpload','ngLocale'])
	.config(httpConfig)
	.run(runConfig)
	.constant('address','http://42.96.147.41:8080/shady')
    .constant('globaltimeout', 3000)
    .constant('globalchunksize', 102400)
    .constant('constantpie', {
        itemStyle: {
            normal: {
                label:{position:'outer',
                    show: true,
                    formatter:function (item) {
                        return  item.name + '\n' +item.percent+'%';
                    }
                },
                labelLine:{show:true}
            }
        }
    });

	httpConfig.$inject = ['$httpProvider'];
	function httpConfig($httpProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        /* Override $http service's default transformRequest */
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
        $httpProvider.interceptors.push('interceptor');
        $httpProvider.interceptors.push('timeoutHttpIntercept');
	}

	runConfig.$inject = ['$rootScope','$localStorage','$state','errorService'];
	function runConfig($rootScope,$localStorage,$state,errorService) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
            $rootScope.info = toState.info;
        });

        $rootScope.$on("userIntercepted",function(obj,type) {
            if (type=='notLogin') {
                delete $localStorage.login;
                delete $localStorage.isAdmin;
                delete $localStorage.token;
                delete $localStorage.username;
                delete $localStorage.realName;
                $state.go("login");
            }
            else if (type=="notAdmin"){
                $localStorage.isAdmin = 0;
                errorService.errorModal("非管理员禁用该功能");
            }
        });

        $rootScope.logout = logout;
        function logout() {
            delete $localStorage.login;
            delete $localStorage.isAdmin;
            delete $localStorage.token;
            delete $localStorage.username;
            delete $localStorage.realName;
            $state.go("login");
        }
	}