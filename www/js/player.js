function Player(game, x, y, stage){
    //TODO
    //Here's where we create our player sprite.
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.configureAnimations();

    this.stage = stage;

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

    this.PLAYER_SPEED = 500;
    this.JUMP_SPEED = -500; // pixels/second (negative y is up)
    this.DOUBLE_JUMP_SPEED = -700; // pixels/second (negative y is up)
    this.DASH_TIME = 300;
    this.DASH_SPEED = 1000;

    this.bulletPool = game.add.group();

    // Characters Attributes
    this.health = 50;
    this.shield = 0;
    this.bulletType = new DefaultBullet(game, stage, this);
    // Characters Attributes

    this.dashStarted = this.game.time.now - this.DASH_TIME;
    this.dashing = false;
    this.groundAfterDash = true;

    this.jumps = 0;

    this.aimOrientation = "right";

    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.preLoadAssets = function(game) {
    game.load.spritesheet('player', 'assets/sprites/player.png', 105, 103, 16);
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

Player.prototype.regenLife = function(factor) {
    console.log('Healing player', factor);
    this.health += factor;

    if(this.health > 100) {
        this.health = 100;
    }
};

Player.prototype.update = function() {
    if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.aimOrientation = 'left';
        this.body.velocity.x = -this.PLAYER_SPEED;
        if(this.keyboard.isDown(Phaser.Keyboard.UP)) {
            // player.animations.play('walk_left_up');
        }
        else if(this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            // player.animations.play('walk_left_down');
        }
        else {
            // player.animations.play('walk_left');
        }
    }
    else if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.aimOrientation = 'right';
        this.body.velocity.x = this.PLAYER_SPEED;
        if(this.keyboard.isDown(Phaser.Keyboard.UP)) {
            // player.animations.play('walk_right_up');
        }
        else if(this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            // player.animations.play('walk_right_down');
        }
        else {
            // player.animations.play('walk_right');
        }
    }
    else if(this.dashing === false){
        this.body.velocity.x = 0;
    }
    // UP AND DOWN SPRITES

    if(this.keyboard.isDown(Phaser.Keyboard.X)) {
        this.fireBullet();
    }

    this.handleJump();
    this.handleDash();

    if(this.body.touching.down) {
        this.groundAfterDash = true;
    }
};

Player.prototype.handleDash = function() {
    if(this.dashing === false && this.groundAfterDash) {
        if(this.keyboard.isDown(Phaser.Keyboard.Q)) {
            this.dashing = 'left';
            this.dashStarted = this.game.time.now;
            this.groundAfterDash = false;
        }
        else if(this.keyboard.isDown(Phaser.Keyboard.E)) {
            this.dashing = 'right';
            this.dashStarted = this.game.time.now;
            this.groundAfterDash = false;
        }
    }
    else if((this.game.time.now - this.dashStarted) < this.DASH_TIME) {
        if(this.dashing === 'right') {
            this.body.velocity.y = 0;
            this.body.velocity.x = this.DASH_SPEED;
        }
        else if(this.dashing === 'left') {
            this.body.velocity.y = 0;
            this.body.velocity.x = -this.DASH_SPEED;
        }
    }
    else {
        if(this.dashing) {
            this.body.velocity.x = 0;
        }
        this.dashing = false;
    }
};

Player.prototype.handleJump = function () {
    var onTheGround = this.body.touching.down;

    if (onTheGround) {
        this.jumps = 2;
        this.jumping = false;
    }

    if (this.jumps > 0 && upInputIsActive(150, this.keyboard)) {
        var secondJump = false;
        if(this.jumps == 2 && !onTheGround && !this.jumping) {
            this.jumps = 0;
            secondJump = true;
        }
        else if(this.jumps == 1) {
            secondJump = true;
        }

        this.body.velocity.y = secondJump ? this.DOUBLE_JUMP_SPEED : this.JUMP_SPEED;
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
    var orientation = this.aimOrientation;
    if(this.keyboard.isDown(Phaser.Keyboard.UP) && this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        orientation = "upperRight";
    }
    else if(this.keyboard.isDown(Phaser.Keyboard.UP) && this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        orientation = "upperLeft";
    }
    else if(this.keyboard.isDown(Phaser.Keyboard.DOWN) && this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        orientation = "downRight";
    }
    else if(this.keyboard.isDown(Phaser.Keyboard.DOWN) && this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        orientation = "downLeft";
    }
    else if(this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        orientation = "down";
    }
    else if(this.keyboard.isDown(Phaser.Keyboard.UP)) {
        orientation = "up";
    }

    this.bulletType.fire(orientation);
};
