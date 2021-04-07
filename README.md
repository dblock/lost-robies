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

TODO: Walk the transfer chain to classify Robbies.

* A plain Robbie was registered during the Christie's conference.
* A Lost Robbie was found and registered in March 2021 when all the buzz happened.
* A known set of 3 cards have been found, but not registered.

#### Sales History

TODO: Retrieve sales history of found Robbies.

#### Availability and Pricing

TODO: Current availability and pricing.

#### Unscratched Robbies

TODO: Merge with data about found, but not registered Robbies.

### Links

* [The Lost Robbies](https://editorial.superrare.co/2020/09/05/the-lost-robbies/)
* [Rare “Lost Robbie” AI Nude NFTs Worth Millions Surface](https://digitalartcollector.com/rare-lost-robbie-ai-nude-nfts-worth-millions-surface/)

### License

MIT