const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST route for message
router.post('/:id', (req, res) => {
    // console.log('In POST /api/message', req.body)
    const queryText = `INSERT INTO "message" (status_number, details, user_id)
    VALUES ($1, $2, $3) RETURNING status_number`;
    pool.query(queryText, [req.body.status_number, req.body.details, req.params.id])
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('Error in POST /api/message/:id: ', error);
            res.sendStatus(500);
        });
});

// GET route for message/status
router.get('/:id', (req, res) => {
    let queryText = `SELECT * FROM "message" WHERE "user_id" = $1 ORDER BY "created_at_timestamp" DESC LIMIT 1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log(result.rows[0])
            res.send(result.rows[0]);
        }).catch((error) => {
            res.sendStatus(500);
        });
});

module.exports = router;