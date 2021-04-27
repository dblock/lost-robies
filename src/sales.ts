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
  return (parseInt(amount) / 1000000000000000000).toFixed(3);
}

async function main() {
  try
  {
    for(var frameIndex = 1; frameIndex <= 300; frameIndex++) {
      const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
      var data = { logs: [] };
      if (fs.existsSync(filename)) {
        data = JSON.parse(Buffer.from(await fs.readFileSync(filename)).toString());
      }

      var sales = _.filter(data.logs, (log) => {
        return log.method == 'acceptBid' || log.method == 'buy'
      })

      for(let i = 0; i < sales.length; i++) {
        const sale = sales[sales.length - i - 1];
        var dt = moment.unix(parseInt(sale.timeStamp, 16));
        var amount = toETH(sale.data);
        if (i == 0) {
          console.log("frame " + frameIndex + " sold for " + amount + " ETH on " + dt.toString() + " | " + frameUrl(frameIndex));
        } else {
          console.log("  sold for " + amount + " ETH on " + dt.toString());
        }
      }
    }

  } catch(error) {
    console.log(error)
  }
}

main();