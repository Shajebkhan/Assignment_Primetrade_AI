const express = require('express')
const core = require('cors')
require('dotenv').config();
const app = express()

app.use(express.json())
app.use(core())

app.get('/', (req, res) => {
    res.send('backend is running')
})

const PORT = process.env.PORT || 5000;

app.listen((PORT), () => console.log(`server is running on port ${PORT}`))