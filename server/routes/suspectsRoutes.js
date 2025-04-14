const express = require('express');
const router = express.Router();
const Suspect = require('../models/suspectsModel.js');

// POST /suspects - Create a new suspect
router.post('/', async (req, res) => {
  try {
    const { name, age, gender, crime_id } = req.body;

    if (!name || !age || !gender || !crime_id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newId = await Suspect.create({ name, age, gender, crime_id });

    res.status(201).json({ message: 'Suspect created successfully.', suspect_id: newId });
  } catch (err) {
    console.error('Error creating suspect:', err);
    res.status(500).json({ message: 'Failed to create suspect', error: err.message });
  }
});

// GET /suspects/crime/:crimeId - Get suspects by crime ID
router.get('/crime/:crimeId', async (req, res) => {
  try {
    const { crimeId } = req.params;
    const suspects = await Suspect.findByCrimeId(crimeId);

    if (suspects.length === 0) {
      return res.status(404).json({ message: 'No suspects found for this crime.' });
    }

    res.status(200).json({ suspects });
  } catch (err) {
    console.error('Error fetching suspects:', err);
    res.status(500).json({ message: 'Failed to fetch suspects', error: err.message });
  }
});

// DELETE /suspects/crime/:crimeId - Delete suspects by crime ID
router.delete('/crime/:crimeId', async (req, res) => {
  try {
    const { crimeId } = req.params;

    await Suspect.deleteByCrimeId(crimeId);

    res.status(200).json({ message: `Suspects linked to crime ID ${crimeId} deleted.` });
  } catch (err) {
    console.error('Error deleting suspects:', err);
    res.status(500).json({ message: 'Failed to delete suspects', error: err.message });
  }
});

module.exports = router;
