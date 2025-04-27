const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '0910', 
  database: 'students'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/tables', (req, res) => {
  const sql = 'SHOW TABLES';  
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching tables', error: err });
    } else {
      const tableNames = result.map(row => Object.values(row)[0]);  
      res.json(tableNames);  
    }
  });
});



// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { PRN, FullName, Branch, Phone } = req.body;

  const sql = 'INSERT INTO Studentinfo (id, FullName, Branch, Phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [PRN, FullName, Branch, Phone], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving data' }); // Send JSON response for error
    } else {
      res.status(200).json({ message: 'Data saved successfully' }); // Send JSON response for success
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
