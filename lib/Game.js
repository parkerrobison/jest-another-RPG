const inquirer = require("inquirer");
const Player = require('./Player.js');
const Enemy = require('./Enemy.js');


function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        // the arrow function is needed here because a callback would have changed the meaning of
        // 'this' to no longer reference the game object. 
        .then(({ name}) => {
            this.player = new Player(name);

        // test the object creation
        this.startNewBattle();
        });
};

module.exports = Game;