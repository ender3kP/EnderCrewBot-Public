function WelcomeMessages(message) {
    const responses = [
        'Witaj!!!',
        'Elo',
        'Siemanko!',
        'Cześć!',
    ];
    const chosenResponses = responses[Math.floor(Math.random() * responses.length)];
    message.reply(`${chosenResponses}`);
}
module.exports = WelcomeMessages;