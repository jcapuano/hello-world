'use strict';

var caiServices;
try {
    caiServices = angular.module('cai.services');
}
catch(e) {
    caiServices = angular.module('cai.services', []);
};
caiServices
    .factory('apiProvider', function($q,$rootScope) {
        var scope = $rootScope.$new();
        var deferred = $q.defer();
        var promise = deferred.promise;
        var stub = sinon.stub();
        stub.returns(promise);
        var service = {
            resolvePromise : function (data){
                scope.$apply(function(){deferred.resolve({result: data})})
            },
            rejectPromise : function (data){
                scope.$apply(function(){deferred.reject({result: {
                        errorNum : data.errorNum || 1,
                        errorMsg : data.errorMsg || 'Error',
                        errorDesc : data.errorDesc || 'Decription'
                    }})
                })
            },
            callFunction: stub
        };
        return service;
    });

