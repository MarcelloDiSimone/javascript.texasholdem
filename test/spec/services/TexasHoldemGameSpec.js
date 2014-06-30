/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app', 'controllers/main', 'services/TexasHoldemGame'], function () {
    'use strict';

    describe('Controller: TexasHoldemGame', function () {
        var factory,
            rankHands = {
                'royalflush': [
                    {r:10,s:1},
                    {r:11,s:1},
                    {r:12,s:1},
                    {r:13,s:1},
                    {r:14,s:1}
                ],
                'straightflush': [
                    {r:10,s:1},
                    {r:9,s:1},
                    {r:8,s:1},
                    {r:7,s:1},
                    {r:6,s:1}
                ],
                'fourofakind': [
                    {r:10,s:1},
                    {r:10,s:2},
                    {r:10,s:4},
                    {r:10,s:8},
                    {r:8,s:2}
                ],
                'fullhouse': [
                    {r:14,s:1},
                    {r:14,s:2},
                    {r:14,s:4},
                    {r:11,s:1},
                    {r:11,s:2}
                ],
                'flush': [
                    {r:14,s:1},
                    {r:12,s:1},
                    {r:10,s:1},
                    {r:8,s:1},
                    {r:6,s:1}
                ],
                'straight': [
                    {r:10,s:2},
                    {r:9,s:4},
                    {r:8,s:8},
                    {r:7,s:1},
                    {r:6,s:8}
                ],
                'threeofakind': [
                    {r:10,s:1},
                    {r:10,s:2},
                    {r:10,s:4},
                    {r:9,s:8},
                    {r:7,s:2}
                ],
                'twopairs': [
                    {r:10,s:1},
                    {r:10,s:2},
                    {r:9,s:4},
                    {r:9,s:8},
                    {r:7,s:2}
                ],
                'pair': [
                    {r:10,s:1},
                    {r:10,s:2},
                    {r:9,s:4},
                    {r:5,s:8},
                    {r:7,s:2}
                ],
                'highcard': [
                    {r:14,s:1},
                    {r:12,s:2},
                    {r:10,s:4},
                    {r:9,s:8},
                    {r:7,s:2}
                ]
            },
            ranks = [
                "Four of a Kind",
                "Straight Flush",
                "Straight",
                "Flush",
                "High Card",
                "One Pair",
                "Two Pair",
                "Royal Flush",
                "Three of a Kind",
                "Full House"
            ];

        // load the controller's module
        beforeEach(function() {
            module('TexasHoldem');
            // inject your factory for testing
            inject(function(TexasHoldemGame) {
                factory = new TexasHoldemGame();
            });
        });

        it('can get an instance of TexasHoldemGame factory', function() {
            expect(factory).toBeDefined();
        });

        it('has set a SUITS array', function() {
            expect(factory.SUITS).toBeDefined();
            expect(factory.SUITS.length).toBe(4);
        });

        it('has set a SUITS array', function() {
            expect(factory.ranks).toBeDefined();
            expect(factory.ranks.length).toBe(10);
        });

        it('has set a SUIT_SIZE array', function() {
            expect(factory.SUIT_SIZE).toBeDefined();
            expect(factory.SUIT_SIZE).toBe(12);
        });

        it('has initialized a deck array', function() {
            expect(factory.deck).toBeDefined();
            expect(factory.deck.length).toBe(52);
        });

        it('can rank a "Royal Flush" correctly', function() {
            expect(factory.rankHand(rankHands.royalflush)).toBe(7);
        });

        it('can rank a "Straight Flush" correctly', function() {
            expect(factory.rankHand(rankHands.straightflush)).toBe(1);
        });

        it('can rank a "Four of a Kind" correctly', function() {
            expect(factory.rankHand(rankHands.fourofakind)).toBe(0);
        });

        it('can rank a "Full House" correctly', function() {
            expect(factory.rankHand(rankHands.fullhouse)).toBe(9);
        });

        it('can rank a "Flush" correctly', function() {
            expect(factory.rankHand(rankHands.flush)).toBe(3);
        });

        it('can rank a "Straight" correctly', function() {
            expect(factory.rankHand(rankHands.straight)).toBe(2);
        });

        it('can rank a "Three of a Kind" correctly', function() {
            expect(factory.rankHand(rankHands.threeofakind)).toBe(8);
        });

        it('can rank a "Two Pairs" correctly', function() {
            expect(factory.rankHand(rankHands.twopairs)).toBe(6);
        });

        it('can rank a "One Pair" correctly', function() {
            expect(factory.rankHand(rankHands.pair)).toBe(5);
        });

        it('can rank a "High Cards" correctly', function() {
            expect(factory.rankHand(rankHands.highcard)).toBe(4);
        });
    });
});
