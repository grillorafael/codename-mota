function HealthPack(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'healthPack');
    this.configureSpriteBehaviour();
    game.add.existing(this);

    this.regenFactor = 50;
}

HealthPack.prototype = Object.create(Phaser.Sprite.prototype);
HealthPack.prototype.constructor = HealthPack;

HealthPack.prototype.configureSpriteBehaviour = function() {
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
}

HealthPack.preLoadAssets = function(game) {
    game.load.image('healthPack', 'assets/sprites/healthPack.png');
};