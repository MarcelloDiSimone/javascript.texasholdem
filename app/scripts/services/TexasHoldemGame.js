'use strict';

define(['app'], function (app) {

    app.factory('TexasHoldemGame', function () {

        function TexasHoldemGame() {
            this.SUIT_SIZE = 12;
            /* The suit of a card is determined by a binary flag
             *      heart   = 1 = binary 0001
             *      diamond = 2 = binary 0010
             *      cross   = 4 = binary 0100
             *      spades  = 8 = binary 1000
             * This makes it possible to define the colors of a certain rank of cards by
             * summing the 4 colors. Thus "Four of a kind" would add the color values:
             *      (1 + 2 + 4 + 8) = 15 = binary 1111
             */
            this.SUITS = [1, 2, 4, 8];

            /*
             * List of ranks captions
             */
            this.ranks = [
                {
                    rankText: "Four of a Kind",
                    rank: 7
                },
                {
                    rankText: "Straight Flush",
                    rank: 8
                },
                {
                    rankText: "Straight",
                    rank: 4
                },
                {
                    rankText: "Flush",
                    rank: 5
                },
                {
                    rankText: "High Card",
                    rank: 0
                },
                {
                    rankText: "One Pair",
                    rank: 1
                },
                {
                    rankText: "Two Pair",
                    rank: 2
                },
                {
                    rankText: "Royal Flush",
                    rank: 9
                },
                {
                    rankText: "Three of a Kind",
                    rank: 3
                },
                {
                    rankText: "Full House",
                    rank: 6
                }
            ];

            /* now we create an initial deck of cards from which we're able to deal random cards */
            this.deck = [];

            for (var i = 0; i <= this.SUIT_SIZE; i++) {
                for (var j = 0; j < this.SUITS.length; j++) {
                    this.deck.push({
                        r: i + 2,
                        s: this.SUITS[j]
                    });
                }
            }
        }

        /**
         * Returns a single card object by removing it from the global deck
         * @returns {*}
         * @throws Error if there are no more cards left in the deck
         */
        TexasHoldemGame.prototype.dealCard = function () {
            if (this.deck.length) {
                return (this.deck.length) ? this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0] : false;
            } else {
                throw "Sorry no more cards on the deck";
            }
        };

        /**
         * Returns an array of a given amount of cards
         * @param numberOfCards Amount of cards for current hand
         * @returns {Array}
         */
        TexasHoldemGame.prototype.dealHand = function (numberOfCards) {
            var hand = [];
            for (var i = 0; i < numberOfCards; i++) {
                hand.push(this.dealCard());
            }
            return hand;
        };

        /**
         * Sends all possible combinations of cards defined in hand to the callback in appropriate chunks of handSize
         * @param hand      array of cards
         * @param handSize  size of regular hand
         * @param callback  for each combination run following function
         */
        TexasHoldemGame.prototype.combinations = function (hand, handSize, callback) {
            var n = hand.length;
            var c = [];
            var inner = function (start, choose_) {
                if (choose_ == 0) {
                    callback(c);
                } else {
                    for (var i = start; i <= n - choose_; ++i) {
                        c.push(hand[i]);
                        inner(i + 1, choose_ - 1);
                        c.pop();
                    }
                }
            };
            inner(0, handSize);
        };

        /**
         * Ranks all possible combinations of the cards in deck and returns the highest rank
         * @param deck {Array} Array of cards to be ranked
         * @returns {Number} highest rank
         */
        TexasHoldemGame.prototype.rankDeck = function (deck) {
            var self = this,
                combRank = [],
                finalRank;
            this.combinations(deck, 5, function (arr) {
                combRank.push(self.rankHand(arr))
            });
            finalRank = Math.max.apply(Math, combRank);
            return this.ranks[finalRank];
        };

        /**
         * Calculates the rank of the given hand
         * @param hand Array of Cards
         * @returns {number}
         */
        TexasHoldemGame.prototype.rankHand = function (hand) {
            var v = 0,
                o = 0,
                r = 0,
                s = 0;

            hand.forEach(function (card) {
                // combines all ranks into a binary representation
                r |= 1 << card.r;
                // combines all suits into a binary representation
                s |= card.s;
            });

            for (var i = -1; i < 5; i++, o = Math.pow(2, (hand[i] ? hand[i].r : 0) * 4)) {
                v += o * ((v / o & 15) + 1);
            }
            v = v % 15 - ((r / (r & -r) == 31) || (r == 0x403c) ? 3 : 1);
            v -= (this.SUITS.indexOf(s) ? 0 : 1) * ((r == 0x7c00) ? -5 : 1);
            return v;
        };

        return TexasHoldemGame;
    });
});
