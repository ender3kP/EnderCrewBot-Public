function handleEssaCommand(message, cooldowns) {
    // Sprawdź cooldown
    if (cooldowns.has(message.author.id)) {
        const now = Date.now();
        const cooldownTime = cooldowns.get(message.author.id);
        const timeLeft = (cooldownTime + 120000) - now; // Cooldown 2 minuty

        if (timeLeft > 0) {
            return message.reply(`Poczekaj jeszcze ${Math.ceil(timeLeft / 1000)} sekund przed ponownym użyciem komendy.`);
        }
    }

    // Wykonaj komendę 'essa'
    const randomPercentage = Math.floor(Math.random() * 101); // Losowa liczba od 0 do 100

    let response;
    if (randomPercentage >= 50 && randomPercentage <= 70) {
        response = 'Nawet nawet byczku :sunglasses:';
    } else if (randomPercentage >= 20 && randomPercentage <= 49) {
        response = 'Słabiutka essa byczku :slight_frown: :slight_frown:  ';
    } else if (randomPercentage >= 0 && randomPercentage <= 19) {
        response = 'Oj jest naprawdę źle byczku :skull: :skull:  ';
    } else if (randomPercentage >= 71 && randomPercentage <= 99) {
        response = 'Ale essa byczku :sunglasses: :sunglasses:';
    } else {
        response = 'Ale masz esse dzisiaj byczku :sunglasses: :sunglasses: :sunglasses:  ';
    }

    message.reply(`Twoja essa: ${randomPercentage}%. ${response}`);

    // Ustaw czas ostatniego użycia komendy 'essa' w cooldownie
    cooldowns.set(message.author.id, Date.now());
    setTimeout(() => {
        cooldowns.delete(message.author.id);
    }, 120000);
}
module.exports = handleEssaCommand;