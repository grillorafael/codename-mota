var Stage1State = function(game){

};

Stage1State.prototype.preload = function() {
    //Here you can preload images, audio, spritesheets and so on.
    Player.preLoadAssets(this.game);
    HealthPack.preLoadAssets(this.game);
    BulletPreloader.preloadAssets(this.game);
    Rain.preLoadAssets(this.game);
    this.game.load.image('ground', 'assets/sprites/ground.png');

    this.game.time.advancedTiming = true;
};

Stage1State.prototype.create = function() {
    this.setVariables();
    this.configEnvironment();

    // Create some ground for the player to walk on
    this.ground = this.game.add.group();
    this.healthPacks = this.game.add.group();

    this.game.world.setBounds(0, 0, 1920, 1200);

    // Configuring platforms
    for(var x = 0; x < this.game.world.bounds.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.world.bounds.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    for(var x = 480; x < this.game.world.bounds.width / 2; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.world.bounds.height - 400, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    for(var x = 0; x < 240; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.world.bounds.height - 200, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }
    // Configuring platforms

    this.player = new Player(this.game, 20, this.game.world.bounds.height - 103, this);

    // Configuring healthPacks
    var healthPack = new HealthPack(this.game, this.player, this, this.game.width/3, this.game.height - 52);
    this.healthPacks.add(healthPack);

    this.game.camera.follow(this.player);

    Rain.startRain(this.game);
};

Stage1State.prototype.update = function() {
    //This method is called every frame.
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.healthPacks, this.ground);
};

Stage1State.prototype.shutdown = function() {

};

Stage1State.prototype.render = function() {
    this.game.debug.text("Player Health: " + this.player.health || '--', 2, 14, "#00ff00");
    this.game.debug.text('FPS: ' + (this.game.time.fps || '--'), 2, 44, "#00ff00");
    this.game.debug.spriteInfo(this.player, 2, 60);
};


Stage1State.prototype.setVariables = function() {
    this.GRAVITY = 2600; // pixels/second/second
};

Stage1State.prototype.configEnvironment = function() {
    this.game.stage.backgroundColor = 0x000000;
    this.game.physics.arcade.gravity.y = this.GRAVITY;
};