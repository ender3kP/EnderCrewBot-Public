const { Client, Intents ,GatewayIntentBits, SlashCommandBuilder, Embed, Events ,ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, 'data', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = config.token;
const helpCommand = require('./commands/admin/helpCommand');
const wyroczniaCommand = require('./commands/funny/messages/wyrocznia');
const sendAvatar = require('./commands/funny/messages/avatarUtils');
const playRockPaperScissors = require('./commands/funny/messages/playRockPaperScissors');
const handleEssaCommand = require('./commands/funny/messages/handleEssaCommand');
const cooldowns = new Map();
const sendRandomCatGif = require('./commands/funny/gifs/catMessage');
const cooldownTime = 8 * 60 * 1000;
const RPGGame = require('./commands/rpg/game');
const privateChatLogger = require('./console/privateChatLogger.js');
const games = new Map(); 
const ahaMessage = require('./commands/funny/gifs/ahaMessage');
const joinCommand = require('./commands/music/join');
const playCommand = require('./commands/music/play');
const leaveCommand = require('./commands/music/leave');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
});
const prefix = '$';
const logger = require('./console/logger');
const deleteMessages = require('./commands/admin/messagesUtils');
const ownerId = 'enter your Discord ID here'; 
const actvs = [
    "$help",
    "GOTUJE KAPUŚNIAK",
    "$help",
];
const welcomeMessages = require('./commands/funny/messages/WelcomeMessages');
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
client.on('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);
  client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
  setInterval(() => {
      client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
  }, 12000);
});
client.on(Events.ClientReady, () => logger.info('Bot jest online'));
client.on(Events.Debug, m => logger.debug(m));
client.on(Events.Warn, m => logger.warn(m));
client.on(Events.Error, m => logger.error(m));
privateChatLogger(client); 

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // Sprawdź czy wiadomość zaczyna się od prefixu
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'delete') {
        await deleteMessages(message, ownerId);
    }
});
client.on('messageCreate', message => {
    if (!message.author.bot && (message.content.toLowerCase().includes('siema') || message.content.toLowerCase().includes('elo') || message.content.toLowerCase().includes('witam') || message.content.toLowerCase().includes('cześć'))) {
        welcomeMessages(message);
    }
    if (!message.author.bot && message.content.toLowerCase().includes('aha')) {
        ahaMessage(message);
    }
    if (!message.author.bot && message.content.toLowerCase().includes('cat')  || message.content.toLowerCase().includes('kotek') || message.content.toLowerCase().includes('kot') || message.content.toLowerCase().includes('cats')) {   
        sendRandomCatGif(message);
    }
});
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        helpCommand(message);
    }
    if (command === 'wyrocznia') {
        wyroczniaCommand(message);
    }
    if (command === 'rps') {
        playRockPaperScissors(message, args);
    } 
    if (command === 'avatar') {
        sendAvatar(message);
    }
    if (command === 'essa') {
        handleEssaCommand(message, cooldowns);
    }

});
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const userId = message.author.id;
    if (!games.has(userId)) {
        games.set(userId, new RPGGame());
    }
    const game = games.get(userId);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'rpg') {
        message.channel.send('Witamy w grze RPG! Użyj `$explore`, aby rozpocząć swoją przygodę.');
    } else if (command === 'explore') {
        const result = game.exploreRoom(userId);
        message.channel.send(result);
        message.channel.send(`Aktualny status: ${game.getStatus(userId)}`);
    } else if (command === 'status') {
        message.channel.send(`Aktualny status: ${game.getStatus(userId)}`);
    }

    if (game.getPlayerState(userId).playerHP <= 0) {
        message.channel.send(game.summarizeGame(userId));
        games.delete(userId); // Usuń grę z mapy, gdy gracz przegra
    }
});
////////////////////////////////
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'join') {
        joinCommand(message);
    } else if (command === 'play') {
        playCommand(message, args);
    } else if (command === 'leave') {
        leaveCommand(message);
    }
});
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
client.login(token); 