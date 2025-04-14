const express = require('express');
const router = express.Router();
const Victim = require('../models/victimsModel.js');

// POST /victims - Create a new victim
router.post('/', async (req, res) => {
  try {
    const { name, age, gender, crime_id } = req.body;

    if (!name || !age || !gender || !crime_id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newId = await Victim.create({ name, age, gender, crime_id });

    res.status(201).json({ message: 'Victim created successfully.', victim_id: newId });
  } catch (err) {
    console.error('Error creating victim:', err);
    res.status(500).json({ message: 'Failed to create victim', error: err.message });
  }
});

// GET /victims/crime/:crimeId - Get victims by crime ID
router.get('/crime/:crimeId', async (req, res) => {
  try {
    const { crimeId } = req.params;
    const victims = await Victim.findByCrimeId(crimeId);

    if (victims.length === 0) {
      return res.status(404).json({ message: 'No victims found for this crime.' });
    }

    res.status(200).json({ victims });
  } catch (err) {
    console.error('Error fetching victims:', err);
    res.status(500).json({ message: 'Failed to fetch victims', error: err.message });
  }
});

// DELETE /victims/crime/:crimeId - Delete victims by crime ID
router.delete('/crime/:crimeId', async (req, res) => {
  try {
    const { crimeId } = req.params;

    await Victim.deleteByCrimeId(crimeId);

    res.status(200).json({ message: `Victims linked to crime ID ${crimeId} deleted.` });
  } catch (err) {
    console.error('Error deleting victims:', err);
    res.status(500).json({ message: 'Failed to delete victims', error: err.message });
  }
});

module.exports = router;
