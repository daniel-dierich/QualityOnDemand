const spellChecker = require('spellchecker');
const spellchecker = require('simple-spellchecker');
const exceptions = ["Jinja2","asc","bic","iban"];


var dictionary = spellchecker.getDictionarySync("fr-FR"); 
const separatorsRegex = /\s/     // any whitespace

export default (input) => {
  const words = input.replace(/`/g, '').split(separatorsRegex);
  
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => spellchecker.isMisspelled(word));

  if (mistakes.length > 0) {
    console.log(mistakes);
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
};
