import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { IncomeChart } from "./IncomeChart";
import * as policies_nz from "./data/nz";
import { PolicyInfoPane } from "./PolicyInfoPane";
import { Masonry } from "@mui/lab";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://utdemir.com/">
        Utku Demir
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tax Policy Comparison
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          New Zealand, 2023 Election
        </Typography>
        <IncomeChart policies={policies_nz.all} />
        <Masonry spacing={2}>
          {policies_nz.all.map((policy, ix) => (
            <PolicyInfoPane key={ix} policy={policy} />
          ))}
        </Masonry>
        <hr />
        <Copyright />
      </Box>
    </Container>
  );
}
