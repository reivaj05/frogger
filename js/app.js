// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = this.initialX = initialX;
    this.y = this.initialY = initialY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=100*dt*this.speed;
    if(this.x > (numCols -1) * colSize)
        this.x = -100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(){
    this.x = this.initialX;
    this.y = this.initialY;
};

// Game player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = this.initialX = Math.floor(numCols/2) * colSize;
    this.y = this.initialY = (numRows -1) * rowSize - Math.floor(rowSize/2);
    this.hasWon = false;
    this.hasLost = false;
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollisions();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkCollisions = function(){
    var playerPosition = {radius: 20, x: this.x, y: this.y},
        payer = this,
        objectRadius = 10;
        calculateDistance = function(objectPosition){
            var dx = playerPosition.x - objectPosition.x,
                dy = playerPosition.y - objectPosition.y,
                distance = Math.sqrt(dx * dx + dy * dy);
            return distance;
        };

    allEnemies.forEach(function(enemy){
        var distance = calculateDistance({radius: objectRadius, x: enemy.x, y: enemy.y});
        if (distance < playerPosition.radius + objectRadius) {
            player.hasLost = true;
            return;
        }
    });

    for(var i=0; i<gems.length; i++){

        var gem = gems[i],
            distance = calculateDistance({radius: objectRadius, x: gem.x, y: gem.y});
        if (distance < playerPosition.radius + objectRadius) {
            score+= 10;
            gems.splice(i,1);
            break;
        }
    }
};

Player.prototype.reset = function(){
    this.x = this.initialX;
    this.y = this.initialY;
    this.hasWon = this.hasLost = false;
};

Player.prototype.handleInput = function(keyPressed) {

    if(keyPressed){
        switch(keyPressed){
            case 'up':
                this.y-= rowSize;
                if(this.y < 0){
                    this.y = - Math.floor(rowSize/2);
                    this.hasWon = true;
                }
                break;
            case 'down':
                this.y+= rowSize;
                if(this.y > (numRows -1) * rowSize)
                    this.y =  this.initialY;
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

var Gem = function(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprite = 'images/blue-gem.png';
};

// Draw the gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var score = 0;
var gems = [];
var allEnemies = [];
for (var i=0; i< numRows-2; i++){
    allEnemies.push(new Enemy(getRandomArbitrary(-1000, -10), i*rowSize+rowSize/2, 5));
    allEnemies.push(new Enemy(getRandomArbitrary(-3000, -1000), i*rowSize+rowSize/2, 5));
    allEnemies.push(new Enemy(getRandomArbitrary(-5000, -3000), i*rowSize+rowSize/2, 5));
}
// for (var i=0; i<numRows-1; i++)
    // gems.push(new Gem(300, i*rowSize+rowSize/2, null));
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
