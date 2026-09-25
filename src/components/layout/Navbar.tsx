import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
} from '@mui/material';
import {
  NotificationsOutlined as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid #E5E7EB',
        color: 'text.primary',
        height: 80,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ px: '40px !important' }}>
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: 400,
            position: 'relative',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              color: 'text.secondary',
            }}
          >
            <SearchIcon fontSize="small" />
          </Box>
          <Box
            component="input"
            placeholder="Search users, emails..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            sx={{
              width: '100%',
              pl: 5,
              pr: 2,
              py: 1,
              bgcolor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: 2,
              fontSize: '0.875rem',
              outline: 'none',
              '&:focus': {
                bgcolor: '#fff',
                borderColor: 'primary.main',
                boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)',
              },
              transition: 'all 0.2s',
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              DJ
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
