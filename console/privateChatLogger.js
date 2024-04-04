function privateChatLogger(client) {
    client.on('messageCreate', message => {
        if (message.channel.type === 'DM' && !message.author.bot) {
            console.log(`Wiadomość prywatna od ${message.author.tag}: ${message.content}`);
            // Tutaj możesz dodać kod do zapisywania wiadomości prywatnych w pliku dziennika lub bazy danych, albo przetwarzać je w inny sposób.
        }
    });
}

module.exports = privateChatLogger;
