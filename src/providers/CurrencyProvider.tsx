import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Currency from "../models/Concurrency";
import responseToModel from "../utils/responseToModel";
import { getFromStorage, saveToStorage } from "../utils/storage";

type CurrencyContextType = {
  currencies: Currency[];
  myCurrencies: Currency[];
  loading: boolean;
  setMyCurrencies: (currencies: Currency[]) => void;
  updateLocalCurrencies: (currencies: Currency[]) => void;
  refresh: () => void;
};

export const CurrencyContext = createContext<CurrencyContextType>({
  currencies: [],
  myCurrencies: [],
  loading: false,
  setMyCurrencies: () => undefined,
  updateLocalCurrencies: () => undefined,
  refresh: () => undefined,
});

const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [myCurrencies, setMyCurrencies] = useState<Currency[]>([]);

  const fetchData = useCallback(() => {
    // this can be set into an env variable also.
    fetch("https://data.messari.io/api/v1/assets")
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
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const updateLocalCurrencies = useCallback((mc: Currency[]) => {
    saveToStorage(mc);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      currencies,
      myCurrencies,
      setMyCurrencies,
      updateLocalCurrencies,
      refresh,
    }),
    [
      loading,
      currencies,
      myCurrencies,
      setMyCurrencies,
      updateLocalCurrencies,
      refresh,
    ]
  );

  // Initial concurrency fetching.
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  // Get local saved currencies
  useEffect(() => {
    setMyCurrencies(getFromStorage());
  }, []);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
