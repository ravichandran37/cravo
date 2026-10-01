const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { initDatabase, isFallback } = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// 1. Hide framework identity
app.disable('x-powered-by');

// 2. Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// 3. Dynamic CORS Configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((url) => url.trim().replace(/\/$/, ''))
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (!IS_PROD || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked request from origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// 4. Request Body Size Limiting (DoS prevention)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 5. Static Image Serving
app.use('/images', express.static(path.join(__dirname, '../client/public/images'), { maxAge: '7d' }));
app.use('/images', express.static(path.join(__dirname, '../public_images'), { maxAge: '7d' }));

// 6. Mount REST API Routes
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', statsRoutes);

// 7. Health & Readiness Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    service: 'Cravo Kitchen & Bar API',
    database: isFallback() ? 'embedded-fallback' : 'mysql',
    timestamp: new Date().toISOString(),
  });
});

// Root friendly greeting
app.get('/', (req, res) => {
  res.send('Cravo Kitchen & Bar API is active. Endpoints available at /api/...');
});

// 8. Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.message);
  if (err.message && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({ message: err.message });
  }
  res.status(500).json({
    message: IS_PROD ? 'An internal server error occurred.' : err.message,
  });
});

// Start Server & Validate Environment
async function startServer() {
  if (IS_PROD && !process.env.JWT_SECRET) {
    console.error('=======================================================');
    console.error(' [CRITICAL ERROR] JWT_SECRET is missing in production!');
    console.error(' Set a strong random JWT_SECRET in your production env.');
    console.error('=======================================================');
    process.exit(1);
  }

  await initDatabase();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  Cravo Kitchen & Bar API Server`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Listening on: http://localhost:${PORT}`);
    console.log(`  Database Mode: ${isFallback() ? 'Embedded Memory/File' : 'MySQL'}`);
    console.log(`=======================================================`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
});
