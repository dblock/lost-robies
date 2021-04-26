import * as _ from 'lodash';
import * as EtherscanApi from 'etherscan-api';
import * as InputDataDecoder from 'ethereum-input-data-decoder';
import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'node:constants';

var api = null;
var superrare = '0x41a322b28d0ff354040e2cbc676f0320d8c8850d'; // contract

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

function frameToTokenId(frameNumber) {
  return 190 + frameNumber;
}

function frameUrl(frameNumber) {
  return "https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-" + frameNumber.toString() + "-" + (frameToTokenId(frameNumber)).toString();
}

async function getLogs(frame) {
  try {
    var topic = '0x' + frameToTokenId(frame).toString(16).padStart(64, '0');

    var logs = await api.log.getLogs(
      superrare, // address
      null, // fromBlock
      null, // toBlock
      null, // topic0, sale
      null, // topic0_1_opr
      null, // topic1
      null, // topic1_2_opr
      null, // topic2
      null, // topic2_3_opr
      topic, // '0x0000000000000000000000000000000000000000000000000000000000000126', // topic3
      null
    );

    return logs.result;
  } catch (error) {
    if (error !== 'No records found') {
      throw(error);
    }
    return [];
  }
}

async function loadOrRetrieveLogs(robbies) {
  const filename = 'data/ai-generated-nude-portraits-7-logs.json';
  if (fs.existsSync(filename)) {
    var data = Buffer.from(await fs.readFileSync(filename));
    return JSON.parse(data.toString());
  } else {
    var all = [];
    for (const robbie of robbies) {
      var logs = await getLogs(robbie.frame);
  
      all.push({
        logs: logs,
        ...robbie
      });

      if (logs.length > 0) {
        console.log("Retrieved " + logs.length + " log entries for frame " + robbie.frame + " ...");
      }

      await new Promise(r => setTimeout(r, 500));
    }  
    await fs.writeFileSync(filename, JSON.stringify(all, null, 2));
    return all;
  }
}

async function main() {
  try
  {
    await init();
    var robbies = await loadOrListRobbies();
    console.log("Working with " + robbies.length + " AI Generated Nude Portrait #7 Frames.");

    var robbiesWithLogs = await loadOrRetrieveLogs(robbies);

    for(const robbie of robbiesWithLogs) {    
      
      var sales = _.filter(robbie.logs, (log) => {
        return log.topics[0] == '0x16dd16959a056953a63cf14bf427881e762e54f03d86b864efea8238dd3b822f' || // buy
          log.topics[0] == '0xd6deddb2e105b46d4644d24aac8c58493a0f107e7973b2fe8d8fa7931a2912be' // accept bid
      })
  
      for(let i = 0; i < sales.length; i++) {
        const sale = sales[sales.length - i - 1];
        var dt = moment.unix(parseInt(sale.timeStamp, 16));
        var amount = (parseInt(sale.data) / 1000000000000000000);
        if (i == 0) {
          console.log("frame " + robbie.frame + " sold for " + amount.toFixed(3) + " ETH on " + dt.toString() + " | " + frameUrl(robbie.frame));
        } else {
          console.log("  sold for " + amount.toFixed(3) + " ETH on " + dt.toString());
        }
      }
    }
  } catch(error) {
    console.log(error)
  }
}

main();