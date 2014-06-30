/*jshint unused: vars */
'use strict';

require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        'angular-scenario': '../bower_components/angular-scenario/angular-scenario',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    }
});

require(['angular', 'app', 'controllers/main'], function (angular) {
    angular.bootstrap(document, ['TexasHoldem']);
});
