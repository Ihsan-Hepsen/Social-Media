import User from '../models/user'
import pool from './db'

class UserRepository {
    async getAllUsers(): Promise<any[]> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users') as [User[], any[]]
            return rows
        } catch (error) {
            throw error
        }
    }
}

export default new UserRepository()
