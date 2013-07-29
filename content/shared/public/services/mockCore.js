(function() {
    'use strict';

    // synchronous load of base64.js for IE9
    if (!window.atob) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/cai/core/web/js/lib/base64.js", false);
        xhr.send('');

        // by using eval here, the base64 object remains private to this module
        eval(xhr.responseText);
    }

    // initialize services namespace
    var caiServices;
    try {
        caiServices = angular.module('cai.services');
    }
    catch(e) {
        caiServices = angular.module('cai.services', []);
    };

    caiServices.factory('core', ['serverData', function(serverData) {
        function run(m1, m2, s) {
            if (window[m1]) { return window[m1](s); } else { return base64[m2](s); }
        }

        var service = serverData ? JSON.parse(run('atob', 'decode', serverData)) : {};

        service.atob = function(s) { return run('atob', 'decode', s); };
        service.btoa = function(s) { return run('btoa', 'encode', s); };

        service.user = {
            userName: 'jdoe',
            email: 'jdoe@commandalkon.com',
            resetPassword: false,
            roles: []
        };

        return service;
    }]);
})();
