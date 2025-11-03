import pg from 'pg'
import { config } from 'dotenv'

config()

export const pool = new pg.Pool({
    connectionString: process.env.EXTERNAL_DB_URL,
    ssl: false
})