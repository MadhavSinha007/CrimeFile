const pool = require('../dbconfig.js');

const Crime = {
  // Create a new crime
  async create({ description, severity_level, type, status }) {
    const [result] = await pool.execute(
      'INSERT INTO Crimes (description, severity_level, type, status) VALUES (?, ?, ?, ?)',
      [description, severity_level, type, status]
    );
    return result.insertId;
  },

  // Find crime by ID
  async findById(crimeId) {
    const [rows] = await pool.execute(
      'SELECT * FROM Crimes WHERE crime_id = ?',
      [crimeId]
    );
    return rows[0];
  },

  // Find all crimes
  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM Crimes');
    return rows;
  },

  // Update crime
  async update(crimeId, { description, severity_level, type, status }) {
    await pool.execute(
      'UPDATE Crimes SET description = ?, severity_level = ?, type = ?, status = ? WHERE crime_id = ?',
      [description, severity_level, type, status, crimeId]
    );
    return true;
  },
};

module.exports = Crime;