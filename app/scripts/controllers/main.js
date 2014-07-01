'use strict';

define(['app', 'services/Player', 'services/Deck'], function (app) {
    return app.controller('GameController', ['$scope', 'Player', 'Deck',
        function GameController($scope, Player, Deck) {
            $scope.players = [];
            $scope.numberOfPlayers = 2;
            $scope.deck = new Deck();
            /*
             * List of ranks captions
             */
            $scope.ranks = [
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

            $scope.startGame = function () {
                $scope.common = new Player();
                $scope.common.setHand($scope.deck.dealHand(5));
                for (var i = 0; i < $scope.numberOfPlayers; i++) {
                    var player = new Player(i+1),
                        rank;
                    player.setHand($scope.deck.dealHand(2));
                    rank = $scope.rankDeck(player.hand.concat($scope.common.hand));
                    player.setRank(rank);
                    $scope.players.push(player);
                }
            };


            /**
             * Sends all possible combinations of cards defined in hand to the callback in chunks of the number defined
             * by handSize
             * @see https://stackoverflow.com/questions/4061080/output-each-combination-of-an-array-of-numbers-with-javascript
             * @param hand {Array}        aarray of cards
             * @param handSize {Number}   size of regular hand
             * @param callback {Function} for each combination run following function
             */
            $scope.combinations = function (hand, handSize, callback) {
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
            $scope.rankDeck = function (deck) {
                var combRank = [];
                this.combinations(deck, 5, function (arr) {
                    combRank.push($scope.rankHand(arr))
                });
                // return the highest rank of all combinations
                return combRank.reduce(function(prev, next) {
                    return prev.rank >= next.rank ? prev : next;
                });
            };

            /**
             * Calculates the rank of the given hand.
             * @see http://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math
             * @param hand {Array} list of Cards
             * @returns {Object} rank object with rank integer, rank name and aceLow flag
             */
            $scope.rankHand = function (hand) {
                var handFloat = 0,
                    cardFloat = 0,
                    rankInt = 0,
                    suitInt = 0,
                    rankPattern,
                    handID,
                    isStraight,
                    isStraightAceLow,
                    isFlush,
                    isRoyalFlush,
                    rank,
                    rankObj;

                for(var card in hand) {
                    if(hand.hasOwnProperty(card)) {
                        // combines all ranks into a binary representation
                        rankInt |= 1 << hand[card].r;
                        // combines all suits into a binary representation
                        suitInt |= hand[card].s;
                    }
                }

                // normalizing the binary rank table, stripping all zero bits from the right off.
                rankPattern = rankInt / (rankInt & -rankInt);
                // with the shifted rankInt we have a unique pattern for certain types of hands, for example a straight
                // requires five card ranks in a row, for example a straight starting with 10 would be 1111100000000 a
                // straight starting with 2 would be binary 111110. By shifting the rankInt to the right,
                // we get binary 11111 (int 31, hex 0x1f) for all types of straights
                isStraight = rankPattern == 0x1f;
                // except for a straight with a low ace the rankPattern would look like 1000000001111 so we check for
                // that explicitly. (hex 0x100f = binary 1000000001111)
                isStraightAceLow = rankPattern == 0x100f;

                // if suitInt is equal to one of the different suit values in this.SUITS it means that all cards in
                // this hand are off the same suit and therefore we have a flush
                isFlush = $scope.deck.SUITS.indexOf(suitInt) >= 0 ? 1 : 0;
                // if the leftmost 5 bits of rankInt's 13 bit rank table are set, it's considered to be a
                // royal flush (in combination of isFlush of curse)
                isRoyalFlush = rankInt == 0x7c00;

                for (var i = 0; i < hand.length; i++) {
                    // create a floating point number with the binary representation for that card rank
                    cardFloat = Math.pow(2, hand[i].r * 4);
                    // mathematically binary AND the card rank floating point number with the previous card rank
                    // when finishing the loop we will have a 52bit binary table with all card rank bits set, duplicate
                    // ranks are dropped.
                    handFloat += cardFloat * ((handFloat / cardFloat & 15) + 1);
                }

                // due to the structure of our handFloat binary table we get a unique number for each hand.
                // Four of a Kind = 1
                // High Card = 5
                // One Pair = 6
                // Two Pair = 7
                // Three of a Kind = 9
                // Full House = 10
                handID = handFloat % 15;

                rank = handID - (isStraight || isStraightAceLow ? 3 : 1);
                rank += isFlush * (isRoyalFlush ? 5 : -1);

                rankObj = $scope.ranks[rank];
                rankObj.aceLow = isStraightAceLow;

                return rankObj;
            };
        }
    ]);
});
