/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app', 'controllers/main'], function () {
    'use strict';

    describe('Controller: GameController', function () {

        // load the controller's module
        beforeEach(module('TexasHoldem'));

        var MainCtrl,
            scope,
            rankHands = {
                'royalflush': [
                    {r:10,s:1},
                    {r:11,s:1},
                    {r:12,s:1},
                    {r:13,s:1},
                    {r:14,s:1}
                ],
                'straightflush': [
                    {r:10,s:8},
                    {r:9,s:8},
                    {r:8,s:8},
                    {r:7,s:8},
                    {r:6,s:8}
                ],
                'fourofakind': [
                    {r:10,s:1},
                    {r:10,s:2},
                    {r:10,s:4},
                    {r:10,s:8},
                    {r:8,s:2}
                ],
                'fullhouse': [
                    {r:12,s:1},
                    {r:12,s:2},
                    {r:12,s:4},
                    {r:11,s:1},
                    {r:11,s:2}
                ],
                'flush': [
                    {r:12,s:1},
                    {r:10,s:1},
                    {r:8,s:1},
                    {r:6,s:1},
                    {r:4,s:1}
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
                    {r:12,s:1},
                    {r:10,s:2},
                    {r:8,s:4},
                    {r:6,s:8},
                    {r:4,s:2}
                ]
            },
            rankHandsDeck = {
                'deckRoyalFlush': [
                    {r:10,s:1},
                    {r:11,s:1},
                    {r:12,s:1},
                    {r:13,s:1},
                    {r:14,s:1},
                    {r:8,s:2},
                    {r:5,s:4}
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

        it('has set a SUITS array', function() {
            expect(scope.ranks).toBeDefined();
            expect(scope.ranks.length).toBe(10);
        });

        it('can rank a "Royal Flush" correctly', function() {
            expect(scope.rankHand(rankHands.royalflush).rank).toBe(9);
        });

        it('can rank a "Straight Flush" correctly', function() {
            expect(scope.rankHand(rankHands.straightflush).rank).toBe(8);
        });

        it('can rank a "Four of a Kind" correctly', function() {
            expect(scope.rankHand(rankHands.fourofakind).rank).toBe(7);
        });

        it('can rank a "Full House" correctly', function() {
            expect(scope.rankHand(rankHands.fullhouse).rank).toBe(6);
        });

        it('can rank a "Flush" correctly', function() {
            expect(scope.rankHand(rankHands.flush).rank).toBe(5);
        });

        it('can rank a "Straight" correctly', function() {
            expect(scope.rankHand(rankHands.straight).rank).toBe(4);
        });

        it('can rank a "Three of a Kind" correctly', function() {
            expect(scope.rankHand(rankHands.threeofakind).rank).toBe(3);
        });

        it('can rank a "Two Pairs" correctly', function() {
            expect(scope.rankHand(rankHands.twopairs).rank).toBe(2);
        });

        it('can rank a "One Pair" correctly', function() {
            expect(scope.rankHand(rankHands.pair).rank).toBe(1);
        });

        it('can rank a "High Cards" correctly', function() {
            expect(scope.rankHand(rankHands.highcard).rank).toBe(0);
        });

        it('can rank a "Royal Flush" out of a deck of 7 cards correctly', function() {
            expect(scope.rankDeck(rankHandsDeck.deckRoyalFlush).rank).toBe(9);
        });
    });
});
