import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ConcurrencyList from "./components/Currencies";
import { useCurrency } from "./hooks/useCurrency";
import Currency from "./models/Concurrency";

import RefreshIcon from "@mui/icons-material/Refresh";
import Loading from "./components/Loading";
import { getFromStorage, saveToStorage } from "./utils/storage";

const App = (): JSX.Element => {
  const [myCurrencies, setMyCurrencies] = useState<Currency[]>([]);
  const [searchBy, setSearchBy] = useState("");
  const { loading, currencies, refresh } = useCurrency();

  const filteredCurrencies = useMemo(() => {
    return currencies
      .filter(
        (currency) =>
          !myCurrencies.find((mCurrency) => mCurrency.id === currency.id)
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((currency) => currency.name.includes(searchBy));
  }, [currencies, myCurrencies, searchBy]);

  const onTrackHandler = useCallback(
    (currency: Currency) => {
      const tmpMyCurrencies = [...myCurrencies];

      tmpMyCurrencies.push(currency);

      saveToStorage(tmpMyCurrencies);

      setMyCurrencies(tmpMyCurrencies);
    },
    [myCurrencies]
  );

  const onUnTrackHandler = useCallback(
    (currency: Currency) => {
      let tmpMyCurrencies = [...myCurrencies];

      tmpMyCurrencies = tmpMyCurrencies.filter((c) => c.id !== currency.id);

      saveToStorage(tmpMyCurrencies);

      setMyCurrencies(tmpMyCurrencies);
    },
    [myCurrencies]
  );

  useEffect(() => {
    const localMyCurrencies = getFromStorage();

    setMyCurrencies(localMyCurrencies);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        align="center"
        marginBottom={14}
        sx={{ fontSize: { xs: 48, md: 72 } }}
      >
        Crypto Tracker
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 4 }}>
        <Button
          disabled={loading}
          onClick={refresh}
          variant="contained"
          startIcon={<RefreshIcon />}
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          Refresh Data
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <Autocomplete
          freeSolo
          id="currency"
          value={searchBy}
          options={filteredCurrencies.map((option) => option.name)}
          renderInput={(params) => (
            <TextField {...params} label="Search by currency" />
          )}
          onChange={(_, newValue) => setSearchBy(newValue ?? "")}
          sx={{
            width: {
              xs: "100%",
              md: 400,
            },
          }}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {loading ? (
          <Loading message="Loading data..." />
        ) : (
          <Grid
            container
            mx="auto"
            sx={{
              flexDirection: {
                xs: "column-reverse",
                md: "row",
              },
            }}
          >
            <Grid item xs={12} md={6}>
              <Box pr={{ xs: 0, md: 4 }}>
                <Typography variant="h4" marginY={5}>
                  Currencies
                </Typography>
                <ConcurrencyList
                  data={filteredCurrencies}
                  onTrack={onTrackHandler}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box pl={{ xs: 0, md: 4 }}>
                <Typography variant="h4" marginY={5}>
                  My Currencies
                </Typography>
                <ConcurrencyList
                  data={myCurrencies}
                  onUnTrack={onUnTrackHandler}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default App;
