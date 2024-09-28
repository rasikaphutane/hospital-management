import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Receipt = ({ billAmount, onSave }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Simulate saving receipt
    onSave();
    navigate('/history');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Receipt
      </Typography>
      <Typography variant="h6">
        Total Amount Paid: ${billAmount}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Receipt
      </Button>
    </Container>
  );
};

export default Receipt;
