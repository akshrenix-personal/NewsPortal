import 'dotenv/config';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dbConnect } from './config/db.js';
import router from './route/userRoute.js';
import { sanitizeBody } from './middleware/sanitize.js';
import { requestLogger } from './middleware/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 9000;
const isProd = process.env.NODE_ENV === 'production';

if (!process.env.JWT_SECRET || (isProd && process.env.JWT_SECRET.length < 32)) {
  console.error('JWT_SECRET must be set (min 32 characters in production). See .env.example.');
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1); // needed behind Render/Heroku/Nginx proxies

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }, contentSecurityPolicy: false }));
app.use(compression());
app.use(requestLogger);

const origins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors(origins.length ? { origin: origins } : undefined));

app.use(express.json({ limit: '1mb' }));
app.use(sanitizeBody);
app.use(fileUpload({ limits: { fileSize: 2 * 1024 * 1024 }, abortOnLimit: true }));

// brute-force protection
app.use('/api/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false }));
app.use('/api', rateLimit({ windowMs: 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router);

// Serve the built React app (single-service deployment)
const distDir = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^\/(?!api|uploads|health).*/, (req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ code: 500, message: isProd ? 'Internal Server Error' : err.message, data: '' });
});

let server;
dbConnect()
  .then(() => { server = app.listen(PORT, () => console.log('Server running on port', PORT)); })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

// graceful shutdown (Docker / Render send SIGTERM on redeploy)
const shutdown = (signal) => {
  console.log(`${signal} received, shutting down...`);
  if (!server) process.exit(0);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (err) => console.error('Unhandled rejection:', err));
