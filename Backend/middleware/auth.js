import jwt from 'jsonwebtoken';

export const signToken = (user) =>
  jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ code: 401, message: 'Login required', data: '' });
  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ code: 401, message: 'Session expired, please login again', data: '' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.auth?.userType !== 'admin')
    return res.status(403).json({ code: 403, message: 'Admin access only', data: '' });
  next();
};
