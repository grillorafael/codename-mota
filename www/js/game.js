(function() {
    "use strict";
    var game = new Phaser.Game(1136, 640, Phaser.AUTO, 'game');
    game.state.add('menu', MenuState, true);
})();
