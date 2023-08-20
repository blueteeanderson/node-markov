/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require("process");

function makeText(data) {
    mm = new markov.MarkovMachine(data)
    console.log(mm.makeText());
}

function fromFile (path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(err);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        // otherwise success
        makeText(data);
    });
}

async function fromUrl(url) {
    let resp;
  
    try {
      resp = await axios.get(url);
      make(resp.data.replace( /(<([^>]+)>)/ig, ''))
    } catch (err) {
      console.error(`Cannot read URL: ${url}: ${err}`);
      process.exit(1);
    }
  }

let [method,path] = process.argv.slice(2);

if(method ==="file") {
    fromFile(path)
} else if (method === 'url') {
    fromUrl(path)
} else {
    console.log(`Could not find method ${method}`)
}