function Player(game, x, y){
    //TODO
    //Here's where we create our player sprite.
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.configureAnimations();

    this.keyboard = game.input.keyboard;
    this.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.X,
        Phaser.Keyboard.Q,
        Phaser.Keyboard.E
    ]);

    this.configureSpriteBehaviour();


    this.nextShotAt = 0;
    this.shotDelay = 60;

    this.bullets = [];

    this.state = 'normal';

    // Characters Attributes
    this.health = 100;
    this.shield = 0;
    this.bulletType = new DefaultBullet(game, this);

    // Jump Up and Down
    // Double Jump Up
    // Crouch Up and Down
    // Dash
    // Shoot

    this.playerSpeed = 500;
    this.JUMP_SPEED = -500; // pixels/second (negative y is up)
    this.DOUBLE_JUMP_SPEED = -700; // pixels/second (negative y is up)
    this.jumps = 0;

    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.preLoadAssets = function(game) {
    game.load.spritesheet('player', 'assets/sprites/player.png', 105, 103, 16);
    game.load.image('bullet', 'assets/sprites/bullet.png');
};

Player.prototype.configureAnimations = function() {
    this.animations.add('walk');
    this.animations.play('walk', 24, true);
};

Player.prototype.configureSpriteBehaviour = function () {
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
};

Player.prototype.update = function() {
    if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -this.playerSpeed;
        // player.animations.play('left');
    }
    else if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.x = this.playerSpeed;
        // player.animations.play('right');
    }
    else {
        this.body.velocity.x = 0;
    }

    if(this.keyboard.isDown(Phaser.Keyboard.X)) {
        this.fireBullet();
    }

    this.handleJump();

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

Player.prototype.handleJump = function () {
    var onTheGround = this.body.touching.down;

    if (onTheGround) {
        this.jumps = 2;
        this.jumping = false;
    }

    if (this.jumps > 0 && upInputIsActive(150, this.keyboard)) {
        this.body.velocity.y = this.jumps == 1 ? this.DOUBLE_JUMP_SPEED : this.JUMP_SPEED;
        this.jumping = true;
    }

    if (this.jumping && upInputReleased(this.keyboard)) {
        this.jumps--;
        this.jumping = false;
    }

    function upInputIsActive(duration, keyboard) {
        return keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);
    }

    function upInputReleased(keyboard) {
        return keyboard.upDuration(Phaser.Keyboard.SPACEBAR);
    }
};


Player.prototype.fireBullet = function() {
    console.log('[Player] fireBullet');
    //TODO Shooting direction
    this.bulletType.fire();
};
