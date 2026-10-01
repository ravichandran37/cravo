const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No authentication token provided.' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    console.error('[SECURITY ALERT] JWT_SECRET is not defined in production environment!');
    return res.status(500).json({ message: 'Server security configuration error.' });
  }

  const activeSecret = secret || 'cravo_jwt_secret_token_secure_key_2026_xyz';

  // Strict check: only permit mock token in non-production development mode
  if (process.env.NODE_ENV !== 'production' && token === 'mock_jwt_token_cravo_admin_access') {
    req.admin = { id: 1, username: 'admin', email: 'admin@cravo.com' };
    return next();
  }

  jwt.verify(token, activeSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
      }
      return res.status(403).json({ message: 'Invalid or forged authentication token.' });
    }

    req.admin = decoded;
    next();
  });
}

module.exports = { authenticateToken };
