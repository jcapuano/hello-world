var pec = require('projevo-core'),
    config = require('config');

var main = new pec.Main(__dirname + '/../');
main.configure(config);
main.start();
main.startMonitoring();

