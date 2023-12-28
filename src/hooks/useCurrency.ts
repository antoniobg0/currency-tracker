import { useContext } from "react";
import { CurrencyContext } from "../providers/CurrencyProvider";

const useCurrency = () => {
  return useContext(CurrencyContext);
};

export default useCurrency;
