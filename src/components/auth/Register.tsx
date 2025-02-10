import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthService } from "../../services/auth.service";

const textFieldSx = {
  "& .MuiInputLabel-root": {
    fontSize: "1.1rem",
  },
  "& .MuiInputBase-input": {
    fontSize: "1.1rem",
  },
};

const BackgroundAnimation = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  background: "#EEF2F6",
  zIndex: 0,
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    filter: "blur(60px)",
    animation: "move 10s infinite linear",
    opacity: 0.35,
  },
  "&::before": {
    background: "#5E35B1",
    top: "10%",
    left: "0%",
    animationDelay: "2s",
  },
  "&::after": {
    background: "#1D87E4",
    bottom: "10%",
    right: "0%",
    animationDelay: "-2s",
  },
  "@keyframes move": {
    "0%": {
      transform: "translate(0, 0) scale(1)",
    },
    "33%": {
      transform: "translate(150px, 150px) scale(1.3)",
    },
    "66%": {
      transform: "translate(-100px, 50px) scale(0.8)",
    },
    "100%": {
      transform: "translate(0, 0) scale(1)",
    },
  },
});

export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await AuthService.register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        p: 2,
      }}
    >
      <BackgroundAnimation />
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "600px",
          p: 6,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ fontWeight: 600 }}
        >
          Register
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              "& .MuiAlert-message": {
                fontSize: "1.1rem",
              },
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={textFieldSx}
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
            sx={textFieldSx}
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            sx={textFieldSx}
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            sx={textFieldSx}
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            sx={textFieldSx}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              mb: 3,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          >
            Register
          </Button>
          <Link
            href="/login"
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              display: "block",
              textAlign: "center",
            }}
          >
            Already have an account? Sign in
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
