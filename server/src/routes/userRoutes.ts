import express from 'express'
import registerUser from '../controllers/userController'

const router = express.Router()

// router.get('/users', UserController.getAllUsers)
router.post('/users', registerUser)
// router.get('/users/:id', UserController.getUserById)
// router.put('/users/:id', UserController.updateUser)
// router.delete('/users/:id', UserController.deleteUser)

export default router
