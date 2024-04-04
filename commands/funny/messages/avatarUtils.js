const { Permissions } = require('discord.js');

async function sendAvatar(message) {
    if (!message.mentions.users.size) {
        return message.reply('Musisz oznaczyć użytkownika, aby wyświetlić jego awatar.');
    }

    const user = message.mentions.users.first();

    try {
        const avatarUrl = user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });
        await message.channel.send({ files: [avatarUrl] });
    } catch (error) {
        console.error('Wystąpił błąd podczas wysyłania awatara:', error);
        message.reply('Wystąpił błąd podczas pobierania awatara użytkownika.');
    }
}

module.exports = sendAvatar;
