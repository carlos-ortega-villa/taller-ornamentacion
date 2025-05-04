const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer token"

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET || 'secreto123', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
