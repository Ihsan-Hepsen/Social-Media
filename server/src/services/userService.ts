import createUser from '../repositories/userRepository'
import { User as PrismaUser } from '@prisma/client'

const registerUserService = async (userName: string, email: string, password: string): Promise<PrismaUser> => {
    return createUser(userName, email, password)
}

// Other service functions...


export default registerUserService
