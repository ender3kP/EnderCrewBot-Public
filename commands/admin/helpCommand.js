// commands.js
const { EmbedBuilder } = require('discord.js');

function helpCommand(message) {
    const embed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle('COMMAND HELPER')
	.setAuthor({ name: 'EnderCrewBOT', iconURL: 'https://imgur.com/76DNX1p'})
	.setDescription('Lista Dostępnych Komend:')
	.setThumbnail('https://imgur.com/76DNX1p')
	.addFields(
		{ name: 'wyrocznia', value: 'Odpowiadana na pytania użytkowników' },
        { name: 'essa', value: 'Pozwala sprawdzić poziom essy' },
        { name: 'rps', value: 'Pozwala zagrać z botem w papier, kamień, nożyce' },
        { name: 'avatar', value: 'Pozwala sprawdzić awatar oznaczonego użytkownika' },
        { name: 'rpg', value: 'Pozwala zagrać w prostą grę RPG (demo)' },
		{ name: '\u200B', value: '\u200B' },
	)
	.addFields({ name: 'Prefix', value: 'Mój prefix to `$`', inline: true })
	.setImage('https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/kapusniak-z-boczkiem-i-kielbasa.jpg')
	.setTimestamp()
	.setFooter({ text: 'Bot użytkownika Ender3k', iconURL: 'https://imgur.com/76DNX1p' });

    message.channel.send({ embeds: [embed] });
}

module.exports = helpCommand;
