import * as dotenv from 'dotenv';
import * as EtherscanApi from 'etherscan-api';

var api = null;

async function init() {
  dotenv.config();
  var etherscanApiKey = process.env.ETHERSCAN_API_KEY;
  if (! etherscanApiKey) { throw new Error('Missing ETHERSCAN_API_KEY') }
  api = EtherscanApi.init(etherscanApiKey);
}
  
async function main() {
  try {
    await init();
    var balance = (await api.account.balance('0x860c4604fe1125ea43f81e613e7afb2aa49546aa')).result;
    console.log("Robbie has " + (balance / 1000000000000000000).toFixed(2).toString() + " ETH");
  } catch(error) {
    console.log(error)
  }
}

main();
