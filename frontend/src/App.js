import React, { useState } from 'react';
import { Container, Button, TextField, Checkbox, FormControlLabel, Typography, Card, CardContent, Grid } from '@mui/material';

function App() {
  const [hospitals, setHospitals] = useState([]);
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
  const [responseError, setResponseError] = useState('');

  const requestBeds = () => {
    if (bedsRequired <= 0 || firstName === '' || locationPincode === '' || condition === '' || email === '' || phone === '' || address === '') {
      setError('All fields are required and beds must be greater than 0');
      return;
    }

    fetch('http://localhost:5000/request-beds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(data => setHospitals(data))
      .catch(err => setResponseError(`Failed to request beds: ${err.message}`));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Hospital Bed Availability
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {responseError && (
        <Typography color="error" gutterBottom>
          {responseError}
        </Typography>
      )}

      <Grid container spacing={2}>
        {/* First Name Input */}
        <Grid item xs={12}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Last Name Input */}
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Email Input */}
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Phone Input */}
        <Grid item xs={12}>
          <TextField
            label="Phone"
            fullWidth
            value={phone}
            onChange={e => setPhone(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Address Input */}
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Condition Input */}
        <Grid item xs={12}>
          <TextField
            label="Condition"
            fullWidth
            value={condition}
            onChange={e => setCondition(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Pincode Input */}
        <Grid item xs={12}>
          <TextField
            label="Pincode"
            fullWidth
            value={locationPincode}
            onChange={e => setLocationPincode(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Beds Required */}
        <Grid item xs={6}>
          <TextField
            label="Beds Required"
            type="number"
            fullWidth
            value={bedsRequired}
            onChange={e => setBedsRequired(Number(e.target.value))}
            margin="normal"
          />
        </Grid>

        {/* Emergency Checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={emergency} onChange={() => setEmergency(!emergency)} />}
            label="Emergency Case"
          />
        </Grid>

        {/* Request Beds Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={requestBeds} fullWidth>
            Request Beds
          </Button>
        </Grid>
      </Grid>

      {/* Display Hospital Information */}
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
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No hospitals available at the moment.</Typography>
      )}
    </Container>
  );
}

export default App;
