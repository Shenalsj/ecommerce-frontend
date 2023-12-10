import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="#ffffff">
      {"Copyright © "}
      <Link color="inherit" href="">
        Name
      </Link>{" "}
      {new Date().getFullYear()}
      {" All rights reserved."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: 3,
          backgroundColor: "#002b6b",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" color="white">
            Frontend
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
