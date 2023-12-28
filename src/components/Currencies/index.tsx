/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Currency from "../../models/Concurrency";

import CurrencyRow from "./CurrencyRow";

interface CurrenciesBase {
  data: Currency[];
}

interface CurrenciesOnTrack extends CurrenciesBase {
  onTrack: (currency: Currency) => void;
  onUnTrack?: never;
}

interface CurrenciesOnUnTrack extends CurrenciesBase {
  onTrack?: never;
  onUnTrack: (currency: Currency) => void;
}

type Currencies = CurrenciesOnTrack | CurrenciesOnUnTrack;

const Currencies = ({ data, onTrack, onUnTrack }: Currencies): JSX.Element => {
  return (
    <TableContainer
      component={Paper}
      sx={{ height: { xs: "auto", md: "calc(100vh - 565px)" } }}
    >
      <Table stickyHeader aria-label="currency table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">% in the last 24h</TableCell>
            <TableCell align="right">Action(s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((currency) => (
            <CurrencyRow
              key={currency.name}
              remove={!!onUnTrack}
              onClick={() => onTrack?.(currency) ?? onUnTrack?.(currency)}
              currency={currency}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Currencies;
