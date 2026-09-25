import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Paper, Breadcrumbs, Link, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import UserTable from '../components/users/UserTable';
import UserDialog from '../components/users/UserDialog';
import { userService } from '../services/api';
import { User, UserFormData } from '../types';

interface UsersPageProps {
  searchQuery: string;
}

const UsersPage: React.FC<UsersPageProps> = ({ searchQuery }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch users', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    console.log("users page useEffect called");
  }, []);

  const handleCreateOrUpdate = async (formData: UserFormData) => {
    try {
      if (selectedUser) {
        // Mock update - JSONPlaceholder doesn't actually persist
        const updatedUser = {
          ...selectedUser,
          ...formData,
          company: { ...selectedUser.company, name: formData.companyName },
          address: { ...selectedUser.address, city: formData.city },
        };
        await userService.updateUser(selectedUser.id, updatedUser);
        setUsers(users.map((u) => (u.id === selectedUser.id ? updatedUser : u)));
        setNotification({ message: 'User updated successfully (Mock)', severity: 'success' });
      } else {
        // Mock create
        const newUser: User = {
          id: Math.max(...users.map(u => u.id)) + 1,
          name: formData.name,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          company: { name: formData.companyName, catchPhrase: '', bs: '' },
          address: { street: '', suite: '', city: formData.city, zipcode: '' },
        };
        await userService.createUser(newUser);
        setUsers([newUser, ...users]);
        setNotification({ message: 'User created successfully (Mock)', severity: 'success' });
      }
      setDialogOpen(false);
    } catch (error) {
      setNotification({ message: 'Action failed', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
        setNotification({ message: 'User deleted successfully (Mock)', severity: 'success' });
      } catch (error) {
        setNotification({ message: 'Failed to delete user', severity: 'error' });
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6, px: '40px !important' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.025em',
              mb: 0.5,
            }}
          >
            User Directory
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Manage system accounts and permission levels.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 1,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#4B5563',
              }}
            >
              All: {users.length}
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: 1,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#16A34A',
              }}
            >
              Active: {users.length}
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedUser(null);
              setDialogOpen(true);
            }}
            sx={{
              bgcolor: '#2563eb',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
            }}
          >
            Add New User
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          bgcolor: '#fff',
        }}
      >
        <UserTable
          users={users}
          loading={loading}
          searchQuery={searchQuery}
          onEdit={(user) => {
            setSelectedUser(user);
            setDialogOpen(true);
          }}
          onDelete={handleDelete}
        />
      </Paper>

      <UserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleCreateOrUpdate}
        user={selectedUser}
      />

      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {notification ? (
          <Alert onClose={() => setNotification(null)} severity={notification.severity}>
            {notification.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Container>
  );
};

export default UsersPage;
