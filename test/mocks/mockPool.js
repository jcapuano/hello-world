var pool = require('projevo-core').Pool
	sinon = require('sinon');

module.exports = function(collNames) {
	collNames = collNames || ['any'];
    var mock = {};
    mock.ensureConnection = pool.ensureConnection;
    mock.acquire = sinon.stub();
    mock.release = sinon.stub();
	mock.get = function() {};
	sinon.stub(mock, 'get', function(name) {
		return {acquire: mock.acquire, release: mock.release};
	});

    mock.collection = {};
    for (var i=0; i<collNames.length; i++) {
    	mock.collection[collNames[i]] = {
        	find: sinon.stub(), 
        	findOne: sinon.stub(), 
            findAndModify: sinon.stub(), 
            update: sinon.stub(), 
            save: sinon.stub(), 
            remove: sinon.stub()
		};
	}        
    mock.dbClient = { 
    	collection: function(name) {
        	name = name || 'any';
        	if (mock.collection.hasOwnProperty(name)) {
            	return mock.collection[name];
			}
            return null;
		} 
	};
	mock.acquire.yields(null, mock.dbClient);
    
    mock.cursor = function(data) {
		return {
			toArray: function(cb) {
				return cb(null, data || []);
			}
		};
	};
    
    return mock;
};