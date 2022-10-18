const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST route for message
router.post('/', (req, res) => {
    console.log('In POST /api/message', req.body)
});

module.exports = router;