var dictionary = require('dictionary-en')
var nspell = require('nspell')
var exceptions = ['eventId', 'eventType', 'eventTime', /* ...and so on */];
var separatorsRegex = /\s/; // any whitespace

function includesNumber(value) {
    return /\d/.test(value);
}

export default ((input) => {
    return new Promise((resolve, reject) => {
        dictionary((err, dict) => {
            if (err) {
                reject(err);
            }
            var spell = nspell(dict);
            var no_special_characters = input.replace(/[^\w\s]/gi, '');
            const words = no_special_characters.split(separatorsRegex);
            var mistakes = words
                .filter((word) => !exceptions.includes(word))
                .filter((word) => !spell.correct(word))
                .filter((word) => word != '')
                .filter((word) => !includesNumber(word));

            if (mistakes.length > 0) {
                resolve({ mistakes: mistakes });
            } else {
                resolve("There were no mistakes");
            }
        });
    });
});
