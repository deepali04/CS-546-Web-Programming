const express = require('express');
const helper = require('../helpers');
const router = express.Router();
const data = require('../data');
const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const createUser = async ( username, password
) => { 
  username=username.trim().toLowerCase();
  password=password;
  
  try{
    helper.validationFunction(username,password);
  } catch (e) {
      throw e;
  }
  let userAuth = {insertedUser: false}

  const userCollection = await users();
  const isDuplicateUser = await userCollection.findOne({username: username});

  if(isDuplicateUser){
    throw {statusCode: 400, message: 'there is already a user with that username!'};
  }

  const hashedPassword = await bcrypt.hash(password,saltRounds);
  let newUser = {
    username: username,
    password: hashedPassword
  };
  const insertUser = await userCollection.insertOne(newUser);
  if(insertUser.insertedCount === 0){
    throw {statusCode: 500, message: 'Internal Server Error'};
  }
  userAuth.insertedUser = true;
  return userAuth;
};

const checkUser = async (username, password) => {
  username=username.trim().toLowerCase();
  password=password.trim();
  try{
    helper.validationFunction(username,password);
  } catch (e) {
      throw e;
  }
  let userAuth = {authenticatedUser: false}
  const userCollection = await users();
  const user = await userCollection.findOne({username: username});
  if(!user){
    //errorcode??????
    throw {statusCode: 400, message: "Either the username or password is invalid"};
  }
  let comparePassword = await bcrypt.compare(password, user.password);
  if(comparePassword) {
      userAuth.authenticatedUser = true;
  } else {
      throw {statusCode: 400, message: 'Either the username or password is invalid'};
  }
  return userAuth;
};

module.exports = {
  createUser,
  checkUser
};
