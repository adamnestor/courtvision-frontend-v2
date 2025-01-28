import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/Dashboard";
import { AuthService } from "./services/auth.service";
import { PlayerDetail } from "./components/player/PlayerDetail";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return AuthService.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <BrowserRouter>
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
          path="/player/:playerId"
          element={
            <PrivateRoute>
              <PlayerDetail />
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
