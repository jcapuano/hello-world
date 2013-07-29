(function() {
    'use strict';

    var peControllers;
    try {
        peControllers = angular.module('peControllers');
    }
    catch(e) {
        peControllers = angular.module('peControllers', ['cai.services']);
    };

    /* Controllers */
    peControllers.controller('MainController', function($scope, $log, /*apiProvider, */user) {
        $log.log('Loading web main controller');
        $scope.message = 'Hello Citizens of the World!';
        $scope.user = user.data;
		/*
        apiProvider.callFunction('getCitizens')
            .then(function(result) {
                $scope.countries = result ? result.result : [];
            }, function(err) {
               $log.error(err);
            });
		*/
    });
})();


