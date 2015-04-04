
//global variables
var yPos = [150, 235, 320];
var speeds = [200, 300, 500];
var suspGame = false;
var timeoutId;
// Enemies our player must avoid
var Enemy = function (spriteString, spriteSpeed, initPos, bool) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = initPos;
    this.sprite = spriteString;
    this.speed = spriteSpeed;
    this.directionIsRight = bool;
};

// initial emey location
Enemy.prototype.init = function () {
    if (this.directionIsRight === true) {
        this.x = -80;
    } else if (this.directionIsRight === false) {
        this.x = 500
    }
};

//random number generator called by uppdate
Enemy.prototype.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // set enemy speed
    if (this.directionIsRight === true) {   //check enemy direction
        this.x = this.x + speeds[this.speed] * dt;
    } else {
        this.x = this.x - speeds[this.speed] * dt;
    }

    // respawn enemy once it passes off screen
    if ((this.x > 505 && this.directionIsRight === true) || (this.directionIsRight === false && this.x < -500)) {   //check enemy direction
        this.init();

        // random respawning y pos
        this.y = yPos[this.getRandomInt(0, 3)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class}
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/enemy-bug-small.png';
    this.spriteDead = 'images/enemy-bug-small-dead.png';
    this.x = 202;
    this.y = 465;
};

Player.prototype.update = function () {
    this.checkCollisions();
};

// draws Player on canvas
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// kills player and susppends gameplay if collision is detected
Player.prototype.checkCollisions = function () {
    if (suspGame === false) {
        for (var enemy in allEnemies) {
            if (Math.abs(this.x - allEnemies[enemy].x) <= 20 && Math.abs(this.y - allEnemies[enemy].y) <= 40 && suspGame === false) {
                this.sprite = this.spriteDead;
                suspGame = true;
                this.delayReset();
            }
            if (this.y === 50) {
                player.x = 202;
                player.y = 465;
            }
        }
    }
};

// handles Player movement and srite image acording to players direction
Player.prototype.handleInput = function (movement) {
    if (suspGame === false) {
        if (movement == 'left' && this.x > 0) {
            this.sprite = 'images/enemy-bug-small-left.png';
            this.x = this.x - 101;
        }
        if (movement == 'right' && this.x < 400) {
            this.sprite = 'images/enemy-bug-small.png';
            this.x = this.x + 101;
        }
        if (movement == 'up' && this.y > 100) {
            this.sprite = 'images/enemy-bug-small.png';
            this.y = this.y - 83;
        }
        if (movement == 'down' && this.y < 390) {
            this.sprite = 'images/enemy-bug-small-left.png';
            this.y = this.y + 83;
        }
    }
};

// delay player respawn when killed
Player.prototype.delayReset = function () {
    timeoutId = window.setTimeout(this.playerReset, 2000);
};

// reset player position and resume gameplay
Player.prototype.playerReset = function () {
    player.x = 202;
    player.y = 465;
    player.sprite = 'images/enemy-bug-small.png';
    suspGame = false;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

allEnemies.push(new Enemy('images/char-boy.png', 0, 50, true));
allEnemies.push(new Enemy('images/char-cat-girl.png', 2, 50, true));
allEnemies.push(new Enemy('images/char-horn-girl.png', 1, 50, false));

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});