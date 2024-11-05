import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log("req.headers:", req.headers);
  const token = req.headers.authorization;
  console.log("token:", token);
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  if (!token) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }
    
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token provided!' });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
