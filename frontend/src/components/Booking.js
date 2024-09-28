import React, { useState } from 'react';
import { Container, Button, TextField, Checkbox, FormControlLabel, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';

const Booking = ({ onProceed }) => {
  const [locationPincode, setLocationPincode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [condition, setCondition] = useState('');
  const [bedsRequired, setBedsRequired] = useState(0);
  const [emergency, setEmergency] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestBeds = () => {
    if (bedsRequired <= 0 || !firstName || !locationPincode || !condition || !email || !phone || !address) {
      setError('All fields are required and beds must be greater than 0');
      return;
    }

    setLoading(true);

    fetch('http://localhost:5000/request-beds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locationPincode,
        numberOfBeds: bedsRequired,
        emergency,
        firstName,
        lastName,
        email,
        phone,
        address,
        condition
      })
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.length > 0) {
          const total = calculateBill(bedsRequired, data[0].price_per_bed);
          onProceed({ locationPincode, bedsRequired, emergency, firstName, lastName, email, phone, address, condition }, total);
          setHospitals(data);
          setSuccess('Hospitals fetched successfully');
        } else {
          setHospitals([]);
          setError('No hospitals available at the moment');
        }
      })
      .catch(err => {
        setLoading(false);
        setError(`Failed to request beds: ${err.message}`);
      });
  };

  const calculateBill = (numberOfBeds, pricePerBed) => numberOfBeds * pricePerBed;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book Hospital Beds
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="First Name" fullWidth value={firstName} onChange={e => setFirstName(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Last Name" fullWidth value={lastName} onChange={e => setLastName(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone" fullWidth value={phone} onChange={e => setPhone(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" fullWidth value={address} onChange={e => setAddress(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Condition" fullWidth value={condition} onChange={e => setCondition(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Pincode" fullWidth value={locationPincode} onChange={e => setLocationPincode(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Beds Required" type="number" fullWidth value={bedsRequired} onChange={e => setBedsRequired(e.target.value)} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox checked={emergency} onChange={() => setEmergency(!emergency)} />} label="Emergency Case" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={requestBeds} fullWidth>
            {loading ? <CircularProgress size={24} /> : 'Proceed to Payment'}
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Available Hospitals
      </Typography>
      {hospitals.length > 0 ? (
        hospitals.map(hospital => (
          <Card key={hospital.id} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{hospital.name}</Typography>
              <Typography>Location: {hospital.pincode}</Typography>
              <Typography>Beds Available: {hospital.beds_available}</Typography>
              <Typography>Price per Bed: {hospital.price_per_bed}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        !loading && <Typography>No hospitals available at the moment.</Typography>
      )}
    </Container>
  );
};

export default Booking;
