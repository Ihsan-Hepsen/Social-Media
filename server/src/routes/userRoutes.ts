import express from 'express'
import {
    getUser,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controllers/userController'

const router = express.Router()

router.get('/:id', getUser) // Defines a route with a dynamic "id" parameter
router.post('/', createUser)
router.get('/', getAllUsers) // This route doesn't use parameters
router.put('/:id', updateUser) // Defines a route with a dynamic "id" parameter
router.delete('/:id', deleteUser) // Defines a route with a dynamic "id" parameter

export default router
