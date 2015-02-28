// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/char-boy.png';
    this.draw();
    this.init();

}

Enemy.prototype.draw = function() {
    this.x = -101;
    this.y = 70;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //** set enemy speed **
    this.x = this.x + 100 * dt;
    //** respawn enemy once it passes off screen **
    if (this.x > 505) {
        this.init();
    }

}

Enemy.prototype.init = function() {
    this.x = -101;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // var enemyArrayLength = this.sprite.length;
    // for (var i in this.sprite) {
    //     ctx.drawImage(Resources.get(this.sprite[i]), i.x, i.y);
    // }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/enemy-bug.png';
    this.spriteL = 'images-enemy-bug-left.png';
    this.draw();
    this.update();
}
    
Player.prototype.draw = function() {
    this.x = 202;
    this.y = 390;
}

Player.prototype.update = function(dt) {
    this.checkCollisions();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.checkCollisions = function(dt) {
    for(var enemy in allEnemies) {
        if( Math.abs(this.x - allEnemies[enemy].x) <= 40
         && Math.abs(this.y - allEnemies[enemy].y) <= 40) {
            allEnemies[enemy].onCollision(this);    
        }
    }
    
}

Player.prototype.handleInput = function(movement) {
    if (movement == 'left' && this.x > 0) 
        this.x = this.x - 101;
        this.spriteL;
        // console.log('left');
    
    if (movement == 'right' && this.x < 400) 
        this.x = this.x + 101;
        // console.log('right');
    
    if (movement == 'up' && this.y > 0) 
            this.y = this.y - 83;
            // console.log('up');
    
    if (movement == 'down' && this.y < 390) 
        this.y = this.y + 83;
        // console.log('down');
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

