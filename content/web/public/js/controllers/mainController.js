'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
	.controller('MainController', function($scope, $log, apiProvider) {
		$log.log('Loading web main controller');
		$scope.message = 'Hello Citizens of the World!';
        apiProvider.callFunction('getCitizens')
            .then(function(result) {
                $scope.countries = result ? result.result : [];
            }, function(err) {
               $log.error(err);
            });
	});



