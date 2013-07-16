'use strict';


describe('Main Controller', function() {
	var mocks = {};
	var expect = chai.expect,
	    should = chai.should();

    beforeEach(module('cai.services'));
	beforeEach(module('peApp'));
	beforeEach(module('peApp.controllers'));

    describe('display', function() {
    	var env = {};
        
        var scope, ctrl;
    	beforeEach(inject(function($rootScope) {
            scope = $rootScope.$new();
		}));

    	describe('all citizens', function() {

            beforeEach(function() {
                inject(function($controller, apiProvider){
                    ctrl = $controller('MainController', {
                        $scope: scope,
                        contacts: env.contactSvc,
                        notifications: env.notificationSvc
                    });
                });
            });

            it('should not display error', function() {
                env.qsParserSvc.isValid.should.have.been.calledOnce;
                scope.error.should.be.blank;
            });

            it('should display all contacts for customer', function() {
                env.contactSvc.buildFilter.should.have.been.calledWith(env.qsParserSvc.context, env.qsParserSvc.org, env.qsParserSvc.additionalContexts);
                env.contactSvc.get.should.have.been.calledWith({
                    context: 'Customer',
                    org: 'A-OK',
                    customer: 'A-OK'
                });
                scope.registration.contacts.should.not.be.null;
                scope.registration.contacts.should.have.length(4);

                scope.registration.contacts[0].fname.should.equal('Jim');

                env.notificationSvc.unusedNotifications.should.have.been.calledWith({context: env.qsParserSvc.context, additional: env.qsParserSvc.additionalContexts}, sinon.match.any, sinon.match.any);

                scope.registration.contacts[0].unusedNotifications.should.be.true;
                scope.registration.contacts[0].unused.should.not.be.null;
                scope.registration.contacts[0].unused.should.have.length(3);
                scope.registration.contacts[0].unused[0].name.should.equal('Order Create');
                scope.registration.contacts[0].unused[1].name.should.equal('Order Create');
                scope.registration.contacts[0].unused[2].name.should.equal('Order Update');

                env.notificationSvc.get.should.have.been.calledWith({context: 'Customer'});

                scope.notifications.should.not.be.null;
                scope.notifications.should.have.length(4);
            });

            it('should have a list of all contacts for the org', function(){
                env.contactSvc.get.should.have.been.calledWith({company: 'A-OK'});

                scope.registration.allContacts.should.not.be.null;
                scope.registration.allContacts.should.have.length(0);
            });
        });
	});

});


