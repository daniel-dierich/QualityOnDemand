const spellChecker = require('spellchecker');
const exceptions = ["Jinja2","asc","bic","iban"];

const separatorsRegex = /\s/     // any whitespace

export default (input) => {
  const words = input.replace(/`/g, '').split(separatorsRegex);
  for (var x in words){
    if (spellChecker.isMisspelled(x) == true){
      const mis = x;
    }
  }
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => spellChecker.isMisspelled(word));
    console.log(mis);

  if (mistakes.length > 0) {
    console.log(mistakes);
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
};
