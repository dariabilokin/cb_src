const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const prisma = require('./prisma/prisma')
const { generalLimiter } = require('./middleware/rateLimiter')

// Load env vars from .env file
require('dotenv').config()
// Declare a new express app
const app = express()
// Define the port
const port = 8000

// Use the CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3002', // Allow requests from this origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // If you need to send cookies or authentication tokens
  })
)

app.use(express.json())
app.use(generalLimiter) // Apply to all routes
app.use(express.urlencoded({ extended: false }))

app.use('/api/notes', require('./routes/notesRoutes.js'))
app.use('/api/users', require('./routes/usersRoutes.js'))
app.use('/api/auth', require('./routes/authRoutes.js'))

// should be the last middleware
app.use(errorHandler)

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  const names = users.map((user) => user.name)
  res.send('Hello World! ' + names.join(', '))
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
