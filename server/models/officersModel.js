const pool = require('../dbconfig.js');

const Officer = {
  // Create officer
  async create({ name, crime_id }) {
    const [result] = await pool.execute(
      'INSERT INTO Officers (name, crime_id) VALUES (?, ?)',
      [name, crime_id]
    );
    return result.insertId;
  },

  // Find officers by crime ID
  async findByCrimeId(crimeId) {
    const [rows] = await pool.execute(
      'SELECT * FROM Officers WHERE crime_id = ?',
      [crimeId]
    );
    return rows;
  },

  // Delete officers by crime ID
  async deleteByCrimeId(crimeId) {
    await pool.execute(
      'DELETE FROM Officers WHERE crime_id = ?',
      [crimeId]
    );
    return true;
  }
};

module.exports = Officer;