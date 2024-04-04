async function deleteMessages(message, ownerId) {
    if (message.author.id === ownerId) {
        const args = message.content.split(' ');
        if (args.length !== 2) {
            return message.reply('Użycie: !delete <ilość_wiadomości_do_usunięcia>');
        }
        const deleteCount = parseInt(args[1], 10);
        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return message.reply('Podaj liczbę od 1 do 100 jako ilość wiadomości do usunięcia.');
        }
        await message.channel.bulkDelete(deleteCount + 1);
        await message.channel.send(`Usunięto ${deleteCount} wiadomości.`);
    } else {
        message.reply('Nie masz uprawnień do używania tej komendy!');
    }
}

module.exports = deleteMessages;
