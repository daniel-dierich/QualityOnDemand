var dictionary = require('dictionary-en')
var nspell = require('nspell')
var exceptions = ["Jinja2","asc","bic","iban"];
var separatorsRegex = /\s/     // any whitespace
var mistakes = [];

export default (input) =>{
    dictionary(ondictionary);
    function ondictionary(err, dict) {
      if (err) {
        throw err
      }
        var spell = nspell(dict)
        var no_special_characters= input.replace(/[^\w\s]/gi, '')
        const words = no_special_characters.replace(/`/g, '').split(separatorsRegex);
        
        mistakes.push(words
          .filter((word) => !exceptions.includes(word))
          .filter((word) => !spell.correct(word))
          .filter((word) => word!=''));
        
        if (mistakes.length > 0) {
            console.log("MISTAKES:        " + mistakes);
            return [{message: `Spelling mistakes found: ${mistakes}}];
        }
    }
};
