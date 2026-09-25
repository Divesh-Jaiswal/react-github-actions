import React, { useState, useMemo } from 'react';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from '@mui/x-data-grid';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { User } from '../../types';

interface UserTableProps {
  users: User[];
  loading: boolean;
  searchQuery: string;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, searchQuery, onEdit, onDelete }) => {
  const filteredRows = useMemo(() => {
    console.log("Filtering users with search query:", searchQuery);
    return users.filter((user) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        (user.company?.name || '').toLowerCase().includes(searchLower)
      );
    });
  }, [users, searchQuery]);
    console.log("Filtering users :", filteredRows);


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Full Name', flex: 1, minWidth: 150 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 200 },
    {
      field: 'companyName',
      headerName: 'Company',
      width: 150,
      valueGetter: (_, row: User) => row.company?.name || 'N/A',
    },
    {
      field: 'city',
      headerName: 'City',
      width: 130,
      valueGetter: (_, row: User) => row.address?.city || 'N/A',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon color="primary" />}
          label="Edit"
          onClick={() => onEdit(params.row as User)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => onDelete(params.row.id as number)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 800,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#6B7280',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '0.875rem',
            color: '#374151',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #E5E7EB',
            bgcolor: '#F9FAFB',
          },
        }}
      />
    </Box>
  );
};

export default UserTable;
