const express = require('express')
const cors = require("cors")
require('dotenv').config();
const path = require("path");
require('./config/db')
const router = require('./routes')

const app = express()
const port = process.env.port || 5000

  // middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/uploads', express.static('uploads'));
app.use('/api', router);

app.listen(port,()=> console.log(`Server running at port ${port}`))