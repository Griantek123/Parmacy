const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 4000;

// Serve static files (CSS, JS, images) directly from the root directory
app.use(express.static(path.join(__dirname)));

// Serve the index.html file directly from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to load medicines
app.get('/api/medicines', (req, res) => {
  const medicines = loadMedicines();
  res.json(medicines);
});

// Function to load medicines from the text file
function loadMedicines() {
  const data = fs.readFileSync('medicines.txt', 'utf-8');
  const medicines = data.split('\n').map(line => {
    const [name, price, stock] = line.split(',');
    return { name, price: parseFloat(price), stock: parseInt(stock) };
  });
  return medicines;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
