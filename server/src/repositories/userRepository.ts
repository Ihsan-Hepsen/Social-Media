import e from 'express'
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

    async getUserById(id: number): Promise<User | null> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) as [User[], any[]]
            return rows[0] || null
        } catch (error) {
            throw error
        }
    }

    // TODO: Add update function

    async deleteUser(id: number): Promise<User | null> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) as [User[], any[]]
            const user = rows[0]
            if (user) {
                await pool.execute('DELETE FROM users WHERE id = ?', [id])
            }
            return user || null
        } catch (error) {
            throw error
        }
    }
}

export default new UserRepository()
