function playRockPaperScissors(message, args) {
    const choices = ['kamien', 'papier', 'nozyce'];
    const userChoice = args[0]?.toLowerCase();
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    if (!choices.includes(userChoice)) {
        message.reply('Podaj poprawny wybór: kamien, papier, lub nozyce.');
        return;
    }

    message.reply(`Twój wybór: ${userChoice}\nMój wybór: ${botChoice}`);
    if (userChoice === botChoice) {
        message.channel.send('Remis!');
    } else if (
        (userChoice === 'kamien' && botChoice === 'nozyce') ||
        (userChoice === 'papier' && botChoice === 'kamien') ||
        (userChoice === 'nozyce' && botChoice === 'papier')
    ) {
        message.channel.send('Gratulacje, wygrałeś!');
    } else {
        message.channel.send('Niestety, przegrałeś.');
    }
}
module.exports = playRockPaperScissors; 