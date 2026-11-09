// Blocks NoSQL operator injection ({"email": {"$gt": ""}}) by stripping keys that
// start with "$" or contain "." from the request body (deep).
const clean = (obj) => {
  if (Array.isArray(obj)) return obj.map(clean);
  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$') || key.includes('.')) delete obj[key];
      else obj[key] = clean(obj[key]);
    }
  }
  return obj;
};

export const sanitizeBody = (req, res, next) => {
  if (req.body) req.body = clean(req.body);
  next();
};
