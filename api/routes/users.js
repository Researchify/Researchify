/**
 * This module defines endpoints for the "/foo" route and exports its corresponding Router
 */
const router = require('express').Router();

let User = require('../models/user.model');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user == null) {
                res.status(400).send("User not found");
            } else if (user.password != req.body.password) {
                res.status(400).send("Incorrect password");
            } else {
                res.send("Successfully logged in");
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;