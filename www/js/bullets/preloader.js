/**
 * Created by rafael on 1/18/15.
 */
function BulletPreloader() {}

BulletPreloader.preloadAssets = function(game) {
    game.load.spritesheet('default_bullet', 'assets/sprites/default_bullet.png', 82, 74, 10);
};