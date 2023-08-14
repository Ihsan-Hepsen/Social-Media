import { Request, Response } from 'express'
import UserRepository from '../repositories/userRepository'
import User from '../models/user'
import Joi from 'joi'
import userRepository from '../repositories/userRepository'
import { log } from 'console'

class UserController {

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            let users = await UserRepository.getAllUsers()
            res.json(users)
        } catch (error) {
            console.error('Error fetching users:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10)
            const user = await UserRepository.getUserById(userId)

            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ error: 'User not found' })
            }
        } catch (error) {
            console.error('Error fetching user by id:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        console.log(`Received PUT request for user #${req.params.id}`)
        try {
            const userId = parseInt(req.params.id, 10)
            if (userId !== req.body.id) {
                res.status(409).json({ error: 'User ID mismatch on request body' })
                return
            }

            const userSchema = Joi.object({
                id: Joi.number().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            })

            // const updatedUser: User = req.body as User
            const { error, value: updatedUser } = userSchema.validate(req.body)

            if (error) {
                res.status(400).json({ error: error.details.map(detail => detail.message) })
                return
            }

            const user = await UserRepository.updateUser(userId, updatedUser)

            if (user) {
                res.json(user)
            } else if (!user) {
                res.status(404).json({ error: 'User not found' })
            } else {
                res.sendStatus(400)
            }
        } catch (error) {
            console.error('Error update user by id:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        console.log(`Recceived POST request to create a new user`)
        try {
            const userSchema = Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            })

            const { error, value: user } = userSchema.validate(req.body)
            if (error) {
                console.error(`Error on request body: ${error}`)
                res.status(400).json({ error: error.details.map(detail => detail.message) })
                return
            }

            // pass the User obj to repo.createUser()
            const createdUser: User | null = await UserRepository.createUser(user)
            if (createdUser) {
                console.log('User created successfully')
                res.sendStatus(201)
            } else {
                console.log('Failed to create user')
                res.status(400).json({ error: `Cannot create new user` })
            }
        } catch (error) {
            console.error('Server error while creating user')
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        console.log(`Received DELETE request for user #${req.params.id}`)
        try {
            const userId = parseInt(req.params.id, 10)
            const user = await UserRepository.deleteUser(userId)

            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ error: 'User not found' })
            }
        } catch (error) {
            console.error('Error delete user by id:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new UserController()
