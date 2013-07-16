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
    .factory('apiProvider', function(MockBODs, MockPaths, MockTemplates, MockContacts, MockNotifications) {
    	var service = {
			callFunction: function(name, params){
		    	var data = null;

				// it's an object that looks like a promise, right??
				return {        
			    	then: function(callback) {
			        	callback({result:
                            data});
			            return this;
			        }
				};
		    }
		};
        return service;
    });



})();
