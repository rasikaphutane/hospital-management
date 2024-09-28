import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Payments = ({ billAmount, onComplete }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate payment processing
    onComplete();
    navigate('/receipt');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>
      <Typography variant="h6">
        Total Amount: ${billAmount}
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Pay Now
      </Button>
    </Container>
  );
};

export default Payments;
