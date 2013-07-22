'use strict';


describe('Main Controller', function() {
	var expect = chai.expect,
	    should = chai.should();

    beforeEach(module('cai.services'));
	beforeEach(module('peApp'));
	beforeEach(module('peControllers'));

    describe('display', function() {
    	var env = {};
        env.mockCountries = [];
        
    	beforeEach(inject(function($rootScope, MockData) {
        	env.scope = $rootScope.$new();
            env.mockCountries = MockData.getCitizens;
		}));

    	describe('all citizens', function() {

            beforeEach(function() {
                inject(function($controller, apiProvider){
                	env.apiProvider = apiProvider;
                    env.ctrl = $controller('MainController', {
                        $scope: env.scope,
                        apiProvider: env.apiProvider
                    });
                });
            });

            it('should display welcome message', function() {
                env.scope.message.should.not.be.null;
                env.scope.message.should.equal('Hello Citizens of the World!');
            });

            it('should display all countries', function() {
                env.apiProvider.callFunction.should.have.been.calledOnce;
                env.apiProvider.callFunction.should.have.been.calledWith('getCitizens');
                
                env.apiProvider.resolvePromise(env.mockCountries);
                
                env.scope.countries.should.not.be.null;
                env.scope.countries.should.have.length(4);
            });

            it('should have a list of citizens for each country', function(){
                env.apiProvider.resolvePromise(env.mockCountries);
            
                env.scope.countries.should.not.be.null;
                env.scope.countries.should.have.length(4);
            	_.each(env.scope.countries, function(country) {
                	country.should.have.property('citizens');
                    country.citizens.should.have.length(1);
				});
            });
        });
	});

});


