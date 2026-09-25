import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import UsersPage from './pages/Users';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
          <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <UsersPage searchQuery={searchQuery} />
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
