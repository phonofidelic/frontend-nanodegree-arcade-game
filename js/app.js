//** random number generator **
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min));
}
//** global variables **
var yPos = [150, 235, 320];
var speeds = [50, 300, 500];
var suspGame = false;
var timeoutId;

function delayReset() {
    timeoutId = window.setTimeout(playerReset, 2000);
}

function playerReset() {
    player.x = 202;
    player.y = 465;
    player.sprite = 'images/enemy-bug-small.png';
    suspGame = false;

}

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

    // ** set enemy speed **
    this.x = this.x + speeds[1] * dt;

    //** respawn enemy once it passes off screen **
    if (this.x > 505) {
        this.init();

        //** random respawning y pos **
        this.y = yPos[getRandomInt(0, 3)];
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Enemy2 = function() {
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

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // ** set enemy speed **
    this.x = this.x + speeds[2] * dt;

    //** respawn enemy once it passes off screen **
    if (this.x > 505) {
        this.init();

        //** random respawning y pos **
        this.y = yPos[getRandomInt(0, 3)];
    }
}

// Draw the enemy on the screen, required method for game
Enemy2.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Enemy3 = function() {
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

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //** set enemy speed **
    this.x = this.x - speeds[1] * dt;

    //** respawn enemy once it passes off screen **
    if (this.x < -101) {
        this.init();
        //** random respawning y pos **
        this.y = yPos[getRandomInt(0, 3)];
    }
}

// Draw the enemy on the screen, required method for game
Enemy3.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


//###########################################################################

var Hurt = function() {
    console.log('ouch!')
    this.sprite = 'images/Heart-damage.png';
    this.init();
    allHearts.pop();
}

Hurt.prototype.init = function() {
    this.x = 120;
    this.y = 1;
}

Hurt.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x * dt;
}

//##########################################################################

// Now write your own player class}
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/enemy-bug-small.png';
    // this.spriteL = 'images/enemy-bug-left.png';
    this.spriteDead = 'images/enemy-bug-small-dead.png';
    // this.draw();
    // this.damage();
    // this.update()
    this.x = 202;
    this.y = 465;
}

//** initial player possition **        ** redundant function??? **
// Player.prototype.draw = function() {
//     this.x = 202;
//     this.y = 465;

// }


Player.prototype.update = function() {
    this.checkCollisions();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//** reset player possition if collision is detected **
Player.prototype.checkCollisions = function() {
    for(enemy in allEnemies) {
        if(Math.abs(this.x - allEnemies[enemy].x) <= 20
        && Math.abs(this.y - allEnemies[enemy].y) <= 40) {
            this.damage();
            // this.resetPlayer();
            suspGame = true;
            // this.delay();
            delayReset();


        }
    }
}

Player.prototype.damage = function() {
    this.sprite = this.spriteDead;

}

// Player.prototype.delay = function() {
//     timeoutId = window.setTimeout(this.resetPlayer(), 1000);
// }

Player.prototype.resetPlayer = function() {
    this.x = 202;
    this.y = 465;
    this.sprite = 'images/enemy-bug-small.png';
    suspGame = false;
    // var hurt = new Hurt();
}

Player.prototype.handleInput = function(movement) {
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
    // initiates resetsPlayer function
    if (movement == 'space') {
                this.resetPlayer();
    }
}

//Heart constructor mode ###################################################
var Heart = function() {
    this.sprite = 'images/Heart.png';
    // this.x = xPos;
    this.y = 1;
    this.init();
    // this.render();
}

Heart.prototype.init = function(xPos) {
    this.x = xPos;
    return xPos;
}

Heart.prototype.update = function(dt) {

}

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//###########################################################################

// var HealthBar = function() {
//     this.sprite = 'images/Heart.png';
//     this.draw();
// }

// HealthBar.prototype.draw = function() {
//     this.x = 200;
//     this.y = 400;
// }

// HealthBar.prototype.update = function(dt){
//     this.x = this.x * dt;
// }

// HealthBar.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// }

//###########################################################################

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var allHearts = [];

var enemy = new Enemy;
allEnemies.push(enemy);

var enemy = new Enemy2();
allEnemies.push(enemy);

var enemy = new Enemy3();
allEnemies.push(enemy);


var heart = new Heart();
heart.init(1);
allHearts.push(heart);

var heart = new Heart();
heart.init(50);
allHearts.push(heart);

var heart = new Heart();
heart.init(100);
allHearts.push(heart);


var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});