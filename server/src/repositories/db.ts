import mysql from 'mysql2/promise' // Import the mysql2 library

// Database configuration
const dbConfig = {
    host: 'localhost',         // Replace with your MySQL container's hostname or IP address
    port: 3306,
    user: 'ihsan',     // Replace with the username you set in docker-compose.yml
    password: 'qwerty', // Replace with the password you set in docker-compose.yml
    database: 'social_media', // Replace with the database name you set in docker-compose.yml
}

// Create a database connection pool
const pool = mysql.createPool(dbConfig)

// Export the pool for use in your application
export default pool
