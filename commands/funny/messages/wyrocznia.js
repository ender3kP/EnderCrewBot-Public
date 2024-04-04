function wyroczniaCommand(message) {
    const responses = [
        'tak', 'tak', 'tak', 'tak', 'tak',  // 49% na "tak"
        'nie', 'nie', 'nie', 'nie', 'nie',  // 49% na "nie"
        'nie wiem',                           // 1% na "nie wiem"
        'sprawdź esse'
    ];

    const chosenResponse = responses[Math.floor(Math.random() * responses.length)];
    message.reply(`🔮 Wyrocznia mówi: ${chosenResponse}`);
}

module.exports = wyroczniaCommand;