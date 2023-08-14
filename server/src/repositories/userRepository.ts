import e from 'express'
import User from '../models/user'
import pool from './db'
import { number } from 'joi'
import { log } from 'console'

class UserRepository {
    async getAllUsers(): Promise<User[] | null> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users') as [User[], any[]]
            return rows
        } catch (error) {
            console.error(`Error while fetching users: ${error}`)
            return null
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) as [User[], any[]]
            return rows[0] || null
        } catch (error) {
            console.error(`Error while fetching user: ${error}`)
            return null
        }
    }

    // TODO: Complete Create User
    async createUser(user: User): Promise<User | any | null> {
        try {
            const createUserQuery = `
            INSERT INTO users (firstName, lastName, email, password, created_at)
            VALUES (?, ?, ?, ?, NOW());
            `
            await pool.execute(createUserQuery, [
                user.firstName,
                user.lastName,
                user.email,
                user.password,
            ])

            const selectUserQuery = 'SELECT * FROM users WHERE email = ?'
            const [rows] = await pool.execute(selectUserQuery, [user.email]) as [User[], any[]]

            if (rows) {
                console.log('User created successfully')
                return rows[0]
            } else {
                console.error('Failed to create user')
                throw new Error('Failed to create user')
            }

        } catch (error) {
            console.error(`Error while creating user: ${error}`)
            throw new Error(`Failed to creating user: ${error}`)
        }
    }

    async updateUser(id: number, updatedUser: User): Promise<User | null> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) as [User[], any[]]
            const oldUser = rows[0]

            if (!oldUser) {
                throw new Error(`User with #${id} does not exist.`)
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
            console.error(`Error while updating user: ${error}`)
            throw new Error(`Failed to update user with ID ${id}: ${error}`)
        }
    }


    async deleteUser(id: number): Promise<User | null> {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) as [User[], any[]]
            const user = rows[0]
            if (!user) {
                throw new Error(`User ${id} not found`)
            }
            await pool.execute('DELETE FROM users WHERE id = ?', [id])
            return user
        } catch (error) {
            console.error(`Error while deleting user: ${error}`)
            return null
        }
    }
}

export default new UserRepository()
