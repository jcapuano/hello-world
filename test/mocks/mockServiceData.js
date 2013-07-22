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
    .factory('MockData', function() {
    	return {
        	'getCitizens': [
	        	{
	            	name: 'Angola',
	                citizens: [
	                	{name: 'Marie'}
	                ]
	            },
	        	{
	            	name: 'Cuba',
	                citizens: [
	                	{name: 'Fidel'}
	                ]
	            },
	        	{
	            	name: 'Iceland',
	                citizens: [
	                	{name: 'Bjork'}
	                ]
	            },
	        	{
	            	name: 'Mali',
	                citizens: [
	                	{name: 'Francine'}
	                ]
	            }
			]
		};
    });
    
})();
