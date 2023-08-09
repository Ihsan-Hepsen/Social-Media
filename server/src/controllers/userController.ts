import { Request, Response } from 'express'
import { UserRepository } from '../repositories/userRepository'
import User from '../models/user'
import { log } from 'console'

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await UserRepository.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        console.log("Request Received")
        const users = await UserRepository.findAll()
        return res.json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser: User = req.body
        const createdUser = await UserRepository.create(newUser)
        return res.status(201).json(createdUser)
    } catch (error) {
        console.error('Error creating user:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser: User = req.body
        const user = await UserRepository.update(updatedUser)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.json(user)
    } catch (error) {
        console.error('Error updating user:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id)
        const deletedUser = await UserRepository.delete(userId)

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error('Error deleting user:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
