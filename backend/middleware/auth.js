const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
       
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); 
        req.user = decoded;

        if (req.path=== '/user' && !req.user.isAdmin) {
            console.log('User is not an admin'); 
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error.message); 
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
