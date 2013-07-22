'use strict'

var fs = require('fs'),
	mockLoader = require('../mocks/mockLoader'),
	protractor = require('protractor'),
    ptor = protractor.getInstance();
    mockLoader(ptor, 'cai.services', 'test/mocks/mockServiceData.js');
    mockLoader(ptor, 'cai.services', 'test/mocks/mockServices.js');
 
describe('greet the citizens of the world', function() {

	beforeEach(function() {
		ptor.get('/');
        ptor.waitForAngular();
	});


	it('should be able to access view', function(done) {
		ptor.driver.getCurrentUrl().then(function(url) {
			expect(url).toEqual('http://localhost:3000/');
		    done();
		});
	},	100000);
	
    
	it('should display the welcome message', function(done) {
        ptor.findElement(protractor.By.id('welcome')).getText()
            .then(function(text) {
	            expect(text).toEqual('Hello Citizens of the World!');
    	        done();
        	});
	},	100000);
    
	it('should list the correct number of countries', function(done) {
        ptor.findElements(protractor.By.className('country-name'))
        	.then(function(elements) {
                expect(elements.length).toEqual(4);
                done();
			});
        
	},	100000);
    
	it('should list the countries', function(done) {
        ptor.findElement(protractor.By.repeater('country in countries').row(1))
        	.getText().then(function(text){
	        	//expect(text).toEqual('Angola\r\nMarie');
	        	expect(text).toMatch(/^Angola/);
		        done();
			});
        
	},	100000);
});	