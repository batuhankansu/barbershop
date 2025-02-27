import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material';

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments
    // This will be implemented when we connect to the backend
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    // Update appointment status
    // This will be implemented when we connect to the backend
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Appointments" />
          <Tab label="Barbers" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      {value === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.client.name}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>
                    {new Date(appointment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.date).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                    />
                  </TableCell>
                  <TableCell>
                    {appointment.status === 'pending' && (
                      <>
                        <Button
                          size="small"
                          color="success"
                          onClick={() =>
                            handleStatusChange(appointment._id, 'approved')
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() =>
                            handleStatusChange(appointment._id, 'rejected')
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminDashboard; 