/**
 * Created by jiangyongwei on 2016/7/20.
 */
'use strict';

angular
    .module('shady')
    .controller('funddetailController', funddetailController);
    funddetailController.$inject = ['fundmanagerService','$localStorage','$timeout','$stateParams'];
    function funddetailController (fundmanagerService,$localStorage,$timeout,$stateParams) {
        /* jshint validthis: true */
        var vm=this;
        vm.detail = detail; 
        vm.show1 = show1;
        vm.show2 = show2;
        vm.show3 = show3;
        vm.show4 = show4;
        vm.deactive = deactive;
        vm.doactive = doactive;
        vm.loaddetail = loaddetail;
        vm.loadpeople = loadpeople;
        vm.loadfile = loadfile;
        vm.search = search;
        vm.updatesave = updatesave;

        vm.loadfile1 = loadfile1;
        vm.loadfile2 = loadfile2;
        vm.loadfile3 = loadfile3;
        vm.uploadregulationFile2 = uploadregulationFile2;
        vm.uploadbusinessFile2 = uploadbusinessFile2;
        vm.uploadrecordFile2 = uploadrecordFile2;

        vm.regulationFile = {fileType:1,progress:-1};
        vm.businessFile = {fileType:2,progress:-1};
        vm.recordFile = {fileType:3,progress:-1};
        vm.index = 0;
        vm.pageSize = 5;
        vm.pageNumber = 1;
        vm.readonly = true;
        vm.isAdmin = $localStorage.isAdmin;
        vm.active = $stateParams.fundId;

        vm.detail();
        function show1 () {
            vm.index = 0;
        }
        function show2 (){
            vm.index = 1;
        }
        function show3 (){
            vm.index = 2;
        }
        function show4 (){
            vm.index = 3;
        }
        function detail () {
            vm.loaddetail();
            vm.loadpeople();
            vm.loadfile();
            vm.search();
        }

        function deactive () {
            fundmanagerService.deactiveFund(vm.active, vm.comment)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.comment = "";
                    vm.loaddetail();
                    alert("冻结成功！");
                }
            })
            .error(function (error) {
                vm.comment = "";
            });
        }

        function doactive () {
            fundmanagerService.activeFund(vm.active, vm.comment)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.comment = "";
                    vm.loaddetail();
                    alert("解冻成功！");
                }
            })
            .error(function (error) {
                vm.comment = "";
            });
        }

        function loaddetail() {
            fundmanagerService.getFundDetail(vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.current = data.result;
                }
            })
            .error(function(error) {
            });               
        }

        function loadpeople () {
            fundmanagerService.getFundLp(vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.lplist = data.result.lp;
                } else if (data.retCode === -1) {
                    vm.lplist = [];
                }
            })
            .error(function(error) {
                vm.lplist = [];
            });

            fundmanagerService.getFundGp(vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.gplist = data.result.gp;
                } else if (data.retCode === -1) {
                    vm.gplist = [];
                }
            })
            .error(function(error) {
                vm.gplist = [];
            });
        }

        function search () {
            fundmanagerService.getFundProject(vm.pageNumber,vm.pageSize,vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    if (data.result.total > 0) {
                        vm.projectList = data.result.list;
                        vm.total = data.result.total;
                    }
                    else {
                        vm.projectList = [];
                        vm.total = 0;
                    }
                }
                else {
                    vm.projectList = [];
                }
            })
            .error(function (error) {
                vm.projectList = [];
            });
        }

        function updatesave(params) {
            fundmanagerService.editFund(params)
                .success(function(data) {
                    if (data.retCode === 1) {
                        vm.readonly = true;
                        alert("保存成功！");
                    }
                })
                .error(function(error) {
                });
        }


        function loadfile () {
            vm.loadfile1();
            vm.loadfile2();
            vm.loadfile3();
        }

        function loadfile1() {
            fundmanagerService.getFundFile(vm.active,1)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.filelist1 = data.result;
                } else if (data.retCode === -1) {
                    vm.filelist1 = [];
                }
            })
            .error(function (error) {
                vm.filelist1 = [];
            });
        }

        function loadfile2() {
            fundmanagerService.getFundFile(vm.active,2)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.filelist2 = data.result;
                } else if (data.retCode === -1) {
                    vm.filelist2 = [];
                }
            })
            .error(function (error) {
                vm.filelist2 = [];
            });     
        }

        function loadfile3() {
            fundmanagerService.getFundFile(vm.active,3)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.filelist3 = data.result;
                } else if (data.retCode === -1) {
                    vm.filelist3 = [];
                }
            })
            .error(function (error) {
                vm.filelist3 = [];
            });            
        }

        function uploadregulationFile2() {
            fundmanagerService.uploadRegulationFile(vm.regulationFile)
            .then(function(response) {
                console.log("正在合并文件");
                fundmanagerService.mergeFileRequest(vm.active, vm.regulationFile)
                .then(function(response){
                    if(response.data){
                        if(response.data.retCode == 1){
                            vm.regulationFile.result = response.data;
                            console.log("合并完成");
                        }else if(response.data.retCode == -1){
                            console.log("合并失败");
                        }
                    }
                    $timeout(function() {
                        vm.regulationFile.result = null;
                        vm.regulationFile = {fileType:1,progress:-1};
                    },1000);
                    vm.loadfile1();
                });

            },function (response) {
            },function (evt) {
                vm.regulationFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        function uploadbusinessFile2() {
            fundmanagerService.uploadBusinessFile(vm.businessFile)
            .then(function(response) {
                console.log("正在合并文件");
                fundmanagerService.mergeFileRequest(vm.active, vm.businessFile)
                .then(function(response){
                    if(response.data){
                        if(response.data.retCode == 1){
                            vm.businessFile.result = response.data;
                            console.log("合并完成");
                        }else if(response.data.retCode == -1){
                            console.log("合并失败");
                        }
                    }
                    $timeout(function() {
                        vm.businessFile.result = null;
                        vm.businessFile = {fileType:2,progress:-1};
                    },1000);
                    vm.loadfile2();
                });             
            },function (response) {
            },function (evt) {
                vm.businessFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        function uploadrecordFile2() {
            fundmanagerService.uploadRecordFile(vm.recordFile)
            .then(function(response) {
                console.log("正在合并文件");
                fundmanagerService.mergeFileRequest(vm.active, vm.recordFile)
                .then(function(response){
                    if(response.data){
                        if(response.data.retCode == 1){
                            vm.recordFile.result = response.data;
                            console.log("合并完成");
                        }else if(response.data.retCode == -1){
                            console.log("合并失败");
                        }
                    }
                    $timeout(function() {
                        vm.recordFile.result = null;
                        vm.recordFile = {fileType:3,progress:-1};
                    },1000);
                    vm.loadfile3();
                });     

            },function (response) {
            },function (evt) {
                vm.recordFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }


    }