import { AppBar, Toolbar, Box, Typography, Button, IconButton, Container } from "@mui/material";
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
      sx={{
        backgroundColor: "#5E35B1", // Deep Purple
        borderBottom: "none",
        width: "100%",
      }}
    >
      <Container
        maxWidth={false}
      >
        <Toolbar 
          sx={{ 
            justifyContent: "space-between",
            px: { xs: 2, md: 6 }, // More padding on larger screens
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {showBackButton && (
              <IconButton 
                onClick={() => navigate('/dashboard')}
                sx={{ color: 'common.white' }} // White back button
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
            <Typography variant="h6" color="common.white">
              Welcome, {userInfo?.firstName || "User"}!
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              sx={{
                color: 'common.white',
                borderColor: 'common.white',
                '&:hover': {
                  borderColor: 'common.white',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 