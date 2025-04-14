const pool = require('../dbconfig.js');

const Victim = {
  // Create victim
  async create({ name, age, gender, crime_id }) {
    const [result] = await pool.execute(
      'INSERT INTO Victims (name, age, gender, crime_id) VALUES (?, ?, ?, ?)',
      [name, age, gender, crime_id]
    );
    return result.insertId;
  },

  // Find victims by crime ID
  async findByCrimeId(crimeId) {
    const [rows] = await pool.execute(
      'SELECT * FROM Victims WHERE crime_id = ?',
      [crimeId]
    );
    return rows;
  },

  // Delete victims by crime ID
  async deleteByCrimeId(crimeId) {
    await pool.execute(
      'DELETE FROM Victims WHERE crime_id = ?',
      [crimeId]
    );
    return true;
  }
};

module.exports = Victim;