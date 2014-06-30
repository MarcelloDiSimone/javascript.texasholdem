/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app', 'controllers/main'], function () {
    'use strict';

    describe('Controller: GameController', function () {

        // load the controller's module
        beforeEach(module('TexasHoldem'));

        var MainCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('GameController', {
                $scope: scope
            });
        }));

        it('should attach a empty list of players to the scope', function () {
            expect(scope.players).toBeDefined();
            expect(scope.players.length).toBe(0);
        });
    });
});
