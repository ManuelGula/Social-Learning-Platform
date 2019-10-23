const express = require('express');
const bcrypt = require('bcrypt');
const isEmpty = require("is-empty");
var loginValidate = require('../validation/login');
var registerValidate = require('../validation/register');
var db = require('../db');
const saltRounds = 10;
const router = express.Router();

router.post('/signIn', function(req, res, next) {  
  var email = req.body.email;
  var signInPassword = JSON.stringify(req.body.password);
  console.log(loginValidate(req.body))
  if(loginValidate(req.body)){
    db.query('SELECT * FROM "USER" WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error;
      }
      console.log("This is the database info grabbing users. You can see it comes after because it's asynchronous");
      if(isEmpty(results.rows)){
        console.log("No email like " + email);
      } else{
        var passwordDB= results.rows[0].password;
        bcrypt.compare(signInPassword, passwordDB, function(err, result) {
          if(result) {
            console.log("Successful login!");
            var string = "Successful Login";
          } else {
            console.log("Wrong Password");
          } 
        });} 
    })
  } else{
    console.log('Validation didn\'t pass');
    res.send(loginValidate(req.body).errors);
  }
});


router.post('/register', function(req, res, next) {
    var password = JSON.stringify(req.body.password);
    var firstname = req.body.name.split(' ').slice(0, -1).join(' ');
    var lastname = req.body.name.split(' ').slice(-1).join(' ');
    var canRegister = false;
    if(registerValidate(req.body) && req.body.hasAgreed == true){
      bcrypt.hash(password, saltRounds, function(err, hash) {
        db.query('INSERT INTO "USER"(firstname, lastname, email, password) VALUES ($1, $2, $3, $4) ', [firstname, lastname, req.body.email, hash], (error, results) => {
          if(error) {
            console.log("Something went wrong with the db");
            console.log(error.message || error);
            res.send("Duplicate entries of email")
            res.end()
          } else {
            canRegister = true;
            console.log("Added the user " + firstname + " " + lastname + "!")
            res.send(canRegister)
            res.end()
          }
        });
      });
    } else{
      res.send("The validation for the fields didn't pass")
      console.log('validation didn\'t pass');
      res.send(canRegister)
      res.end(loginValidate(req.body).errors);
    }
});

module.exports = router;