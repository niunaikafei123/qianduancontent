/**
 * Created by jiangyongwei on 2016/7/20.
 */
'use strict';

angular
    .module('shady')
    .controller('fundlistController', fundlistController);
    fundlistController.$inject = ['fundmanagerService','$localStorage','$timeout','$filter'];
    function fundlistController (fundmanagerService,$localStorage,$timeout,$filter) {
        /* jshint validthis: true */
        var vm=this;
        vm.pageSize = 5;
        vm.newsearch = newsearch;
        vm.search = search;
        vm.keyup = keyup;
        vm.moneyTypelist = [{typeId:-1,typeName:'所有'},{typeId:0,typeName:'美元'},{typeId:1,typeName:'人民币'}];
        vm.moneyType = -1;
        vm.isAdmin = $localStorage.isAdmin;
        vm.datelist = [{dateId:0,dateName:'不限'}];
        var nowyear = new Date().getFullYear();
        for (var i=0;i<6;i++) {
            vm.datelist.push({dateId:i+1,dateName:nowyear-i});
        }
        vm.datelist.push({dateId:i+1,dateName:nowyear-i+'以前'});
        vm.startDate = 0;
        vm.newsearch();

        function newsearch() {
        	vm.pageNumber = 1;
        	vm.search();
        }

        function search() {
            if (vm.starttime) {
                vm.startDate = $filter('date')(vm.starttime,'yyyy-MM-dd');
            }
        	fundmanagerService.searchFundInfo(vm.pageNumber,vm.pageSize,vm.fundName,vm.startDate,vm.moneyType)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.fundlist = data.result.list;
                    vm.total = data.result.total;
                }
                else {
                    vm.fundlist = [];
                    vm.total = 0;
                }
            })
            .error(function(error) {
                vm.fundlist = [];
                vm.total = 0;
            });
        }
        function keyup(event) {
            if(event.keyCode === 13) {
                vm.newsearch();
            }
        }
    }