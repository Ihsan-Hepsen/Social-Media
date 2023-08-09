import { Request, Response } from 'express';
import UserRepository from '../repositories/userRepository';
import User from '../models/user';

class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            let users: User[] = await UserRepository.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
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

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            console.log(`Received DELETE request for user #${req.params.id}`)
            const userId = parseInt(req.params.id, 10)
            const user = await UserRepository.deleteUser(userId)

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
}

export default new UserController();
