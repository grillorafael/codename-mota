function Player(game, x, y){
    //TODO
    //Here's where we create our player sprite.
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.configureAnimations();

    this.keyboard = game.input.keyboard;
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.nextShotAt = 0;
    this.shotDelay = 60;

    this.bullets = [];

    this.state = 'normal';

    // Characters Attributes
    this.health = 100;
    this.shield = 0;
    this.bulletType;

    // Jump Up and Down
    // Double Jump Up
    // Crouch Up and Down
    // Dash
    // Shoot


    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.preLoadAssets = function(game) {
    //TODO
    game.load.spritesheet('player', 'assets/sprites/player.png', 105, 103, 16);
    game.load.image('bullet', 'assets/sprites/bullet.png');
};

Player.prototype.configureAnimations = function() {
    //TODO
    this.animations.add('walk');
    this.animations.play('walk', 24, true);
};

Player.prototype.update = function() {
    //TODO
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

    if(this.keyboard.isDown(Phaser.Keyboard.X)) {
        this.fireBullet();
    }

    if(this.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.jump();
    }

    if(this.keyboard.isDown(Phaser.Keyboard.Q)) {
        this.dash('left');
    }
    else if(this.keyboard.isDown(Phaser.Keyboard.E)) {
        this.dash('right');
    }
};

Player.prototype.dash = function(orientation) {
    console.log('[Player] dash', orientation);
    //TODO
};

Player.prototype.jump = function() {
    console.log('[Player] jump');
    //TODO
    if(this.state == "normal") {
        this.state = "jumping";

    }
    else if(this.state = "jumping") {
        this.state = "double_jumping";

    }
};

Player.prototype.fireBullet = function() {
    console.log('[Player] fireBullet');
    //TODO
    if (this.nextShotAt > this.game.time.now) {
        return;
    }

    this.nextShotAt = this.game.time.now + this.shotDelay;

    var bullet = this.game.add.sprite(this.x + 20, this.y, 'player');
    bullet.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.body.velocity.x = 500;
    this.bullets.push(bullet);
};
