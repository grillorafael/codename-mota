(function() {
    "use strict";
    var game = new Phaser.Game(1136, 640, Phaser.CANVAS, 'game');

    game.state.add('menu', MenuState, true);
    game.state.add('about', AboutState, false);
    game.state.add('stage1', Stage1State, false);
})();
