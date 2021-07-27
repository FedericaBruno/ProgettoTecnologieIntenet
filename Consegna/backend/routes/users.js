const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/*Handle incoming HTTP GET request, to find the user by email in the database.*/
router.route('/:email').get((req, res) => {
  const email = req.params.email;
  User.findOne({email: email})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Handle incoming HTTP POST request, to add the user in the database.*/
router.post("/register", (req, res) => {
  /*Check if the email is already in use.*/
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "L'e-mail già utilizzata. Riprova."
        });
      } else {
        /*The User is created and saved in the database using the hash of the password (using "bcrypt" library).*/
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              cartItems: [[],0],
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

/*Handle HTTP POST request for the login.
  Find the user by email and compares the password inserted with the hash in the database.
  If credentials are correct, this send a token with data as response (using "jsonwebtoken" library).*/
router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              username: user[0].username
            },
            "secret",
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            userId: user[0]._id,
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


/*Handle HTTP PATCH request to save the cart Items of the user in the database.*/
router.patch('/:userId', async(req,res) => {
  try{
    const updatedUser = await User.updateOne(
      {_id: req.params.userId},
      {$set: {cartItems: req.body.cartItems}}
    );
    res.json(updatedUser);
  }
  catch (err){
    res.json({message: err});
  }
})

/*Handle HTTP GET request to get a user by its Id.*/
router.get('/id/:userId', async (req, res) => {
  try{
      const user = await User.findById(req.params.userId);
      return res.json(user);
  } catch(err){
      res.json({message: err});
  }
});

module.exports = router;
