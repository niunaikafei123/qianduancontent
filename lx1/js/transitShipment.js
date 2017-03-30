(function () {
    'use strict';
    // controller之间的中转

    angular
        .module('app')
        .factory('transitShipment', transitShipment);

    transitShipment.$inject = ['$http'];

    function transitShipment($http) {

        var dataObj = {};

        var service = {
            // 添加属性
            setData: setData,
            // 获取属性，判断是不是要删除
            getData: getData,
            // 删除属性
            clearData: clearData,
            // 重置
            reset: reset,
        };
        return service;

        // 添加属性
        function setData(dataName, data) {
            dataObj[dataName] = data;
        }

        // 获取属性，判断是不是要删除
        function getData(dataName, isRemove) {
            var data = (function (dataName) {
                return dataObj[dataName]
            })(dataName);
            if ((typeof isRemove == 'boolean') && isRemove) {
                dataObj[dataName] = null;
                delete dataObj[dataName];
            }
            return data;
        }

        // 删除属性
        function clearData(dataName) {
            dataObj[dataName] = null;
            delete dataObj[dataName];
        }

        // 重置
        function reset() {
            dataObj = {};
        }
    }
})();