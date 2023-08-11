import e from 'express'
import User from '../models/user'
import pool from './db'
import { number } from 'joi'

class UserRepository {
    async getAllUsers(): Promise<User[]> {
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

    async updateUser(id: number, updatedUser: User): Promise<User | null> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) as [User[], any[]]
            const oldUser = rows[0]

            if (!oldUser) {
                return null
            }

            const updateQuery = `
                UPDATE users
                SET firstName = ?, lastName = ?, password = ?
                WHERE id = ?
            `
            await pool.execute(updateQuery, [
                updatedUser.firstName,
                updatedUser.lastName,
                updatedUser.password,
                id
            ])

            oldUser.firstName = updatedUser.firstName
            oldUser.lastName = updatedUser.lastName
            oldUser.password = updatedUser.password

            return oldUser

        } catch (error) {
            throw error
        }
    }


    async deleteUser(id: number): Promise<User> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) as [User[], any[]]
            const user = rows[0]
            if (!user) {
                throw new Error(`User ${id} not found`)
            }
            await pool.execute('DELETE FROM users WHERE id = ?', [id])
            return user
        } catch (error) {
            throw error
        }
    }
}

export default new UserRepository()
