const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const position = req.body.position;

  const queryText = `INSERT INTO "user" (username, password, position)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, position])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "user" SET "first_name" = $1, "last_name" = $2, "classification" = $3
                       WHERE "id" = $4;`;
    pool.query(queryText, [req.body.first_name, req.body.last_name, req.body.classification, req.params.id])
      .then(() => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403); // forbidden
  };
});

router.get('/all', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "user";`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "user" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(() => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403); // forbidden
  };
});

module.exports = router;