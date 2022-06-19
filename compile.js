const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);


const tokenPath = path.resolve(__dirname, 'contracts','myToken.sol')
const source = fs.readFileSync(tokenPath, 'utf8')



let input = {
    language: 'Solidity',
    sources: {
        'myToken.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

const compiled = solc.compile(JSON.stringify(input));

console.log(compiled,"CONTRACT")

fs.ensureDirSync(buildPath);

contracts = JSON.parse(compiled).contracts



for(let contract in contracts)
{
    fs.outputJsonSync(
      path.resolve(buildPath, contract + '.json'),
      contracts[contract]
  );
}
