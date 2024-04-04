const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core-discord');

async function playCommand(message, args) {
    const channel = message.member.voice.channel;
    if (!channel) return message.reply('Najpierw dołącz do kanału głosowego!');

    const link = args[0];
    if (!link) return message.reply('Podaj link do piosenki z YouTube.');

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });

    const player = createAudioPlayer();

    try {
        const stream = await ytdl(link, { filter: 'audioonly', quality: 'highestaudio' });
        const resource = createAudioResource(stream, { inlineVolume: true });

        player.play(resource);
        connection.subscribe(player);

        player.on('error', error => {
            console.error('Wystąpił błąd podczas odtwarzania:', error);
        });

        message.reply('Puszczam muzykę...');
    } catch (error) {
        console.error('Wystąpił błąd podczas pobierania strumienia audio:', error);
        message.reply('Wystąpił błąd podczas pobierania strumienia audio z YouTube.');
    }
}

module.exports = playCommand;
