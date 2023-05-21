const express = require('express')
const cookieParser = require("cookie-parser")
require('dotenv').config();
require('./config/db')
const router = require('./routes')

const app = express()
const port = process.env.port || 5000

// middleware
app.use(express.json());
app.use(cookieParser())

//routes
app.use('/api', router);

app.listen(port,()=> console.log(`Server running at port ${port}`))