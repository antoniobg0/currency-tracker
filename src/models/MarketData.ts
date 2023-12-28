class MarketData {
  percentChangeUsdLast24Hours: number;

  priceUsd: number;

  constructor({ percentChangeUsdLast24Hours, priceUsd }: MarketData) {
    this.percentChangeUsdLast24Hours = percentChangeUsdLast24Hours;
    this.priceUsd = priceUsd;
  }
}

export default MarketData;
