function HealthPack(game, player, stage, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'healthPack');
    this.configureSpriteBehaviour();
    game.add.existing(this);

    this.subject = player;
    this.stage = stage;

    this.regenFactor = 50;
}

HealthPack.prototype = Object.create(Phaser.Sprite.prototype);
HealthPack.prototype.constructor = HealthPack;

HealthPack.prototype.update = function() {
    this.game.physics.arcade.overlap(this.subject, this, function(player, healthPack) {
        player.regenLife(healthPack.regenFactor);
        healthPack.kill();
    }, null, this);
};

HealthPack.prototype.configureSpriteBehaviour = function() {
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
};

HealthPack.preLoadAssets = function(game) {
    game.load.image('healthPack', 'assets/sprites/healthPack.png');
};