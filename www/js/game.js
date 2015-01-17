(function() {
    "use strict";
    var game = new Phaser.Game(1136, 640, Phaser.CANVAS, 'game');

    game.state.add('menu', MenuState, false);
    game.state.add('about', AboutState, false);
    game.state.add('stage1', Stage1State, true);
})();

function Logger() {};
Logger.DEBUG = true;
Logger.log = function(arg1, arg2) {
    if(Logger.DEBUG) {
        if(arg2 === undefined) {
            console.log(arg1);
        }
        else {
            console.log(arg1, arg2);
        }
    }
};