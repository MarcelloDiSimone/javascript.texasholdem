'use strict';

define(['app'], function (app) {
    app.factory('Deck', function () {


        function Deck() {
            this.SUIT_SIZE = 13;
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

            /* now we create an initial deck of cards from which we're able to deal random cards */
            this.deck = [];

            // Generating the deck of cards
            for (var i = 2; i < this.SUIT_SIZE + 2; i++) {
                for (var j = 0; j < this.SUITS.length; j++) {
                    this.deck.push({
                        r: i,
                        s: this.SUITS[j]
                    });
                }
            }
        }


        /**
         * Returns a single card object by removing it from the global deck
         * @returns {Object} card object with rank and suit property
         * @throws Error if there are no more cards left in the deck
         */
        Deck.prototype.dealCard = function () {
            if (this.deck.length) {
                return (this.deck.length) ? this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0] : false;
            } else {
                throw "Sorry no more cards on the deck";
            }
        };

        /**
         * Returns an array of a given amount of cards
         * @param sizeOfHand {Number} Amount of cards for current hand
         * @returns {Array} List of cards
         */
        Deck.prototype.dealHand = function (sizeOfHand) {
            var hand = [];
            for (var i = 0; i < sizeOfHand; i++) {
                hand.push(this.dealCard());
            }
            return hand;
        };


        return Deck;
    });
});
