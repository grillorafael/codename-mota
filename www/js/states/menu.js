var MenuState = function(game){

};

MenuState.prototype.preload = function() {
    //Here you can preload images, audio, spritesheets and so on.
    this.game.load.audio('background', [
        'assets/audio/menu.wav'
    ]);
};

MenuState.prototype.create = function() {
    //This is called immediately after preloading.
    this.backgroundAudio = this.game.add.audio('background');
    this.backgroundAudio.play('', 0, 1, true);

    var menuTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Game Title", Style.TextTitle);
    menuTitle.anchor.set(0.5);
    menuTitle.inputEnabled = true;
    menuTitle.events.onInputDown.add(onTitleClick, this);
    function onTitleClick() {
        this.state.start('about');
    }

    var newGame = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, "New Game", Style.Text);
    newGame.anchor.set(0.5);
    newGame.inputEnabled = true;
    newGame.events.onInputDown.add(onNewGameClick, this);
    function onNewGameClick() {
        this.state.start('stage1');
    }
};

MenuState.prototype.update = function() {
    //This method is called every frame.
};

MenuState.prototype.shutdown = function() {
    this.backgroundAudio.stop();
};
