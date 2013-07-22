(function() {
'use strict';

var caiServices;
try {
    caiServices = angular.module('cai.services');
}
catch(e) {
    caiServices = angular.module('cai.services', []);
};
caiServices
    .factory('apiProvider', function(MockData) {
    	var service = {
			callFunction: function(name, params){
		    	var data = MockData.hasOwnProperty(name) 
                	? (_.isFunction(MockData[name]) ? MockData[name](params) : MockData[name])
                    : params;

				// it's an object that looks like a promise, right??
				return {        
			    	then: function(callback, errcallback) {
			        	callback({result: data});
			            return this;
			        }
				};
		    }
		};
        return service;
    })
})();