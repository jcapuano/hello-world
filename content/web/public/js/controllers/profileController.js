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
    peControllers.controller('ProfileController', function($scope, $log, user) {
        $log.log('Loading web profile controller');
        $scope.user = user.data;
    });
})();