const spellChecker = require('spellchecker');
var dictionary = require('dictionary-en')
var nspell = require('nspell')
const exceptions = ["Jinja2","asc","bic","iban"];
const separatorsRegex = /\s/     // any whitespace
var mistakes = [];

export default (input) =>{
    dictionary(ondictionary);
    function ondictionary(err, dict) {
      if (err) {
        throw err
      }
        var spell = nspell(dicty)
        
        const words = input.replace(/`/g, '').split(separatorsRegex);
          
        mistakes.push(words
          .filter((word) => !exceptions.includes(word))
          .filter((word) => !spell.correct(word)));
        
        if (mistakes.length > 0) {
          console.log("There are Spelling mistakes")
          return [{
            message: `Spelling mistakes found: ${mistakes.join(', ')}`,
          }];
        }
    }
    console.log("MISTAKES:        " + mistakes);
};
