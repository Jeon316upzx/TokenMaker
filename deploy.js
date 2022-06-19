const Web3 = require("web3");
const HdWalletProvider = require("truffle-hdwallet-provider");
const inboxContract = require("./build/Inbox.sol.json");
require("dotenv").config();

let networks = [
  {
    name: 'RINKEBY',
    infura_url: process.env.INFURA_URL_RINKEBY,
  },
  {
    name: 'ROPSTEN',
    infura_url: process.env.INFURA_URL_ROPSTEN,
  },
  {
    name: 'KOVAN',
    infura_url: process.env.INFURA_URL_KOVAN,
  },
  {
    name: 'GORLI',
    infura_url: process.env.INFURA_URL_GOERLI,
  },
];

for (let network of networks) {
  const provider = new HdWalletProvider(process.env.MNEMONIC, network.infura_url);
  const web3 = new Web3(provider);

  const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  
    const deployed = await new web3.eth.Contract(inboxContract.Inbox.abi)
      .deploy({
        data: inboxContract.Inbox.evm.bytecode.object,
        arguments: [network.name],
      })
      .send({ from: accounts[0], gas: 1000000 });
  
      console.log(`deployed on -> ${network.name} network at address ${deployed.options.address}`);
  };

  deploy()

}





