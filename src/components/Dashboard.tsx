import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Welcome to the Dashboard
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
