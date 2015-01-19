//
function DefaultBullet(game, stage, subject) {
    this.stage = stage;
    this.game = game;
    this.subject = subject;

    this.nextShotAt = 0;
    this.shotDelay = 80;

    this.bulletVelocity = 1000;
    this.damage = 10;

    this.RELOAD_TIMEOUT = 2000;
    this.BULLETS_UNTIL_RELOAD = 50;
    this.reloadStarted = this.game.time.now;
    this.bulletsSinceLastReload = 0;
    this.reloading = false;
}

DefaultBullet.prototype.configureAnimations = function(bullet) {
    bullet.animations.add('on_going', [0, 1, 2, 3], 24, true);
    bullet.animations.add('impact', [4, 5, 6, 7, 8, 9], 24, false).killOnComplete = true;

    bullet.animations.play('on_going', 24, true);
};

DefaultBullet.prototype.update = function() {
    this.game.physics.arcade.collide(this.subject.bulletPool, this.stage.ground, function(collidedBullet, ground) {
        collidedBullet.angle = Math.floor(Math.random() * 180) + -180;
        collidedBullet.body.velocity.x = 0;
        collidedBullet.body.velocity.y = 0;
        collidedBullet.animations.play('impact', 24, false);
    }, null, this);
};

DefaultBullet.prototype.fire = function(orientation) {
    if (this.nextShotAt > this.game.time.now) {
        return;
    }

    if(this.checkReload()) {
        return;
    }

    this.nextShotAt = this.game.time.now + this.shotDelay;

    // TODO Enhance player height
    var bullet = this.game.add.sprite(this.subject.x + 20, this.subject.y, 'default_bullet');

    // Check if bullets have collided with the ground
    bullet.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.body.allowGravity = false;

    var velocityX = this.bulletVelocity;
    var velocityY = 0;

    var angle = 0;
    if(orientation == 'left') {
        velocityX = -this.bulletVelocity;
        angle = -180;
    }
    else if(orientation == 'right') {
        velocityX = this.bulletVelocity;
    }
    else if(orientation == 'upperRight') {
        velocityX = this.bulletVelocity;
        velocityY = -this.bulletVelocity;
        angle = -45;
    }
    else if(orientation == 'upperLeft') {
        velocityX = -this.bulletVelocity;
        velocityY = -this.bulletVelocity;
        angle = -135;
    }
    else if(orientation == 'downLeft') {
        velocityX = -this.bulletVelocity;
        velocityY = this.bulletVelocity;
        angle = 135;
    }
    else if(orientation == 'downRight') {
        velocityX = this.bulletVelocity;
        velocityY = this.bulletVelocity;
        angle = 45
    }
    else if(orientation == 'up') {
        velocityY = -this.bulletVelocity;
        velocityX = 0;
        angle = -90;
    }
    else if(orientation == 'down') {
        velocityX = 0;
        velocityY = this.bulletVelocity;
        angle = -90;
    }

    bullet.body.velocity.x = velocityX;
    bullet.body.velocity.y = velocityY;
    bullet.angle = angle;

    this.configureAnimations(bullet);

    this.subject.bulletPool.add(bullet);
};

DefaultBullet.prototype.checkReload = function() {
    if(this.reloading && (this.game.time.now - this.reloadStarted) >= this.RELOAD_TIMEOUT) {
        this.reloading = false;
        this.bulletsSinceLastReload = 0;
    }
    if(this.reloading) {
        return true;
    }
    if(this.bulletsSinceLastReload >= this.BULLETS_UNTIL_RELOAD && !this.reloading) {
        this.reloading = true;
        this.reloadStarted = this.game.time.now;
    }
    else {
        this.bulletsSinceLastReload++;
    }

    return false;
};