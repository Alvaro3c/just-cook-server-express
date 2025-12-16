import express from 'express'
import { config } from 'dotenv'
import { initDatabase } from './database/initDatabase.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// Rutas
import userRoutes from './routes/userRoutes.js'
import recipeRoutes from './routes/recepiesRoutes.js'
import ingredientRoutes from './routes/inredientRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
// Configuracion cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
const PORT = 3000
config()

// Middlewares
app.use(cookieParser())
app.use(express.json())

// Inicializacion de BBDD
try {
    await initDatabase()
    console.log('Base de datos inicializada correctamente')
} catch (error) {
    console.error('Error al iniciar la aplicación:', error)
    process.exit(1)
}

// Rutas 
app.use('/api', userRoutes)
app.use('/api', ingredientRoutes)
app.use('/api', recipeRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})