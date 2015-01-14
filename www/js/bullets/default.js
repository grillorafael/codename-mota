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

DefaultBullet.prototype.fire = function() {
    if (this.nextShotAt > this.game.time.now) {
        return;
    }

    this.nextShotAt = this.game.time.now + this.shotDelay;

    // TODO Enhance player height
    var bullet = this.game.add.sprite(this.subject.x + 20, this.subject.y, 'bullet');

    // Check if bullets have collided with the ground
    bullet.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.body.allowGravity = false;
    bullet.body.velocity.x = this.bulletVelocity;

    this.game.physics.arcade.collide(this.subject.bulletPool, this.stage.ground, function(collidedBullet, ground) {
        // Kill the bullet
        console.log('Collision');
        collidedBullet.kill();
    }, null, this);

    this.subject.bulletPool.add(bullet);
};