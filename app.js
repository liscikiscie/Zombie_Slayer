/**
 * Created by jakub on 23.04.2017.
 */
new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        zombieHealth: 100,
        gameIsRunning: false,
        turns: [],
        playerStamina: 100
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.zombieHealth = 100;
            this.playerStamina = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculatePlayerAttDmg();
            this.zombieHealth -= damage;
            if (this.playerStamina <= 90) {
                this.playerStamina += 10;
            } else {
                this.playerStamina = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hit zombie for ' + damage + " Stamina gain " + 10
            });
            if (this.checkWin()) {
                return;
            }
            this.zombieAttacks();
        },
        specialAttack: function () {
            var damage = this.calculatePlayerSpecAttDmg();
            if (this.playerStamina < 30) {
                this.zombieHealth -= 0;

                this.turns.unshift({
                    text: 'Not enough stamina'
                })
            } else {
                this.playerStamina -= 30;
                this.zombieHealth -= damage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hit Zombie by Special Attack for ' + damage + " Stamina lose " + 30
                });
            }
            if (this.checkWin()) {
                return;
            }
            this.zombieAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 91) {
                this.playerHealth += 9;
                this.playerStamina -= 10
            } else if (this.playerStamina < 10) {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 7 & lose 10 stamina '
            });
            this.zombieAttacks();

        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        zombieAttacks: function () {
            var damage = this.calculatezombieAttDmg();
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'zombie hit Player for ' + damage
            });
            this.checkWin();
        },
        calculatezombieAttDmg: function () {
            var min = 5;
            var max = 14;
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        calculatePlayerAttDmg: function () {
            var min = 3;
            var max = 10;
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        calculatePlayerSpecAttDmg: function () {
            var min = 10;
            var max = 15;
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        checkWin: function () {
            if (this.zombieHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            if (this.playerStamina < 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});