const { getVoiceConnection } = require('@discordjs/voice');

function leaveCommand(message) {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) return message.reply('Bot nie jest obecnie połączony z kanałem głosowym.');

    connection.destroy();
}

module.exports = leaveCommand;
