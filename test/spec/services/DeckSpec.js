/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app', 'controllers/main', 'services/Deck'], function () {
    'use strict';

    describe('Factory: Deck', function () {
        var factory;

        // load the controller's module
        beforeEach(function() {
            module('TexasHoldem');
            // inject your factory for testing
            inject(function(Deck) {
                factory = new Deck();
            });
        });

        it('can get an instance of Deck factory', function() {
            expect(factory).toBeDefined();
        });

        it('has set a SUITS array', function() {
            expect(factory.SUITS).toBeDefined();
            expect(factory.SUITS.length).toBe(4);
        });

        it('has set a SUIT_SIZE array', function() {
            expect(factory.SUIT_SIZE).toBeDefined();
            expect(factory.SUIT_SIZE).toBe(13);
        });

        it('has initialized a deck array', function() {
            expect(factory.deck).toBeDefined();
            expect(factory.deck.length).toBe(52);
        });

    });
});
