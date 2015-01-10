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

    var menuTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Game Title", Style.TextTitle);
    menuTitle.anchor.set(0.5);
    menuTitle.inputEnabled = true;
    menuTitle.events.onInputDown.add(onTitleClick, this);
    function onTitleClick() {
        alert('oi');
    }
};

MenuState.prototype.update = function() {
    //This method is called every frame.
};
