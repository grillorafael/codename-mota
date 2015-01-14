var Stage1State = function(game){

};

Stage1State.prototype.preload = function() {
    //Here you can preload images, audio, spritesheets and so on.
    Player.preLoadAssets(this.game);
    this.game.load.image('ground', '/assets/sprites/ground.png');
};

Stage1State.prototype.create = function() {
    this.setVariables();
    this.configEnvironment();

    // Create some ground for the player to walk on
    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    for(var x = this.game.width / 2; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height / 1.5, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }


    this.player = new Player(this.game, this.game.width/2, this.game.height - 103, this);
};

Stage1State.prototype.update = function() {
    //This method is called every frame.
    this.game.physics.arcade.collide(this.player, this.ground);

};

Stage1State.prototype.shutdown = function() {

};


Stage1State.prototype.setVariables = function() {
    this.GRAVITY = 2600; // pixels/second/second
};

Stage1State.prototype.configEnvironment = function() {
    this.game.stage.backgroundColor = 0x4488cc;
    this.game.physics.arcade.gravity.y = this.GRAVITY;
};