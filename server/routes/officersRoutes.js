const express = require('express');
const router = express.Router();
const Officer = require('../models/officersModel.js');

// POST /officers - Create a new officer
router.post('/', async (req, res) => {
  try {
    const { name, crime_id } = req.body;

    if (!name || !crime_id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newId = await Officer.create({ name, crime_id });

    res.status(201).json({ message: 'Officer created successfully.', officer_id: newId });
  } catch (err) {
    console.error('Error creating officer:', err);
    res.status(500).json({ message: 'Failed to create officer', error: err.message });
  }
});

// GET /officers/crime/:crimeId - Get officers by crime ID
router.get('/crime/:crimeId', async (req, res) => {
  try {
    const { crimeId } = req.params;
    const officers = await Officer.findByCrimeId(crimeId);

    if (officers.length === 0) {
      return res.status(404).json({ message: 'No officers found for this crime.' });
    }

    res.status(200).json({ officers });
  } catch (err) {
    console.error('Error fetching officers:', err);
    res.status(500).json({ message: 'Failed to fetch officers', error: err.message });
  }
});

// DELETE /officers/crime/:crimeId - Delete officers by crime ID
router.delete('/crime/:crimeId', async (req, res) => {
  try {
    const { crimeId } = req.params;

    await Officer.deleteByCrimeId(crimeId);

    res.status(200).json({ message: `Officers linked to crime ID ${crimeId} deleted.` });
  } catch (err) {
    console.error('Error deleting officers:', err);
    res.status(500).json({ message: 'Failed to delete officers', error: err.message });
  }
});

module.exports = router;
