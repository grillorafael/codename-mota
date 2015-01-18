//TODO Handle bullet sprite load
function DefaultBullet(game, stage, subject) {
    this.stage = stage;
    this.game = game;
    this.subject = subject;

    this.nextShotAt = 0;
    this.shotDelay = 80;

    this.bulletVelocity = 1000;
    this.damage = 10;
}

DefaultBullet.prototype.configureAnimations = function(bullet) {
    bullet.animations.add('on_going', [0, 1, 2, 3, 4], 24, true);
    bullet.animations.add('impact', [5, 6, 7, 8, 9], 24, false);

    bullet.animations.play('on_going', 24, true);
};

DefaultBullet.prototype.fire = function(orientation) {
    if (this.nextShotAt > this.game.time.now) {
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

    this.game.physics.arcade.collide(this.subject.bulletPool, this.stage.ground, function(collidedBullet, ground) {
        // Kill the bullet
        console.log('Collision');
        collidedBullet.body.velocity.x = 0;
        collidedBullet.body.velocity.y = 0;
        collidedBullet.animations.play('impact', 24, false);
        setTimeout(function() {
            collidedBullet.kill();
        }, 200);
    }, null, this);

    this.subject.bulletPool.add(bullet);
};