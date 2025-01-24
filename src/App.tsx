import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My MUI App</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Vite + React + MUI
          </Typography>
          <Box sx={{ my: 4 }}>
            <Button
              variant="contained"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </Button>
            <Typography sx={{ mt: 2 }}>
              Edit <code>src/App.tsx</code> and save to test HMR
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
