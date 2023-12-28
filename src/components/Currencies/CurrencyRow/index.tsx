import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import formatter from "../../../utils/currencyFormatter";
import Currency from "../../../models/Concurrency";
import iconDic from "../../../utils/iconDic";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

type CurrencyRowProps = {
  remove?: boolean;
  onClick: () => void;
  currency: Currency;
};

const CurrencyRow = ({
  remove,
  onClick,
  currency,
}: CurrencyRowProps): JSX.Element => {
  const { name, symbol, metrics } = currency;
  const percentChangeUsdLast24Hours =
    metrics.marketData.percentChangeUsdLast24Hours;
  const price = formatter("USD").format(metrics.marketData.priceUsd);

  const Icon = remove ? DeleteIcon : AddIcon;

  return (
    <TableRow
      key={name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Avatar src={iconDic.get(symbol)} sx={{ width: 65, height: 65 }} />
      </TableCell>
      <TableCell align="left">{name}</TableCell>
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
        <IconButton edge="end" onClick={onClick}>
          <Icon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CurrencyRow;
