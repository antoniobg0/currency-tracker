/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Currency from "../../models/Concurrency";
import iconDic from "../../utils/iconDic";
import formatter from "../../utils/currencyFormatter";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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
      <Table aria-label="currency table">
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
          {data.map((currency) => {
            const percentChangeUsdLast24Hours =
              currency.metrics.marketData.percentChangeUsdLast24Hours;
            const price = formatter("USD").format(
              currency.metrics.marketData.priceUsd
            );

            const Icon = onTrack ? AddIcon : DeleteIcon;

            return (
              <TableRow
                key={currency.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    src={iconDic.get(currency.symbol)}
                    sx={{ width: 65, height: 65 }}
                  />
                </TableCell>
                <TableCell align="left">{currency.name}</TableCell>
                <TableCell align="left" sx={{ fontWeight: 500 }}>
                  {price}
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: percentChangeUsdLast24Hours >= 0 ? "green" : "red",
                    }}
                  >
                    {percentChangeUsdLast24Hours.toString().slice(0, 8)}%
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    onClick={() => onTrack?.(currency) ?? onUnTrack?.(currency)}
                  >
                    <Icon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Currencies;
