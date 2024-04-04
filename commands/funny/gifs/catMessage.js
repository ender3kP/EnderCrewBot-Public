const fs = require('fs');
const gifFolder = './catGif'; //definicja folderu gify
const path = require('path');

function sendRandomCatGif(message){
    fs.readdir(gifFolder, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        const gifFiles = files.filter(file => file.endsWith('.gif'));
        if (gifFiles.length === 0) {
            message.channel.send('Brak plików GIF w folderze "gify".');
            return;
        }

        const randomIndex = Math.floor(Math.random() * gifFiles.length);
        const randomGif = path.join(gifFolder, gifFiles[randomIndex]);
        message.channel.send({ files: [randomGif] });
    });
}
module.exports = sendRandomCatGif;