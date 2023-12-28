import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message }: LoadingProps): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default Loading;
