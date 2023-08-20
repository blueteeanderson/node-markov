/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();
    for(let i=0; i<this.words.length; i++) {
      let curWord = this.words[i];
      let word = this.words[i+1] ? this.words[i+1] : null;
      if(chains.has(curWord)) {
        chains.get(curWord).push(word)
      } else {
        chains.set(curWord, [word])
      }
    }

    this.chains = chains;
    console.log(this.chains)
  }

  randWord(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  }
  /** return random text from chains */
  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    console.log(keys)
    let key = this.randWord(keys);
    console.log(key)
    let txt = [];
    while(txt.length<numWords && key != null) {
      txt.push(key)
      key = this.randWord(keys)
    }

    return txt.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};