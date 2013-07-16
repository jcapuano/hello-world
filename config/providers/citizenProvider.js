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
            return data;
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
            handler: function() {
                return get(null, {sort: ['name','asc']});
            }
        }
    }
};

