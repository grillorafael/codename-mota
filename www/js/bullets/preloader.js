/**
 * Created by rafael on 1/18/15.
 */
function BulletPreloader() {}

BulletPreloader.preloadAssets = function(game) {
    game.load.atlasJSONHash('default_bullet', 'assets/sprites/default_bullet.png', 'assets/sprites/default_bullet.json');
    game.load.spritesheet('scatter_bullet', 'assets/sprites/scatter_bullet.png', 86, 38, 13);
};