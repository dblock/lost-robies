## Where are the Robbies?

This code retrieves information about the 300 frames of Robbie Barrat's "AI Generated Nude Portrait #7" using the [Etherscan API](https://etherscan.io/apis).

### Run

Obtain an API key from [Etherscan](https://etherscan.io/myapikey) and save it to `.env`.

```
ETHERSCAN_API_KEY=...
```

Install dependencies.

```
npm install
```

Retrieve creation transactions, IPFS info and sales, and cache output to [data/ai-generated-nude-portraits-7.json](data/ai-generated-nude-portraits-7.json) and [data/ai-generated-nude-portraits-7-logs.json](data/ai-generated-nude-portraits-7-logs.json).

```
npm run wild

Working with 300 AI Generated Nude Portrait #7 Frames.
frame 12 last sold for 475.00 ETH on Wed Mar 31 2021 11:38:59 GMT-0400
frame 14 last sold for 1000.00 ETH on Wed Mar 24 2021 08:33:02 GMT-0400
frame 16 last sold for 150.00 ETH on Thu Mar 18 2021 10:09:11 GMT-0400
...
```

### Next

#### Classify Robbies

Some help from https://twitter.com/dblockdotorg/status/1381285307925008386

* A plain Robbie was registered during the Christie's conference.
* A Lost Robbie was found and registered in March 2021 when all the buzz happened.
* A known set of 4 cards have been found, but not registered.

#### Availability and Pricing

TODO: Current availability and pricing.

#### Unscratched Robbies

TODO: Merge with data about found, but not registered Robbies.

### Links

* [The Lost Robbies](https://editorial.superrare.co/2020/09/05/the-lost-robbies/)
* [Rare “Lost Robbie” AI Nude NFTs Worth Millions Surface](https://digitalartcollector.com/rare-lost-robbie-ai-nude-nfts-worth-millions-surface/)

### License

MIT