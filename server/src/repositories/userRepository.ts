import db from './db'
import User from '../models/user'

export const UserRepository = {

    async findById(id: number): Promise<User | null> {
        return db.oneOrNone('SELECT * FROM users WHERE id = $1', [id])
    },

    async create(user: User): Promise<User> {
        return db.one(
            'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [user.firstName, user.lastName, user.email, user.password]
        )
    },

    async findAll(): Promise<User[] | null> {
        return db.manyOrNone('SELECT * FROM users RETURNING *')
    },

    async update(user: User): Promise<User> {
        return db.one(
            'UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE id = $4 RETURNING *',
            [user.firstName, user.lastName, user.password, user.id]
        )
    },

    async delete(id: number): Promise<User> {
        return db.one('DELETE FROM users WHERE id = $1', [id])
    }

}
