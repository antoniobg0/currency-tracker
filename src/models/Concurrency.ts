import Metrics from "./Metrics";

class Currency {
  id: string;

  name: string;

  symbol: string;

  metrics: Metrics;

  constructor({ id, name, symbol, metrics }: Currency) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.symbol = symbol;
    this.metrics = metrics;
  }
}

export default Currency;
