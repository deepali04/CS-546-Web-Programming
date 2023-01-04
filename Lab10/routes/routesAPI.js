//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const data = require('../data');
const userData = data.users;
const helper = require('../helpers');

router
  .route('/').get(async (req, res) => {
    if(req.session.user) {
      return res.redirect('/protected');
  } else {
      res.render('userLogin', {title: "Login Form"});
  }
  })

router.route('/register')
  .get(async (req, res) => {
    if(req.session.user) {
      return res.redirect('/protected');
  } else {
      res.render('userRegister', {title: "Register Form"});
  }
  })
  .post(async (req, res) => {
    let requestData = req.body;
    let usersList;
    try {
      helper.validationFunction(requestData.usernameInput, requestData.passwordInput);
      usersList = await userData.createUser(requestData.usernameInput, requestData.passwordInput)
      if(usersList.insertedUser)
        res.redirect('/');
    } catch(e) {
        if(e.statusCode===500){
          res.status(500).render('userRegister', {hasErrors: true, error: e.message, title: "Register"});
        }
        if(e.statusCode) {
          res.status(400).render('userRegister', {hasErrors: true, error: e.message, title: "Register"});
          return;
        } else {
          res.status(400).render('userRegister', {hasErrors: true, error: "You did not provide a valid username and/or password.", title: "Register"});
          return;
        }
      }
  })
 
router.route('/login').post(async (req, res) => { 
  let requestData = req.body;
  let usersList;
  try {
    helper.validationFunction(requestData.usernameInput, requestData.passwordInput);
    usersList = await userData.checkUser(requestData.usernameInput, requestData.passwordInput);
    if(usersList.authenticatedUser) {
      req.session.user = requestData.usernameInput.trim();
      res.redirect('/protected');
    }
  } catch(e) {
    if(e.statusCode) {
      console.log(e);
      res.status(400).render('userLogin', {hasErrors: true, error: e.message, title: "Login"});
      return;    
    } else {
      console.log(e);
      res.status(400).render('userLogin', {hasErrors: true, error: "Either the username or password is invalid.", title: "Login"});
      return;
    }
  }
})

router
  .route('/protected').get(async (req, res) => {
      var today = new Date();
      var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      res.render('private', {title: `Hey ${req.session.user}!`, currentDateTime: dateTime });
  })

router
  .route('/logout').get(async (req, res) => {
    if (!req.session.user) {
      return res.status(403).render('private', {hasErrors: true, error: "User is not logged in, please login."});
  } else {
      req.session.destroy();
      res.status(200).render('logout', {title: "Logout"});
  }   
})
module.exports = router;