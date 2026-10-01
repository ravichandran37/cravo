const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

// In-memory rate limiting for login attempts: IP -> { count, lockedUntil }
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_PERIOD_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingMin = Math.ceil((record.lockedUntil - now) / 60000);
    return {
      allowed: false,
      message: `Too many failed login attempts. Please try again in ${remainingMin} minute(s).`,
    };
  }

  if (record.lockedUntil && now >= record.lockedUntil) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0 };
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_PERIOD_MS;
  }
  loginAttempts.set(ip, record);
}

function resetAttempts(ip) {
  loginAttempts.delete(ip);
}

exports.adminLogin = async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  try {
    // 1. Check rate limit
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return res.status(429).json({ message: rateCheck.message });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username/email and password are required' });
    }

    // 2. Fetch admin from database
    const [rows] = await query('SELECT * FROM admins WHERE username = ? OR email = ?', [username, username]);

    if (!rows || rows.length === 0) {
      recordFailedAttempt(clientIp);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const admin = rows[0];

    // 3. Cryptographic bcrypt comparison
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      recordFailedAttempt(clientIp);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Reset failed attempts on success
    resetAttempts(clientIp);

    // 4. Generate JWT
    const secret = process.env.JWT_SECRET;
    if (!secret && process.env.NODE_ENV === 'production') {
      console.error('[SECURITY FATAL] JWT_SECRET must be configured in production!');
      return res.status(500).json({ message: 'Server security configuration error' });
    }

    const activeSecret = secret || 'cravo_jwt_secret_token_secure_key_2026_xyz';
    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      activeSecret,
      { expiresIn: '24h' } // 24-hour expiration for security
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'An error occurred during authentication' });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({ admin: req.admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
