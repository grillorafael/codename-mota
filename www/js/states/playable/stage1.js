var Stage1State = function(game){

};

Stage1State.prototype.preload = function() {
    //Here you can preload images, audio, spritesheets and so on.
    Player.preLoadAssets(this.game);
};

Stage1State.prototype.create = function() {
    //This is called immediately after preloading.
    this.player = new Player(this.game, 150, 150);
};

Stage1State.prototype.update = function() {
    //This method is called every frame.
};

Stage1State.prototype.shutdown = function() {

};
