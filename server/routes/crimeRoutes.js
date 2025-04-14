const express = require('express');
const router = express.Router();
const crimefunc = require("../models/crimesModel.js");


// Get all crimes
router.get('/', async (req, res) => {
  try {
    const crimes = await crimefunc.findAll();
    res.status(200).json({ crimes });
  } catch (err) {
    console.error('Error fetching all crimes:', err);
    res.status(500).json({ message: 'Failed to retrieve crimes', error: err.message });
  }
});

// Get crime by ID
router.get('/:id', async (req, res) => {
  try {
    const crimeId = req.params.id;
    const result = await crimefunc.findById(crimeId);
    if (result.length === 0) {
      return res.status(404).json({ message: 'No crime found with this ID.' });
    }

    res.status(200).json({ crime: result });

  } catch (err) {
    console.error('Error fetching crime by ID:', err);
    res.status(500).json({ message: 'Failed to retrieve crime', error: err.message });
  }
});

// Update crime by ID
router.put('/:id', async (req, res) => {
  try {
    const crimeId = req.params.id;
    const { description, severity_level, type, status } = req.body;

    const updated = await crimefunc.update(crimeId, { description, severity_level, type, status });
    if (updated) {
      res.status(200).json({ message: 'Crime updated successfully.' });
    } else {
      res.status(404).json({ message: 'Crime not found.' });
    }
  } catch (err) {
    console.error('Error updating crime:', err);
    res.status(500).json({ message: 'Failed to update crime', error: err.message });
  }
});

//POST a crime
router.post('/', async (req, res) => {
  try {
    const { description, severity_level, type, status } = req.body;

    const crimeId = await crimefunc.create({
      type,
      description,
      severity_level,
      status: status || 'open',
    });

    res.status(201).json({ 
      message: 'Crime created successfully',
      crime_id: crimeId 
    });

  } catch (err) {
    console.error('Error creating crime:', err);
    res.status(500).json({ message: 'Failed to create crime', error: err.message });
  }
});


module.exports = router;
