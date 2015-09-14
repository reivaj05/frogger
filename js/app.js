// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 205;
    this.y = 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Game player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = this.initial_x = Math.floor(numCols/2) * colSize;
    this.y = this.initial_y = (numRows -1) * rowSize - Math.floor(rowSize/2);
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    if(keyPressed){
        switch(keyPressed){
            case 'up':
                this.y-= rowSize;
                if(this.y < 0)
                    this.y = - Math.floor(rowSize/2);
                break;
            case 'down':
                this.y+= rowSize;
                if(this.y > (numRows -1) * rowSize)
                    this.y =  this.initial_y;
                break;
            case 'left':
                this.x-= colSize;
                if(this.x < 0)
                    this.x = 0;
                break;
            case 'right':
                this.x+= colSize;
                if(this.x > (numCols -1) * colSize)
                    this.x = (numCols -1) * colSize;
                break;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy()];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
