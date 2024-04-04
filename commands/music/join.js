const { joinVoiceChannel } = require('@discordjs/voice');

function joinCommand(message) {
    const channel = message.member.voice.channel;
    if (!channel) return message.reply('Najpierw dołącz do kanału głosowego!');
    
    joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });
}

module.exports = joinCommand;
