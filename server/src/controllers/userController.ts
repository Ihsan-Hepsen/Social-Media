import { Request, Response } from 'express'
import UserRepository from '../repositories/userRepository'
import User from '../models/user'
import Joi from 'joi'
import userRepository from '../repositories/userRepository'

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
                res.sendStatus(404).json({ error: 'User not found' })
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
                res.sendStatus(409).json({ error: 'Conflicting ID found for the user' })
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
                res.sendStatus(404).json({ error: 'User not found' })
            } else {
                res.sendStatus(400)
            }
        } catch (error) {
            console.error('Error delete user by id:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    // TODO: Write Create User
    async createUser(req: Request, res: Response): Promise<void> {
        // validate body: return 400 if invalid

        // pass the User obj to repo.createUser()
        await UserRepository.createUser(req.body)
        // return 201 if successful
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        console.log(`Received DELETE request for user #${req.params.id}`)
        try {
            const userId = parseInt(req.params.id, 10)
            const user = await UserRepository.deleteUser(userId)

            if (user) {
                res.json(user)
            } else {
                res.sendStatus(404).json({ error: 'User not found' })
            }
        } catch (error) {
            console.error('Error delete user by id:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new UserController()
