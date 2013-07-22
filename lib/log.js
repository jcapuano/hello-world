var pec = require('projevo-core'),
    config = require('config'),
    path = require('path');

var logger;

function LoggerSingleton(filename) {
    
    return logger = (logger || pec.Logger.getLogger({
    							log_file_path: path.join(__dirname, '../logs'),
                                log_file_name: (filename || 'application') + '.log',
                                log_file_limit: 10,
                                log_file_size: 10 * 1024 * 1024,
                                log_file_level: config.logging.level
							})
		);
}

function Logger(filename) {
	var logger = LoggerSingleton(filename);

    return {
		debug: function() {
	        logger.debug(arguments);
	    },
		info: function() {
	        logger.info(arguments);
	    },
		warn: function() {
	        logger.warn(arguments);
	    },
		error: function() {
	        logger.error(arguments);
	    },
		fatal: function() {
	        logger.error(arguments);
	    }
	};        
}    
    
module.exports = Logger;
