// Minimal request logger (method, path, status, ms) - no dependency needed.
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    if (req.path === '/health') return;
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`);
  });
  next();
};
