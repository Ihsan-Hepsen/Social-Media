import express, { Request, Response } from 'express'
import bodyParser from 'body-parser' // Middleware for parsing JSON request bodies
import userRoutes from './routes/userRoutes' // Import your user routes

const app = express()

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/users', userRoutes) // Mount the user routes under the /users endpoint

// Start the server
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
