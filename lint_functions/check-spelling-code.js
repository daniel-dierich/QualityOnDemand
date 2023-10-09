const spellChecker = require('spellchecker');
const exceptions = ["Jinja2","asc","bic","iban"];

const separatorsRegex = /\s/     // any whitespace

export default (input) => {
  console.log("NEW INPUT:       " + String(input));
  const words = input.replace(/`/g, '').split(separatorsRegex);
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => spellChecker.isMisspelled(word));
  

  if (mistakes.length > 0) {
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
};
