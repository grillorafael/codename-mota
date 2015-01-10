var AboutState = function(game){};

AboutState.prototype.preload = function() {
    //Here you can preload images, audio, spritesheets and so on.
};

AboutState.prototype.create = function() {
    //This is called immediately after preloading.

    var menuTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "About", Style.TextTitle);
    menuTitle.anchor.set(0.5);
    menuTitle.inputEnabled = true;
    menuTitle.events.onInputDown.add(onTitleClick, this);
    function onTitleClick() {
        this.state.start('menu');
    }
};

AboutState.prototype.update = function() {
    //This method is called every frame.
};
