import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    // Intentar obtener token de cookie primero
    let token = req.cookies.auth_token;

    // Si no hay cookie, intentar con header Authorization
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. No hay token de autenticación.'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};