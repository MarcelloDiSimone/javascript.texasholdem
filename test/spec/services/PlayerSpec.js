/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app', 'controllers/main', 'services/Player'], function () {
    'use strict';

    describe('Factory: Player', function () {
        var factory,
            playerID = 11;

        // load the controller's module
        beforeEach(function() {
            module('TexasHoldem');
            // inject your factory for testing
            inject(function(Player) {
                factory = new Player(playerID);
            });
        });

        it('can get an instance of Player factory', function() {
            expect(factory).toBeDefined();
        });

        it('has set a playerID array', function() {
            expect(factory.num).toBeDefined();
            expect(factory.num).toBe(playerID);
        });

        it('has set a rank object', function() {
            expect(factory.rank).toBeDefined();
            expect(typeof factory.rank).toBe('object');
        });

        it('has a rank setter', function() {
            expect(factory.setRank).toBeDefined();
            expect(typeof factory.setRank).toBe('function');

            factory.setRank({rank:1,rankText:'Full House'});
            expect(factory.rank.rank).toBe(1);
            expect(factory.rank.rankText).toBe('Full House');
        });

    });
});
