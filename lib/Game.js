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

Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:');
    // this allows an object to be displayed as a table.
    console.table(this.player.getStats());
    // this displays enemy stats
    console.log(this.currentEnemy.getDescription());
    this.battle();
};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You are all out of potions!");
                        return;
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            // index+1 gives us a human-readable number. Map will give us an array of strings so that inquirer can use this info. 
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            // split removes the : to give us an array of ['number selected', 'potion name']
                            const potionDetails = action.split(': ');
                            // subtracting 1 puts us back at the original array index
                            this.player.usePotion(potionDetails [0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        });
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            })
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

// if player turn:
// prompt user to attack or use potion
// if using a potion
// -display a list of potion objects to user
// -apply selected potion effect to player
// if attacking
// -subtract health from enemy based on player attack

// if enemy turn:
// subtract player health based on enemy attack value

module.exports = Game;