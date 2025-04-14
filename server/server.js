const express = require('express');
const cors = require('cors');
const crimeRoutes = require('./routes/crimeRoutes.js');
const suspectsRoutes = require('./routes/suspectsRoutes.js');
const officersRoutes = require('./routes/officersRoutes.js');
const victimsRoutes = require('./routes/victimsRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/crimes', crimeRoutes);
app.use('/suspects', suspectsRoutes);
app.use('/officers', officersRoutes);
app.use('/victims', victimsRoutes);
app.get('/check', (req, res) => {
  res.send('Yep, It works');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});