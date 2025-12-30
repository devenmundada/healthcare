const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  // Create new user
  static async create({ name, email, phone, password }) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert user
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
        [name, email, phone, hashedPassword]
      );

      // Get created user
      const [users] = await pool.execute(
        'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
        [result.insertId]
      );

      return users[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const [users] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return users[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [users] = await pool.execute(
        'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
        [id]
      );
      return users[0];
    } catch (error) {
      throw error;
    }
  }

  // Verify password
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
  }
}

module.exports = User;