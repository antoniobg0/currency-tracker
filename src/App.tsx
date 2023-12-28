import { useCallback, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CurrencyList from "./components/Currencies";
import useCurrency from "./hooks/useCurrency";
import Currency from "./models/Concurrency";

import RefreshIcon from "@mui/icons-material/Refresh";
import Loading from "./components/Loading";

const App = (): JSX.Element => {
  const [searchBy, setSearchBy] = useState("");
  const {
    loading,
    currencies,
    myCurrencies,
    setMyCurrencies,
    updateLocalCurrencies,
    refresh,
  } = useCurrency();

  // Filter without mutating original data.
  const filteredCurrencies = useMemo(() => {
    return (
      currencies
        .filter(
          (currency) =>
            !myCurrencies.find((mCurrency) => mCurrency.id === currency.id)
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        // This can be also api level search, however to maintain simplicity in this example I used the already fetched data.
        .filter((currency) => currency.name.includes(searchBy))
    );
  }, [currencies, myCurrencies, searchBy]);

  const onTrackHandler = useCallback(
    (currency: Currency) => {
      const tmpMyCurrencies = [...myCurrencies];

      tmpMyCurrencies.push(currency);

      updateLocalCurrencies(tmpMyCurrencies);

      setMyCurrencies(tmpMyCurrencies);
    },
    [myCurrencies, setMyCurrencies, updateLocalCurrencies]
  );

  const onUnTrackHandler = useCallback(
    (currency: Currency) => {
      let tmpMyCurrencies = [...myCurrencies];

      tmpMyCurrencies = tmpMyCurrencies.filter((c) => c.id !== currency.id);

      updateLocalCurrencies(tmpMyCurrencies);

      setMyCurrencies(tmpMyCurrencies);
    },
    [myCurrencies, setMyCurrencies, updateLocalCurrencies]
  );

  const onRefreshHandler = () => {
    refresh();
    setSearchBy("");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        align="center"
        marginBottom={14}
        fontWeight={600}
        sx={{ fontSize: { xs: 48, md: 72 } }}
      >
        Crypto Tracker
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 4 }}>
        <Button
          disabled={loading}
          onClick={onRefreshHandler}
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
                <CurrencyList
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
                <CurrencyList
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
