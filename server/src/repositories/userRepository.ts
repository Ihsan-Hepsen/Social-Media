import { PrismaClient, User as PrismaUser } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async (userName: string, email: string, password: string): Promise<PrismaUser> => {
    console.log("Registering user")
    try {
        const newUser = await prisma.user.create({
            data: {
                userName,
                email,
                password,
            },
        });
        return newUser
        // Handle success, e.g., return the newUser
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Rethrow the error or handle it accordingly
    }
}

export default createUser
// TODO: add other functions