'use strict';

angular
	.module('shady')
    .factory('errorService',errorService)
    .controller('ModalErrorCtrl', ModalErrorCtrl)
	.factory('timeoutHttpIntercept',timeoutHttpIntercept)
	.factory('interceptor',interceptor)
	.factory('constantService',constantService)
	.filter('statusdesc',statusdesc)
    .filter('activedesc',activedesc)
    .filter('admindesc',admindesc)
    .filter('moneyTypedesc',moneyTypedesc)
    .filter('percentage',percentage)
    .filter('moneydesc',moneydesc)
    .filter('moneydescwithoutunit',moneydescwithoutunit)
	.filter('fundFileUrl',fundFileUrl)
	.filter('projFileUrl',projFileUrl)
	.filter('actionFileUrl',actionFileUrl);
    errorService.$inject = ['$uibModal'];
    function errorService($uibModal) {
        return {
            errorModal : errorModal
        };
        function errorModal (errorMsg) {
            return  $uibModal.open({
                        animation: true,
                        templateUrl: 'tpl/frame/error.html',
                        controller: 'ModalErrorCtrl',
                        size: 'sm',
                        resolve: {
                            errorInfo: function () {
                              return errorMsg;
                            }
                        }
                    });
        }
    }
    ModalErrorCtrl.$inject = ['$scope','$uibModalInstance','$log','errorInfo'];
    function ModalErrorCtrl ($scope,$uibModalInstance,$log,errorInfo) {
        $scope.errorInfo=errorInfo;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

	timeoutHttpIntercept.$inject = ['globaltimeout'];
	function timeoutHttpIntercept(globaltimeout) {
		return {
			'request': function(config) {
				if(!config.timeout) {
					config.timeout = globaltimeout;
				}
				return config;
			}
		};
	}

    interceptor.$inject = ['$rootScope','$localStorage','address'];
    function interceptor($rootScope,$localStorage,address) {
    	return {
	        request: function (req) {
                if (req.url.indexOf(address) > -1) {
                    if(!req.data){
                        req.data={};
                    }                      
                    req.data.token = $localStorage.token;
                }
	            return req;
	        },
	        response: function (resp) {
	        	if(resp.config.method=="POST"){
	        		if (resp.data && resp.data.retCode === 401) {
	        			$rootScope.$emit('userIntercepted','notLogin');
	        		}
                    if (resp.data && resp.data.retCode === 403) {
                        $rootScope.$emit('userIntercepted','notAdmin');
                    }
	        	}
	            return resp;
	        }
		};
    }

    constantService.$inject = ['$http','address'];
    function constantService($http,address) {
    	return {
    		getArea : getArea,
    		getCategory : getCategory,
    		getRound : getRound
    	};
    	function getArea() {
    		return $http.post(address+'/constant/getArea.do',{});
    	}
    	function getCategory() {
    		return $http.post(address+'/constant/getCategory.do',{});
    	}
    	function getRound(roundId) {
    		return $http.post(address+'/constant/getRound.do',{
                'roundId': roundId
            });
    	}
    }

    statusdesc.$inject = [];
    function statusdesc() {
    	return function(status) {
    		if (status === 1) return "新建";
    		if (status === 2) return "跟进";
    		if (status === 3) return "已投";
    		if (status === 4) return "退出";
    		if (status === 5) return "放弃";
    	};
    }

    activedesc.$inject = [];
    function activedesc() {
        return function(isActive) {
            if (isActive === 0) return "冻结";
            else if (isActive === 1) return "激活";
            else return "未知状态";
        };
    }
    admindesc.$inject = [];
    function admindesc() {
        return function(isAdmin) {
            if (isAdmin === 0 ) return "非管理员";
            else if (isAdmin === 1) return "管理员";
            else return "未知角色";
        };
    }

    moneyTypedesc.$inject = [];
    function moneyTypedesc() {
        return function(type) {
            if (type===1) return "人民币";
            else if(type===0) return "美元";
        };
    }

    percentage.$inject = [];
    function percentage() {
        return function(number) {
            var newnum = number * 100;
            return newnum + '%';
        };
    }

    moneydesc.$inject = ['$filter'];
    function moneydesc($filter) {
        return function(money) {
            var newmoney = $filter('number')(money / 10000,2); 
            return newmoney + '万';
        };
    }

    moneydescwithoutunit.$inject = ['$filter'];
    function moneydescwithoutunit($filter) {
        return function(money) {
            var newmoney = $filter('number')(money /10000,2);
            return newmoney;
        };
    }

	fundFileUrl.$inject = ['address','$localStorage'];
	function fundFileUrl(address, $localStorage){
		return function(fundFileId){
			var url=address+"/file/getFundFilebyId.do?fileId="+fundFileId+"&token="+$localStorage.token;
			return url;
		};
	}

	projFileUrl.$inject = ['address','$localStorage'];
	function projFileUrl(address, $localStorage){
		return function(projFileId){
			var url=address+"/file/getProjectFilebyId.do?fileId="+projFileId+"&token="+$localStorage.token;
			return url;
		};
	}

	actionFileUrl.$inject = ['address','$localStorage'];
	function actionFileUrl(address,$localStorage){
		return function(actionId){
			var url = address+"/file/getActionFilebyId.do?actionId="+actionId+"&token="+$localStorage.token;
			return url;
		};
	}



