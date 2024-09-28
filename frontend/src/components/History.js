import React from 'react';
import { Container, Typography } from '@mui/material';

const History = () => {
  // Fetch and display past booking history
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Booking History
      </Typography>
      <Typography>No past bookings available.</Typography>
    </Container>
  );
};

export default History;
