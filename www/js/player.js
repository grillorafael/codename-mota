function Player(game, x, y){
    //Here's where we create our player sprite.
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.configureAnimations();

    //We set the game input as the target
    this.keyboard = game.input.keyboard;

    //The anchor is the 'center point' of the sprite. 0.5, 0.5 means it will be aligned and rotated by its center point.
    this.anchor.setTo(0.5, 0.5);

    //Finally we enable physics so we can move the player around (this is how easy physics is in Phaser)
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    //Health
    this.health = 100;
    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.configureAnimations = function() {
    this.animations.add('walk');
    this.animations.play('walk', 20, true);
};

Player.prototype.update = function() {
    if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -150;
        // player.animations.play('left');
    }
    else if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.x = 150;
        // player.animations.play('right');
    }
    else {
        this.body.velocity.x = 0;
    }
};

Player.preLoadAssets = function(game) {
    game.load.spritesheet('player', 'assets/sprites/player.png', 105, 103, 16);
};
