'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
	.controller('MainController', function($scope, $log) {
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
	});



