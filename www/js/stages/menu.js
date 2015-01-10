var MenuState = function(game){};

MenuState.prototype.preload = function() {
    //Here you can preload images, audio, spritesheets and so on.
    this.game.load.audio('background', [
        'assets/audio/menu.wav'
    ]);
};

MenuState.prototype.create = function() {
    //This is called immediately after preloading.
    this.game.add.audio('background').play('', 0, 1, true);
};

MenuState.prototype.update = function() {
    //This method is called every frame.
};
