import MarketData from "./MarketData";

class Metrics {
  marketData: MarketData;

  constructor({ marketData }: Metrics) {
    this.marketData = marketData;
  }
}

export default Metrics;
