import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack
} from '@mui/material';

const BarberManagement = () => {
  const [barbers, setBarbers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBarber, setNewBarber] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [],
    workingHours: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: { start: '', end: '' }
    }
  });

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    try {
      const response = await fetch('/api/barbers');
      const data = await response.json();
      setBarbers(data);
    } catch (error) {
      console.error('Error fetching barbers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/barbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBarber),
      });

      if (response.ok) {
        fetchBarbers();
        setOpen(false);
        setNewBarber({
          name: '',
          email: '',
          phone: '',
          specialties: [],
          workingHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '09:00', end: '17:00' },
            sunday: { start: '', end: '' }
          }
        });
      }
    } catch (error) {
      console.error('Error creating barber:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 3 }}
      >
        Add New Barber
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Specialties</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {barbers.map((barber) => (
              <TableRow key={barber._id}>
                <TableCell>{barber.name}</TableCell>
                <TableCell>{barber.email}</TableCell>
                <TableCell>{barber.phone}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {barber.specialties.map((specialty, index) => (
                      <Chip key={index} label={specialty} size="small" />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={barber.isAvailable ? 'Available' : 'Unavailable'}
                    color={barber.isAvailable ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(barber)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Barber</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={newBarber.name}
              onChange={(e) => setNewBarber({ ...newBarber, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={newBarber.email}
              onChange={(e) => setNewBarber({ ...newBarber, email: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              value={newBarber.phone}
              onChange={(e) => setNewBarber({ ...newBarber, phone: e.target.value })}
              margin="normal"
              required
            />
            {/* Add working hours fields here */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Barber
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BarberManagement; 