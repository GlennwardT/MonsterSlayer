new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        playerAttackMin: 3,
        playerAttackMax: 10,
        playerSpAttackMin: 5,
        playerSpAttackMax: 13,
        monsterHealth: 100,
        monsterAttackMin: 2,
        monsterAttackMax: 12,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function(){
            var damage = this.calcDmg(this.playerAttackMin, this.playerAttackMax);
            this.monsterHealth -= damage;
            this.logTurn('Player','Attack', damage);
            this.monsterAttack();
            this.checkGameEnd();
        },
        specialAttack: function(){
            var damage = this.calcDmg(this.playerSpAttackMin, this.playerSpAttackMax);
            this.monsterHealth -= damage;
            this.logTurn('Player','Special Attack', damage);
            this.monsterAttack();
            this.checkGameEnd();
        },
        heal: function(){
            var healed;
            if (this.playerHealth <= 90) {
                healed = 10;
            } else {
                healed = 100 - this.playerHealth;
            }
            this.playerHealth += healed;
            this.logTurn('Player','Heal',healed)
            this.monsterAttack();
            this.checkGameEnd();
        },
        giveUp: function(){
            this.logTurn('Player','Gave Up','');
            this.gameIsRunning = false;
        },
        monsterAttack: function(){
            var damage = this.calcDmg(this.monsterAttackMin, this.monsterAttackMax);
            this.playerHealth -= damage;
            this.logTurn('Monster','Attack',damage);
        },
        calcDmg: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkGameEnd: function(){
            if(this.monsterHealth <= 0 && this.playerHealth > 0 && this.gameIsRunning){
                if(confirm("You win!\nPlay Again?")){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                } 
            } 
            else if(this.playerHealth <= 0 && this.monsterHealth > 0 && this.gameIsRunning){
                if(confirm("You lose!\nPlay Again?")){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
            }
            else if (this.playerHealth <= 0 && this.monsterHealth <= 0 && this.gameIsRunning) {
                if(confirm("It was a draw!\nPlay Again?")){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
            }
             
        },
        logTurn: function(entity, action, value){
            this.turns.unshift({
                entity: entity,
                action: action,
                value: value
            });

            console.log(this.turns);
        }

    }
});