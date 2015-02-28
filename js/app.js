// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/char-boy.png';
    this.yPos = [70, 150, 235];
    this.draw();
    this.speeds = [100, 200, 300];
    // this.init();

}
//** initial emey location **
Enemy.prototype.draw = function() {
    this.x = -101;
    // this.y = this.yPos[Math.round(Math.random() * this.yPos.length)];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //** set enemy speed ** TO DO!!!: make random
    this.x = this.x + 200 * dt;                                    //make enemy speed consistent
    // this.x = this.x + this.speeds[Math.round(Math.random())] * dt; //making enemy movement erattic, random speeds
    //** respawn enemy once it passes off screen **
    if (this.x > 505) {
        this.draw();
        //** random respawning y pos **
        this.y = this.yPos[Math.round(Math.random() * this.yPos.length)];
    }

}

//** redundant function object? same as .draw? **
// Enemy.prototype.init = function() {
//     this.x = -101;
// }

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

//** initial player possition **    
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

//** reset player possition if collision is detected **
Player.prototype.checkCollisions = function(dt) {
    for(var enemy in allEnemies) {
        if( Math.abs(this.x - allEnemies[enemy].x) <= 80
         && Math.abs(this.y - allEnemies[enemy].y) <= 60) {
            this.draw();    
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

