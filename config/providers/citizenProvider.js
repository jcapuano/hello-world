/**
 * Created with JetBrains WebStorm.
 * User: jcapuano
 * Date: 7/16/13
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */
var pec = require('projevo-core'),
    pool = pec.Pool,
    log = require('../../lib/log')(),
    config = require('config'),
    _ = require('underscore'),
    Q = require('q'),
    collName = 'citizens',
    citizenPool = pool.get(collName, config.db[collName]);

var get = pool.ensureConnection(citizenPool, function(db, queryObj, options) {
    log.info('Get citizens');
    var citizens = db.collection(collName);
    log.debug('  search citizens query: ' + JSON.stringify(queryObj));
    return Q.ninvoke(citizens, 'find', queryObj, options)
        .then(function(cursor) {
            if (!cursor) {
                log.error('no cursor');
                // falls through to fail handler
                return Q.reject(new Error('Citizen for query "' + JSON.stringify(queryObj) + '" not found.'));
            }
            log.debug('  cursor to Array');
            return Q.ninvoke(cursor, 'toArray');
        })
        .then(function(data) {
            if (!data) {
                log.warn('no data');
                // falls through to fail handler
                return Q.reject(new Error('Citizens for query "' + JSON.stringify(queryObj) + '" not found.'));
            }
            // group citizens by country
            return _.map(_.uniq(_.pluck(_.sortBy(data, 'country'), 'country')), function(country) {
            	return {
                	name: country,
                    citizens: _.map(_.filter(data, function(citizen) { return citizen.country === country;}), function(c) {
                    	return _.omit(c, 'country');
					})
            	};
            });
        })
        .fail(function(err) {
            log.error(err);
            return Q.reject({
                errorNum: 1,
                errorMsg: err.toString()
            });
        });
});

module.exports = {
    services: {
        getCitizens: {
            handler: function(options) {
            	var query = null;
                if (options && options.country) {
                	query = { country: options.country };
                }
            
                return get(query, {sort: ['name','asc']});
            }
        }
    }
};

