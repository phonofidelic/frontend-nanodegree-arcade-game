//** random number generator **
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min));
}
//** global variables **
// var sprites = [
//     sprite1 = 'images/char-boy.png',
//     sprite2 = 'images/char-cat-girl.png',
//     sprite3 = 'images/char-horn-girl.png'
// ];


var yPos = [150, 235, 320];
var speeds = [50, 300, 500];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/char-boy.png';
    this.init();

}
//** initial emey location **
Enemy.prototype.init = function() {
    this.x = -101;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + speeds[1] * dt;

    //** respawn enemy once it passes off screen **
    if (this.x > 505) {
        this.init();

        //** random respawning y pos **
        this.y = yPos[getRandomInt(0, 3)];
    }

}

// // Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Enemy2 = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/char-cat-girl.png';
    this.init();

}

//** initial emey location **
Enemy2.prototype.init = function() {
    this.x = -101;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy2.prototype.update = function(dt) {

//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.

//     //** set enemy speed ** TO DO!!!: make random
    this.x = this.x + speeds[2] * dt;                                    //make enemy speed consistent
//     // this.x = this.x + this.speeds[getRandomInt(0, 3)] * dt; //making enemy movement erattic, random speeds

//     //** respawn enemy once it passes off screen **
    if (this.x > 505) {
        this.init();
        //** random respawning y pos **
        this.y = yPos[getRandomInt(0, 3)];
        // console.log(this.y);
    }

}

// // Draw the enemy on the screen, required method for game
Enemy2.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Enemy3 = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/char-horn-girl.png';
    this.init();

}

//** initial emey location **
Enemy3.prototype.init = function() {
    this.x = 505;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy3.prototype.update = function(dt) {

//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.

//     //** set enemy speed ** TO DO!!!: make random
    this.x = this.x - speeds[1] * dt;                                    //make enemy speed consistent
//     // this.x = this.x + this.speeds[getRandomInt(0, 3)] * dt; //making enemy movement erattic, random speeds

//     //** respawn enemy once it passes off screen **
    if (this.x < -101) {
        this.init();
        //** random respawning y pos **
        this.y = yPos[getRandomInt(0, 3)];
        // console.log(this.y);
    }

}

// // Draw the enemy on the screen, required method for game
Enemy3.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/enemy-bug-small.png';
    this.spriteL = 'images/enemy-bug-left.png';
    this.spriteDead = 'images/enemy-bug-small-dead.png';
    this.draw();
    // this.update()
}

//** initial player possition **
Player.prototype.draw = function() {
    this.x = 202;
    this.y = 465;
}

//** redundant function??? **
Player.prototype.update = function(dt) {
    this.checkCollisions();
}

Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.damage = function() {
    this.health = 'images/Heart.png';

}

//** reset player possition if collision is detected **
Player.prototype.checkCollisions = function(dt) {
    for(var enemy in allEnemies) {
        if( Math.abs(this.x - allEnemies[enemy].x) <= 20
         && Math.abs(this.y - allEnemies[enemy].y) <= 40) {
            // this.draw();
            this.sprite = this.spriteDead;
        }
    }
}

Player.prototype.handleInput = function(movement) {
    if (movement == 'left' && this.x > 0) {
        this.sprite = 'images/enemy-bug-small-left.png';
        this.x = this.x - 101;
    }
    if (movement == 'right' && this.x < 400) {
        this.sprite = 'images/enemy-bug-small.png';
        this.x = this.x + 101;
    }
    if (movement == 'up' && this.y > 100) {
        this.sprite = 'images/enemy-bug-small.png'
        this.y = this.y - 83;
    }
    if (movement == 'down' && this.y < 390) {
        this.y = this.y + 83;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemy = new Enemy;
allEnemies.push(enemy);

var enemy = new Enemy2();
allEnemies.push(enemy);

var enemy = new Enemy3();
allEnemies.push(enemy);


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