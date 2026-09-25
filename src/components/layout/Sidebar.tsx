import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  BarChart as ChartIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 260;

const Sidebar: React.FC = () => {
  const menuItems = [
    { text: 'Users', icon: <PeopleIcon />, active: true },
    { text: 'Analytics', icon: <ChartIcon />, active: false },
    { text: 'Settings', icon: <SettingsIcon />, active: false },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#111827',
          color: '#fff',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'primary.main',
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.8rem',
          }}
        >
          AP
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', tracking: '-0.02em' }}>
          AdminPro V2
        </Typography>
      </Box>

      <Box sx={{ px: 4, mb: 2 }}>
        <Typography
          variant="caption"
          sx={{ color: 'gray', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          Management
        </Typography>
      </Box>

      <List sx={{ px: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                py: 1.5,
                px: 4,
                borderRight: item.active ? '4px solid #2563eb' : 'none',
                backgroundColor: item.active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.active ? '#3b82f6' : '#9CA3AF',
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.925rem',
                  fontWeight: item.active ? 600 : 500,
                  color: item.active ? '#fff' : '#9CA3AF',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #4B5563',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>DJ</Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Divesh Jaiswal</Typography>
            <Typography variant="caption" sx={{ color: 'gray' }}>Super Admin</Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
