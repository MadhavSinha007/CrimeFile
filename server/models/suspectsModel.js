const pool = require('../dbconfig.js');

const Suspect = {
  // Create suspect
  async create({ name, age, gender, crime_id }) {
    const [result] = await pool.execute(
      'INSERT INTO Suspects (name, age, gender, crime_id) VALUES (?, ?, ?, ?)',
      [name, age, gender, crime_id]
    );
    return result.insertId;
  },

  // Find suspects by crime ID
  async findByCrimeId(crimeId) {
    const [rows] = await pool.execute(
      'SELECT * FROM Suspects WHERE crime_id = ?',
      [crimeId]
    );
    return rows;
  },

  // Delete suspects by crime ID
  async deleteByCrimeId(crimeId) {
    await pool.execute(
      'DELETE FROM Suspects WHERE crime_id = ?',
      [crimeId]
    );
    return true;
  }
};

module.exports = Suspect;