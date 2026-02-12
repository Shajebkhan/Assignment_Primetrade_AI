const express = require('express');
const { ensuredAuth } = require('../middleware/Auth');
const router = express.Router();

router.get('/', ensuredAuth, (req,res)=> {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
} )

module.exports = router;