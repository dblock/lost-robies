### Where are the Robbies?

This code retrieves information about the 300 frames of Robbie Barat's "AI Generated Nude Portrait #7" from Etherscan.

- [x] Retrieve creation transactions and IPFS into [data/ai-generated-nude-portraits-7.json](dara/ai-generated-nude-portraits-7.json).
- [ ] Walk the transfer chain to classify Robbies into lost, found, claimed, etc.
- [ ] Past sales.
- [ ] Availability and pricing.
- [ ] Merge with data about found but unscratched Robbies.

### Run

Obtain an API key from [Etherscan](https://etherscan.io/myapikey).

```
export ETHERSCAN_API_KEY=...
npm install
ts-node src/index.ts
```

### Links

* [The Lost Robbies](https://editorial.superrare.co/2020/09/05/the-lost-robbies/)
* [Rare “Lost Robbie” AI Nude NFTs Worth Millions Surface](https://digitalartcollector.com/rare-lost-robbie-ai-nude-nfts-worth-millions-surface/)

### License

MIT