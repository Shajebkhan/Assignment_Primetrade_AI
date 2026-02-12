require('dotenv').config();

const express = require('express')
const core = require('cors');
const connectDB = require('./models/db');

const app = express()
const authRouter = require('./routes/AuthRouter');
const prodRouter = require('./routes/ProductRouter')

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(core())

app.use('/auth', authRouter);
app.use('/products', prodRouter);

app.get('/ding', (req, res) => {
    res.send('dong');
})
connectDB()
app.listen((PORT), () => console.log(`server is running on port ${PORT}`));