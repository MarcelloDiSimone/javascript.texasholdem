'use strict';

define(['app', 'services/TexasHoldemGame', 'services/Player'], function (app) {
    return app.controller('GameController', ['$scope', 'TexasHoldemGame', 'Player',
        function GameController($scope, TexasHoldemGame, Player) {
            $scope.players = [];
            $scope.numberOfPlayers = 2;
            $scope.startGame = function () {
                $scope.cardDeck = new TexasHoldemGame();
                $scope.common = new Player();
                $scope.common.setHand($scope.cardDeck.dealHand(5));
                for (var i = 0; i < $scope.numberOfPlayers; i++) {
                    var player = new Player(i+1),
                        rank;
                    player.setHand($scope.cardDeck.dealHand(2));
                    rank = $scope.cardDeck.rankDeck(player.hand.concat($scope.common.hand));
                    player.setRank(rank);
                    $scope.players.push(player);
                }
            };
        }
    ]);
});
