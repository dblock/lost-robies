import * as _ from 'lodash';
import * as EtherscanApi from 'etherscan-api';
import * as InputDataDecoder from 'ethereum-input-data-decoder';
import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

var api = null;

async function listAllTransactions(account) {
  var page = 1;
  var all = [];
  var results = [];

  try {
    while(true) {
      results = (await api.account.txlist(account, 1, 'latest', page, 100, 'asc')).result;
      all = all.concat(results);    
      page += 1;
    }
  } catch {

  }

  return all;
}

async function listRobbies() {
  // Robbie's account
  var videodrome = '0x860c4604fe1125ea43f81e613e7afb2aa49546aa';
  var superrare = '0x41a322b28d0ff354040e2cbc676f0320d8c8850d';

  var abi = JSON.parse((await api.contract.getabi(superrare)).result);
  var inputDataDecoder = new InputDataDecoder(abi);

  var balance = (await api.account.balance(videodrome)).result;
  console.log("Robbie has " + (balance / 1000000000000000000).toFixed(2).toString() + " ETH");

  // enumerate transactions that generated Robbies
  const txs = await listAllTransactions(videodrome);
  console.log("He has made " + txs.length + " transactions.");

  const srTokens = _.filter(txs, (tx) => { return tx.to.toString() == superrare })
  console.log("He has interacted " + srTokens.length + " times with the SR contract.");

  var robbies = [];

  for (const tx of srTokens) {
    const decodedInputData = inputDataDecoder.decodeData(tx.input);
    const ipfsUrl = decodedInputData.inputs[0];
    if (_.isString(ipfsUrl) && _.startsWith(ipfsUrl, "https://")) {
      const metadata = (await axios.get(decodedInputData.inputs[0])).data;
      if (_.startsWith(metadata.name, 'AI Generated Nude Portrait #7 Frame ')) {
        robbies.push({
          tx: tx,
          frame: parseInt(metadata.name.substring(37)),
          ...metadata
        });
      }
    }
  }

  return _.sortBy(robbies, ['frame']);
}

async function loadOrListRobbies() {
  const filename = 'data/ai-generated-nude-portraits-7.json';
  if (fs.existsSync(filename)) {
    var data = Buffer.from(await fs.readFileSync(filename));
    return JSON.parse(data.toString());
  } else {
    var robbies = await listRobbies();
    console.log("Retrieved " + robbies.length + " AI Generated Nude Portrait #7 Frames.");
    await fs.writeFileSync(filename, JSON.stringify(robbies, null, 2));
    return robbies;
  }
}

async function init() {
  dotenv.config();
  var etherscanApiKey = process.env.ETHERSCAN_API_KEY;
  if (! etherscanApiKey) { throw new Error('Missing ETHERSCAN_API_KEY') }
  api = EtherscanApi.init(etherscanApiKey);
}

async function main() {
  try
  {
    await init();
    var robbies = await loadOrListRobbies();
    console.log("Working with " + robbies.length + " AI Generated Nude Portrait #7 Frames.");
  } catch(error) {
    console.log(error)
  }
}

main();