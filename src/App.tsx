import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/Dashboard";
import { AuthService } from "./services/auth.service";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return AuthService.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  const isAuthenticated = AuthService.isAuthenticated();
  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CourtVision
          </Typography>
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
