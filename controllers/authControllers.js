import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../config/database.js';
import { userQueries } from '../queries/userQueries.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const authController = {
    login: async (req, res) => {
        const { email, contraseña } = req.body;
        console.log('📧 Email recibido:', email); // 👈 Debug
        console.log('🔐 Contraseña recibida:', contraseña ? 'SÍ' : 'NO'); // 👈 Debug
        try {
            // Validaciones básicas
            if (!email || !contraseña) {
                return res.status(400).json({
                    success: false,
                    error: 'Email y contraseña son obligatorios'
                });
            }

            const client = await pool.connect();
            try {
                // Buscar usuario por email
                const result = await client.query(userQueries.getUserByEmail, [email]);
                const user = result.rows[0];
                console.log('👤 Usuario encontrado:', user ? 'SÍ' : 'NO'); // 👈 Debug
                if (user) {
                    console.log('🗝️ Hash en BD:', user.contraseña_hash ? 'SÍ' : 'NO'); // 👈 Debug
                }
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        error: 'Credenciales inválidas'
                    });
                }
                if (!user.contraseña_hash) {
                    console.error('❌ ERROR: contraseña_hash es undefined para usuario:', user.id);
                    return res.status(500).json({
                        success: false,
                        error: 'Error en los datos del usuario'
                    });
                }
                // Verificar contraseña
                const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña_hash);
                if (!isPasswordValid) {
                    return res.status(401).json({
                        success: false,
                        error: 'Credenciales inválidas'
                    });
                }

                // Generar token JWT
                const token = generateToken(user.id);

                // Configurar cookie
                res.cookie('auth_token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
                });

                // Respuesta exitosa
                return res.json({
                    success: true,
                    message: 'Login exitoso',
                    user: {
                        id: user.id,
                        nombre: user.nombre,
                        email: user.email
                    }
                });

            } finally {
                client.release();
            }

        } catch (error) {
            console.error('Error en login:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor',
                details: error.message
            });
        }
    },

    logout: (req, res) => {
        res.clearCookie('auth_token');
        return res.json({
            success: true,
            message: 'Logout exitoso'
        });
    },

    getProfile: async (req, res) => {
        try {
            const client = await pool.connect();
            try {
                const result = await client.query(userQueries.getUserById, [req.userId]);
                const user = result.rows[0];

                if (!user) {
                    return res.status(404).json({
                        success: false,
                        error: 'Usuario no encontrado'
                    });
                }

                return res.json({
                    success: true,
                    user: {
                        id: user.id,
                        nombre: user.nombre,
                        email: user.email
                    }
                });

            } finally {
                client.release();
            }
        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor',
                details: error.message
            });
        }
    },

    // Middleware para verificar autenticación (opcional, si lo quieres en el controller)
    verifyAuth: (req, res) => {
        return res.json({
            success: true,
            message: 'Usuario autenticado',
            user: {
                id: req.userId
            }
        });
    }
};