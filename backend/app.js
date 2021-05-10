const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')

const { use404, use500 } = require('./controllers/errorControllers')
const folderRoutes = require('./routes/folderRoutes')

// read .env file
dotenv.config()
if (!process.env.ROOT_FOLDER) {
  throw new Error('Missing required environment variable - exiting!')
}

// express
const app = express()
app.use(express.json())
app.use(morgan('dev'))

// cors
const options = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type'
}
app.use(cors(options))

// own routes
app.use(folderRoutes)

// 404
app.use(use404)

// error handler
app.use(use500)

// start server
const port = process.env.PORT || 3001
app.listen(port)
console.log('express server started')
console.log(`serving json files from ${process.env.ROOT_FOLDER}`)