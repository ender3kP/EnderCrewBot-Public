const { Logger } = require('discordjs-logger');

const logger = new Logger({
    logDirectory: './logs', // Katalog, w którym będą przechowywane pliki dziennika
    logFilename: 'discord.log', // Nazwa pliku dziennika
    dateFormat: 'YYYY-MM-DD HH:mm:ss', // Format daty i godziny
    errorLogFilename: 'error.log', // Nazwa pliku dziennika błędów
    timezone: 'Europe/Warsaw' // Strefa czasowa
});

function logEvent(event, ...args) {
    logger.log(`${event}:`, ...args);
}

module.exports = logEvent;