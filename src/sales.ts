import * as _ from 'lodash';
import * as fs from 'fs';
import * as moment from 'moment';

// 300 AI Generated Nude Portrait #7 tokens start at TokenId=191
function frameToTokenId(frameNumber) {
  return 190 + frameNumber;
}

function frameUrl(frameNumber) {
  return "https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-" + frameNumber.toString() + "-" + (frameToTokenId(frameNumber)).toString();
}

function toETH(amount) {
  return (amount / 1000000000000000000).toFixed(3);
}

async function main() {
  try {
    
    for(var frameIndex = 1; frameIndex <= 300; frameIndex++) {
      const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
      var data = { logs: [] };
      if (fs.existsSync(filename)) {
        data = JSON.parse(Buffer.from(await fs.readFileSync(filename)).toString());
      }

      var first = true;
      for(const log of _.reverse(data.logs)) {
        var dt = moment.unix(parseInt(log.timeStamp, 16));
        if (log.method == 'acceptBid' || log.method == 'buy') {
          var amount = toETH(parseInt(log.data));
          if (first) {
            console.log("frame " + frameIndex + " sold for " + amount + " ETH on " + dt.toString() + " | " + frameUrl(frameIndex));
            first = false;
          } else {
            console.log("  sold for " + amount + " ETH on " + dt.toString());
          }
        } else if (log.method == 'setSalePrice') {
          if (first) {
            var amount = toETH(log.amount);
            console.log("frame " + frameIndex + " is listed for sale for " + amount + " ETH on " + dt.toString() + " | " + frameUrl(frameIndex));
            first = false;
          }
        }
      }
    }

  } catch(error) {
    console.log(error)
  }
}

main();