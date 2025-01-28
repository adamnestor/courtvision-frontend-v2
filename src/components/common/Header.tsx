import { AppBar, Toolbar, Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface HeaderProps {
  userInfo: { firstName: string } | null;
  showBackButton?: boolean;
}

export function Header({ userInfo, showBackButton }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        width: "100%",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showBackButton && (
            <IconButton 
              onClick={() => navigate('/dashboard')}
              sx={{ color: 'primary.main' }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box
            sx={{
              width: 150,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/placeholder-logo.png"
              alt="CourtVision"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" color="primary">
            Welcome, {userInfo?.firstName || "User"}!
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 