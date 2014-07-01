'use strict';

define(['app'], function (app) {
    app.factory('Player', function () {
        function Player(num) {
            this.num = num;
            this.rank = {
                rank: 0,
                rankText: ''
            };
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
