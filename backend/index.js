import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors'; // Add CORS support

const app = express();
const port = 5000;

app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rasika@1809', // Change to your MySQL root password
  database: 'hospital_management' // Updated database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Request beds endpoint
app.post('/request-beds', (req, res) => {
  const {
    locationPincode,
    numberOfBeds,
    emergency,
    firstName,
    lastName,
    email,
    phone,
    address,
    condition
  } = req.body;

  // Check if all required fields are provided
  if (!locationPincode || numberOfBeds <= 0 || !firstName || !condition || !email || !phone || !address) {
    return res.status(400).json({ error: 'All fields are required and beds must be greater than 0' });
  }

  // Query to find hospitals with available beds
  const query = 'SELECT * FROM hospitals WHERE pincode = ? AND beds_available >= ? ORDER BY beds_available DESC LIMIT 5';

  db.query(query, [locationPincode, numberOfBeds], (err, results) => {
    if (err) {
      console.error('Error fetching hospitals:', err);
      return res.status(500).json({ error: 'Failed to fetch hospitals' });
    }

    // Send the list of hospitals as the response
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
