// TODO

var Player = function(game, x, y, target){
    //Here's where we create our player sprite.
    Phaser.Sprite.call(this, game, x, y, 'player');

    //We set the game input as the target
    this.target = target;

    //The anchor is the 'center point' of the sprite. 0.5, 0.5 means it will be aligned and rotated by its center point.
    this.anchor.setTo(0.5, 0.5);

    //Finally we enable physics so we can move the player around (this is how easy physics is in Phaser)
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    //We need a target position for our player to head to
    this.targetPos = {
        x:this.x,
        y:this.y
    };

    //And an easing constant to smooth the movement
    this.easer = 0.5;

    //Health
    this.health = 100;
};

Player.prototype.update = function(){

    //If the target's (which we have assigned as this.game.input) active pointer is down
    if (this.target.activePointer.isDown){
        //Make our new target position the pointers position
        this.targetPos = {
            x: this.target.x,
            y:this.target.y
        };
    }

    //Now work out the velocities by working out the difference between the target and the current position, and use an easer to smooth it.
    var velX = (this.targetPos.x-this.x) / this.easer;
    var velY = (this.targetPos.y-this.y) / this.easer;

    //Set the Players physics body's velocity
    this.body.velocity.setTo(velX, velY);

};

//We give our player a type of Phaser.Sprite and assign it's constructor method.
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
