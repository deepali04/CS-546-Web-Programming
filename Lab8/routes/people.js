//Require express and express router as shown in lecture code and worked in previous labs
const axios = require('axios');
const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const peopleData = data.people;

router.route("/").get(async (req, res) => {
  res.sendFile(path.resolve('static/homepage.html'));
});

//searchPeople 
router.route("/searchpeople").post(async (req, res) => {
  let searchData = req.body;
  let errors = [];
  var regEx = /^[a-zA-Z]+$/;

  if(!searchData.searchPersonName || typeof searchData.searchPersonName !== 'string' || !searchData.searchPersonName.trim().replace(/\s/g, "").length) {
    errors.push('Please enter valid string for your search');
  }
  else if(!(regEx.test(searchData.searchPersonName))){
    errors.push('Search Data should contains alphabets only');
  }

  if(errors.length){
    res.statusCode=400;
    res.render('error', { errors:errors, title: "error"});
    return;
  }
  try {
    const peopleList =  await peopleData.searchPeopleByName(searchData.searchPersonName);  
    res.render('peopleFound', {searchPersonName: searchData.searchPersonName, people: peopleList, title: "People Found"});
  } catch (e) {
    res.statusCode=404;
    res.render('personNotFound', {searchPersonName: searchData.searchPersonName, title: "No People Found" })
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  let errors = [];
  var regEx = /^[0-9]+$/;
  if(!regEx.test(req.params.id)){
    errors.push("Please provide a valid ID");
  }

  if(errors.length){
    res.statusCode=400;
    res.render('error', { errors:errors, title: "error"});
    return;
  }

  try {
    const peopleList = await peopleData.searchPeopleByID(req.params.id);
    console.log(peopleList[0]);
    res.render('personFoundByID', {person: peopleList[0], title: "Person Found"})
    } 
  catch(e) {
    res.statusCode=404;
    res.render('personNotFound', { searchPersonName: req.params.id,  title: "No Person Found"});
  }
});

module.exports = router;
