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
}

export default new UserController();
