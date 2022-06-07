const jwt = require('jsonwebtoken');

exports.auth = (request, response, next) => {
  try {
    const token = request.headers.authorization && request.headers.authorization.split(' ')[1];
    if (!token) return response.status(403).json({ error: "a token is required for authentication" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) return response.status(401).json({ error: "unauthorized request" });
    // if (request.body.id && request.body.id !== decoded.userId) return response.status(401).json({ error: "unauthorized request" });

    next();
  } catch (error) {
    response.status(401).json({ error: error.message | "authorization denied" });
  }
};
