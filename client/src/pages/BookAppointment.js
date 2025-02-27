import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const steps = ['Select Service', 'Choose Date & Time', 'Your Information'];

const BookAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    service: '',
    date: null,
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add appointment submission logic here
    console.log(formData);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <MenuItem value="haircut">Haircut</MenuItem>
                <MenuItem value="beard">Beard Trim</MenuItem>
                <MenuItem value="both">Haircut & Beard Trim</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={formData.date}
                  onChange={(newDate) => setFormData({ ...formData, date: newDate })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Select Time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
                <MenuItem value="9:00">9:00 AM</MenuItem>
                <MenuItem value="10:00">10:00 AM</MenuItem>
                <MenuItem value="11:00">11:00 AM</MenuItem>
                {/* Add more time slots */}
              </TextField>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Book an Appointment
        </Typography>
        <Stepper activeStep={activeStep} sx={{ py: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Book Appointment' : 'Next'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BookAppointment; 