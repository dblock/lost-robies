### Where are the Robbies?

This code retrieves information about the 300 frames of Robbie Barat's "AI Generated Nude Portrait #7" from Etherscan.

### Run

Obtain an API key from [Etherscan](https://etherscan.io/myapikey).

```
export ETHERSCAN_API_KEY=...
npm install
```

#### Retrieve creation transactions and IPFS info.

Retrieves creation transactions and IPFS info and writes [data/ai-generated-nude-portraits-7.json](data/ai-generated-nude-portraits-7.json).

```
ts-node src/list-robbies.ts
```

#### Classify Robbies

Walk the transfer chain to classify Robbies into lost, found, claimed, etc.

* A plain Robbie was claimed during the Christie's conference.
* A _lost_ Robbie was found and claimed in 2021 when all the buzz happened.
* A known set of 3 cards have been recovered, but not claimed.

#### Sales History

Retrieve sales history of found Robbies.

#### Availability and Pricing

Current availability and pricing.

#### Unscratched Robbies

Merge with data about found, but unscratched Robbies.

### Links

* [The Lost Robbies](https://editorial.superrare.co/2020/09/05/the-lost-robbies/)
* [Rare “Lost Robbie” AI Nude NFTs Worth Millions Surface](https://digitalartcollector.com/rare-lost-robbie-ai-nude-nfts-worth-millions-surface/)

### License

MIT