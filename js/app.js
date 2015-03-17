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


//*** health bar **
var Heart1 = function() {
    this.sprite = 'images/Heart.png';
    this.sprite2 = 'images/Heart-damage.png';
    this.init();
}

//** initial emey location **
Heart1.prototype.init = function() {
    this.x = 1;
    this.y = 1;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Heart1.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //** set enemy speed **
    this.x * dt;                      //make enemy speed consistent
}

// Draw the enemy on the screen, required method for game
Heart1.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Heart1.prototype.damage = function() {
    this.sprite = this.sprite2;
}

var Heart2 = function() {
    this.sprite = 'images/Heart.png';
    this.sprite2 = 'images/Heart-damage.png';
    this.init();
}

//** initial emey location **
Heart2.prototype.init = function() {
    this.x = 60;
    this.y = 1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Heart2.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x * dt;
}

// Draw the enemy on the screen, required method for game
Heart2.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Heart3 = function() {
    this.sprite = 'images/Heart.png';
    this.sprite2 = 'images/Heart-damage.png';
    this.init();
}

//** initial emey location **
Heart3.prototype.init = function() {
    this.x = 120;
    this.y = 1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Heart3.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x * dt;
}

// Draw the enemy on the screen, required method for game
Heart3.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class}
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/enemy-bug-small.png';
    this.spriteL = 'images/enemy-bug-left.png';
    this.spriteDead = 'images/enemy-bug-small-dead.png';
    this.draw();
    // this.damage();
    // this.update()
}

//** initial player possition **
Player.prototype.draw = function() {
    this.x = 202;
    this.y = 465;
}

//** redundant function??? **
Player.prototype.update = function() {
    this.checkCollisions();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//** reset player possition if collision is detected **
Player.prototype.checkCollisions = function() {
    for(var enemy in allEnemies) {                                     //!!! 'enemy' already declared?
        if( Math.abs(this.x - allEnemies[enemy].x) <= 20
        && Math.abs(this.y - allEnemies[enemy].y) <= 40) {
            this.damage();




            // this.sprite = this.spriteDead;  //** add while-loop to hold dead bug in place untill ready to respawn att init pos.


            // var popped = allHearts.pop();

            // this.draw();
        }
    }
}

Player.prototype.damage = function() {
    this.sprite = this.spriteDead;
    // allHearts.pop();

    Heart1.sprite = Heart1.sprite2;
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
        this.y = this.y - 83;
    }
    if (movement == 'down' && this.y < 390) {
        this.y = this.y + 83;
    }
}

// //constructor mode
// var Heart = function(xPos) {
//     this.sprite = 'images/Heart.png';
//     this.x = xPos;
//     this.y = 1;
//     this.render();
// }

// Heart.prototype.init = function(xPos) {
//     this.x = xPos;
//     this.y = 1;
// }

// Heart.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// }

//**
// var HealthBar = function() {
//     this.sprite = 'images/Heart.png';
//     this.draw();
// }

// HealthBar.prototype.draw = function() {
//     this.x = 200;
//     this.y = 400;
// }

// // HealthBar.prototype.update = function(dt){
// //     this.x = this.x * dt;
// // }

// HealthBar.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// }

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

// var heart = new Heart(10);
// // heart.render();
// allHearts.push(heart);

var heart = new Heart1();
allHearts.push(heart);

var heart = new Heart2();
allHearts.push(heart);

var heart = new Heart3();
allHearts.push(heart);

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