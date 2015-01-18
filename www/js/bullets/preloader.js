/**
 * Created by rafael on 1/18/15.
 */
function BulletPreloader() {}

BulletPreloader.preloadAssets = function(game) {
    game.load.spritesheet('default_bullet', 'assets/sprites/default_bullet.png', 82, 74, 10);
    game.load.spritesheet('scatter_bullet', 'assets/sprites/scatter_bullet.png', 86, 38, 13);
};