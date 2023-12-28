import { useState, useEffect, useCallback } from "react";
import Currency from "../models/Concurrency";
import responseToModel from "../utils/responseToModel";

interface UseCurrency {
  loading: boolean;
  currencies: Currency[];
  refresh: () => void;
}

type UseCurrencyOptions = {
  apiUrl?: string;
};

export const useCurrency = ({
  apiUrl,
}: UseCurrencyOptions = {}): UseCurrency => {
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const fetchData = useCallback(() => {
    // this can be set into an env variable also.
    fetch(apiUrl ?? "https://data.messari.io/api/v1/assets")
      .then((res) => res.json())
      .then((res) => {
        setCurrencies(res.data.map(responseToModel<Currency>));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  const refresh = () => {
    fetchData();
  };

  // Initial concurrency fetching.
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  console.log(currencies);

  return { loading, currencies, refresh };
};
