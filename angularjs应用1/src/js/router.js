'use strict';

angular
	.module('shady')
	.config(config);
	config.$inject = ['$stateProvider','$urlRouterProvider'];
	function config($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.when('','/');
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('login',{
			url:'/',
			templateUrl:'tpl/login/login.html'
		})
		.state('main',{
			abstract: true,
			url: '',
			cache: 'false',
			views: {
				'': {
					templateUrl: 'tpl/frame/main.html'
				},
				'sidebar@main': {
					templateUrl: 'tpl/frame/sidebar.html'
				},
				'top@main': {
					templateUrl: 'tpl/frame/top.html'
				}
			}
		})
			.state('main.dashboard', {
				url: '/dashboard',
				info: {cn:"首页",en:"Dashboard"},
				templateUrl: 'tpl/dashboard/dashboard.html'
			})
			.state('main.fundlist', {
				url: '/fundlist',
				info: {cn:"基金管理",en:"Fund Management"},
				templateUrl: 'tpl/fundmanage/fundlist.html'
			})
			.state('main.funddetail',{
				url:'/fundlist/:fundId',
				info: {cn:"基金详情",en:"Detail of Fund"},
				templateUrl: 'tpl/fundmanage/funddetail.html'
			})
			.state('main.addfund', {
				url: '/addfund',
				info: {cn:"添加基金",en:"Add Fund"},
				templateUrl: 'tpl/fundmanage/addfund.html'
			})

			.state('main.publicproject',{
				url: '/publicproject',
				info: {cn:"公海项目",en:"Public Projects"},
				templateUrl: 'tpl/public/publicproject.html'
			})
			.state('main.addproject',{
				url: '/addproject',
				info: {cn:"添加项目",en:"Add Project"},
				templateUrl: 'tpl/public/addproject.html'
			})
			.state('main.publicprojectdetail',{
				url: '/publicproject/:projectId',
				info: {cn:"公海项目详情",en:"Detail of Public Project"},
				templateUrl: 'tpl/public/publicprojectdetail.html'
			})

			.state('main.privateproject',{
				url: '/privateproject',
				info: {cn:"私海项目",en:"Private Projects"},
				templateUrl: 'tpl/private/privateproject.html'
			})
			.state('main.privateprojectdetail',{
				url: '/privateproject/:projectId',
				info: {cn:"私海项目详情",en:"Detail of Private Project"},
				templateUrl: 'tpl/private/privateprojectdetail.html'
			})

			.state('main.addinvest',{
				url: '/addinvest/:projectId/:roundId',
				info: {cn:"投资",en:"Invest"},
				templateUrl: 'tpl/private/addinvest.html'
			})
			.state('main.addaction',{
				url: '/addinvest/:projectId',
				info: {cn:"添加活动",en:"Add Action"},
				templateUrl: 'tpl/private/addaction.html'
			})
			.state('main.transfer',{
				url: '/transfer/:projectId',
				info: {cn:"转让项目",en:"Transfer Project"},
				templateUrl: 'tpl/private/transfer.html'
			})
			.state('main.share',{
				url: '/share/:projectId',
				info: {cn:"分享项目",en:"Share Project"},
				templateUrl: 'tpl/private/share.html'
			})
			.state('main.quit',{
				url: '/quit/:projectId',
				info: {cn:"退出项目",en:"Quit Project"},
				templateUrl: 'tpl/private/quit.html'
			})

			.state('main.projectmanager',{
				url: '/projectmanager',
				info: {cn:"项目管理",en:"Project Management"},
				templateUrl: 'tpl/projectmanage/projectmanager.html'
			})
			.state('main.projectdetail',{
				url: '/projectdetail/:projectId',
				info: {cn:"项目详情",en:"Detail of Project"},
				templateUrl: 'tpl/projectmanage/projectdetail.html'
			})
			.state('main.dataanalysis',{
				url: '/dataanalysis',
				info: {cn:"数据分析",en:"Data Analysis"},
				templateUrl: 'tpl/dataanalysis/dataanalysis.html'
			})
			.state('main.usermanage', {
				url: '/usermanage',
				info: {cn:"用户管理",en:"User Management"},
				templateUrl: 'tpl/usermanage/manageuser.html'
			})
			.state('main.myaccount', {
				url: '/myaccount',
				info: {cn:"个人用户",en:"My Account"},
				templateUrl: 'tpl/usermanage/myaccount.html'
			})
			;
	}