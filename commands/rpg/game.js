// rpg/game.js
const { MessageEmbed } = require('discord.js');

class RPGGame {
    constructor() {
        this.players = new Map(); // Mapa przechowująca stany gry dla każdego użytkownika
        this.rooms = ['Empty Room', 'Treasure Room', 'Enemy Room', 'Healing Room'];
        this.enemies = [
            { name: 'Skeleton', hp: 20, dmgMin: 5, dmgMax: 15 },
            { name: 'Goblin', hp: 30, dmgMin: 8, dmgMax: 25 },
            { name: 'Orc', hp: 45, dmgMin: 12, dmgMax: 30 }
        ];
        this.healingRange = { min: 10, max: 40 };
    }

    getPlayerState(userId) {
        if (!this.players.has(userId)) {
            this.players.set(userId, {
                playerHP: 100,
                playerGold: 0
            });
        }
        return this.players.get(userId);
    }

    exploreRoom(userId, message) {
        const playerState = this.getPlayerState(userId);
        const roomIndex = Math.floor(Math.random() * this.rooms.length);
        const room = this.rooms[roomIndex];
        switch (room) {
            case 'Treasure Room':
                const goldFound = Math.floor(Math.random() * 50) + 1;
                playerState.playerGold += goldFound;
                return `Znalazłeś skrzynię ze skarbami i zyskałeś ${goldFound} golda!`;
            case 'Enemy Room':
                const enemyIndex = Math.floor(Math.random() * this.enemies.length);
                const enemy = this.enemies[enemyIndex];
                return this.fightEnemy(playerState, enemy);
            case 'Healing Room':
                const hpRestored = Math.floor(Math.random() * (this.healingRange.max - this.healingRange.min + 1)) + this.healingRange.min;
                playerState.playerHP = Math.min(100, playerState.playerHP + hpRestored);
                return `Znalazłeś miksturę i odzyskałeś ${hpRestored} HP!`;
            default:
                return `Znalazłeś pusty pokój.`;
        }
    }

    fightEnemy(playerState, enemy, user) {
        let enemyHP = enemy.hp;
        while (playerState.playerHP > 0 && enemyHP > 0) {
            const playerDMG = Math.floor(Math.random() * 26) + 10;
            const enemyDMG = Math.floor(Math.random() * (enemy.dmgMax - enemy.dmgMin + 1)) + enemy.dmgMin;

            enemyHP -= playerDMG;
            playerState.playerHP -= enemyDMG;
        }

        if (playerState.playerHP <= 0) {
            return `Zostałeś pokonany!`;
        } else {
            const goldWon = Math.floor(Math.random() * 50) + 1;
            playerState.playerGold += goldWon;
            return `Pokonałeś ${enemy.name} i zyskałeś ${goldWon} golda!`;
        }
    }

    getStatus(userId, user) {
        const playerState = this.getPlayerState(userId);
        return `HP: ${playerState.playerHP}, Gold: ${playerState.playerGold}`;
    }

    summarizeGame(userId, user) {
        const playerState = this.getPlayerState(userId);
        return `Koniec GRY!\nSkończyłeś z ${playerState.playerHP} HP i ${playerState.playerGold} gold.`;
    }
}

module.exports = RPGGame;
