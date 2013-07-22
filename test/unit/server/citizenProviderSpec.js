/**
 * Created with JetBrains WebStorm.
 * User: jcapuano
 * Date: 7/16/13
 * Time: 1:53 PM
 * To change this template use File | Settings | File Templates.
 */
var chai = require('chai'),
    sinon = require('sinon'),
    should = chai.should(),
    expect = chai.expect,
    assert = chai.assert,
    sandbox = require('sandboxed-module'),
    mockpool = require('../../mocks/mockPool'),
    helpers = require('../../lib/db'),
    _ = require('underscore'),
    fs = require('fs');

chai.use(require("chai-as-promised"));
chai.use(require('sinon-chai'));

describe('Citizen Provider', function() {

    var env = {};
    process.setMaxListeners(0);	// avoid Q promise library warning

    beforeEach(function() {
        env = {};

        env.log = require('../../mocks/mockLogger');
    });

    describe('interface', function() {

        beforeEach(function() {
            env.pool = mockpool();

            env.Provider = sandbox.require('../../../config/providers/citizenProvider', {
                requires: {
                    '../../lib/log': env.log,
                    'projevo-core' : {Pool: env.pool}
                }
            });
        });

         it('should support get citizens', function() {
        	expect(env.Provider).to.have.property('services');
        	expect(env.Provider.services).to.have.property('getCitizens');
            expect(env.Provider.services.getCitizens).to.respondTo('handler');
        });
    });

    describe('Mock DB', function() {
        beforeEach(function() {
            env.pool = mockpool(['citizens']);

            env.Provider = sandbox.require('../../../config/providers/citizenProvider', {
                requires: {
                    '../../lib/log': env.log,
                    'projevo-core' : {Pool: env.pool}
                }
            });

            env.mocks = JSON.parse(fs.readFileSync('test/mocks/mock-citizens.json'));
        });

        describe('get', function() {
            describe('all', function() {
                var countries, promise;

                beforeEach(function(done) {
                    env.pool.collection.citizens.find.yields(null, env.pool.cursor(env.mocks));
                    promise = env.Provider.services.getCitizens.handler();
                    promise
                        .then(function(data) {
                            countries = data;
                            done();
                        })
                        .fail(function(err) {
                            done(err);
                        });
                });

                it('should make the proper request', function() {
                    env.pool.collection.citizens.find.should.have.been.calledWith(null, sinon.match.any);
                });

                it('should return a promise', function() {
                    promise.should.exist;
                    promise.should.have.property('promiseDispatch');
                });

                it('promise should return citizens', function() {
                    countries.should.exist;
                    countries.should.have.length(3);
                });

                it('citizens should contain correct information', function() {
                    var cntry = countries[0];

                    expect(cntry).to.exist;
                    cntry.name.should.equal('Angola');
                    cntry.citizens.should.exist;
                    cntry.citizens.should.have.length(1);
                    cntry.citizens[0].name.should.equal('Josephine');
                });
            });
            
            describe('by country', function() {
                var countries, country = 'United Kingdom', promise;

                beforeEach(function(done) {
                    env.pool.collection.citizens.find.yields(null, env.pool.cursor(_.filter(env.mocks, function(c) {return c.country == country;})));
                    promise = env.Provider.services.getCitizens.handler({country: country});
                    promise
                        .then(function(data) {
                            countries = data;
                            done();
                        })
                        .fail(function(err) {
                            done(err);
                        });
                });

                it('should make the proper request', function() {
                    env.pool.collection.citizens.find.should.have.been.calledWith({country: country}, sinon.match.any);
                });

                it('should return a promise', function() {
                    promise.should.exist;
                    promise.should.have.property('promiseDispatch');
                });

                it('promise should return citizens', function() {
                    countries.should.exist;
                    countries.should.have.length(1);
                });

                it('citizens should contain correct information', function() {
                    var cntry = countries[0];

                    expect(cntry).to.exist;
                    cntry.name.should.equal(country);
                    cntry.citizens.should.exist;
                    cntry.citizens.should.have.length(2);
                    cntry.citizens[0].name.should.equal('Frank');
                    cntry.citizens[1].name.should.equal('George');
                });
            });
            
        });
    });

    describe('Mongo DB', function() {

        beforeEach(function(done) {
            env.Provider = sandbox.require('../../../config/providers/citizenProvider', {
                requires: {
                    '../../lib/log': env.log
                }
            });

            env.mocks = JSON.parse(fs.readFileSync('test/mocks/mock-citizens.json'));

            helpers.resetAll('citizens', env.mocks)
                .then(function() {
                    done();
                })
                .fail(function(err) {
                    done(err);
                });
        });

        describe('get', function() {
            describe('all', function() {
                var countries, promise;

                beforeEach(function(done) {
                    promise = env.Provider.services.getCitizens.handler();
                    promise
                        .then(function(data) {
                            countries = data;
                            done();
                        })
                        .fail(function(err) {
                            done(err);
                        });
                });

                it('should return a promise', function() {
                    promise.should.exist;
                    promise.should.have.property('promiseDispatch');
                });

                it('promise should return citizens', function() {
                    countries.should.exist;
                    countries.should.have.length(3);
                });

                it('citizens should contain correct information', function() {
                    var cntry = countries[0];

                    expect(cntry).to.exist;
                    cntry.name.should.equal('Angola');
                    cntry.citizens.should.exist;
                    cntry.citizens.should.have.length(1);
                    cntry.citizens[0].name.should.equal('Josephine');
                });
            });
        });
    });
});

