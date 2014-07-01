'use strict';

define(['app'], function (app) {
    app.factory('Player', function () {
        function Player(num) {
            this.num = num;
            this.rank = 0;
            this.rankText = '';
        }

        Player.prototype.setHand = function(hand) {
            this.hand = hand;
        };

        Player.prototype.setRank = function(rank) {
            this.rank = rank;
        };

        return Player;
    });
});
