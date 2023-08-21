import { Request, Response } from 'express'
import Joi from 'joi'
import registerUserService from '../services/userService'

const userSchema = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
})

const registerUser = async (req: Request, res: Response) => {
    try {
        const { error, value } = userSchema.validate(req.body)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const { userName: userName, email, password } = value
        const newUser = await registerUserService(userName, email, password)
        res.json(newUser)
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering user.' })
    }
}

export default registerUser
