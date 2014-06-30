/**
 * Created by marcellodisimone on 29.06.14.
 */
define(['app'], function(app) {
    "use strict";
    app.filter('sortPlayers', function() {
            return function(items) {
                console.log(items);
                return items;
            };
        });
});
