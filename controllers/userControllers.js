import { pool } from '../config/database.js'
import { userQueries } from '../queries/userQueries.js'
import bcrypt from 'bcrypt'

export const userController = {
    createUser: async (req, res) => {
        const { nombre, email, contraseña } = req.body
        try {
            // Validaciones básicas
            if (!nombre || !email || !contraseña) {
                return res.status(400).json({
                    error: 'Todos los campos son requeridos: nombre, email, password'
                })
            }
            const client = await pool.connect()
            try {
                // Verificar si el usuario ya existe
                const existingUser = await client.query(userQueries.getUserByEmail, [email])
                if (existingUser.rows.length > 0) {
                    return res.status(409).json({
                        error: 'El email ya está registrado'
                    })
                }

                // Hash de la contraseña
                const saltRounds = 10
                const contraseña_hash = await bcrypt.hash(contraseña, saltRounds)

                // Crear usuario
                const result = await client.query(userQueries.createUser, [
                    nombre,
                    email,
                    contraseña_hash
                ])

                const newUser = result.rows[0]

                return res.status(201).json({
                    message: 'Usuario creado exitosamente',
                    user: {
                        id: newUser.id,
                        nombre: newUser.nombre,
                        email: newUser.email
                    }
                })

            } finally {
                client.release()
            }

        } catch (error) {
            console.error('Error creando usuario:', error)
            return res.status(500).json({
                error: 'Error interno del servidor',
                details: error.message
            })
        }
    },
    // Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const client = await pool.connect()
            try {
                const result = await client.query(userQueries.getAllUsers)
                return res.json({
                    count: result.rows.length,
                    usuarios: result.rows
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error obteniendo usuarios:', error)
            return res.status(500).json({
                error: 'Error obteniendo usuarios',
                details: error.message
            })
        }
    },
    getUserProfile: async (req, res) => {
        try {
            const client = await pool.connect();
            try {
                const result = await client.query(userQueries.getUserById, [req.userId]);
                const user = result.rows[0];

                if (!user) {
                    return res.status(404).json({
                        error: 'Usuario no encontrado'
                    });
                }

                return res.json({
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
                error: 'Error interno del servidor',
                details: error.message
            });
        }
    }
}