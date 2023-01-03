//Axios call to get all data
const axios = require("axios");
const baseURL='https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json/';

const getAllPeople = async () => {
  const { data }= await axios.get(baseURL);
  //console.log(data)
  return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
  if(!searchPersonName)
    throw 'You must provide a name to search';
  if (typeof (searchPersonName) !== 'string' || searchPersonName.trim().length===0)
    throw 'Please provide a valid term to search';
  
  const { data }= await axios.get(baseURL);
  let peopleData=data;
  let desiredPerson=[] 

  peopleData.forEach(person => {
    if(person.firstName.trim().toLowerCase().match(searchPersonName.trim().toLowerCase())){
      desiredPerson.push(person);
    }
    else if (person.lastName.trim().toLowerCase().match(searchPersonName.trim().toLowerCase()))
    desiredPerson.push(person);
  });
  
  if(desiredPerson.length===0){
    throw  "No Person found for the searched name";
  }
  finalResult=[];
  if (desiredPerson.length>20) {
    for(let i=0;i<20;i++) {
      finalResult.push(desiredPerson[i]);
    }
  }
  else {
    for(let j=0;j<desiredPerson.length; j++) {
      finalResult.push(desiredPerson[j]);
    }
  }
  //sorting implement
  //console.log(desiredPerson.slice(20));
  return finalResult;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {

  if (!id) 
    throw 'You must provide an id to search';
  if (typeof (id) !== 'string' || id.trim().length===0)
    throw 'Please provide a valid ID for searching';

  const { data } = await axios.get(baseURL);
  if(!data)
    throw 'No Person found for with the given ID';
  
  let peopleData=data;
  let desiredPerson=[];
  peopleData.forEach(person => {
    if(person.id===parseInt(id))
      desiredPerson.push(person);
  }); 
  if(desiredPerson.length===0){
    throw  "No Person found for the searched name";
  }
  desiredPerson.sort((a, b) => (a.id > b.id ? 1 : -1))
  return desiredPerson;
};

module.exports = { 
  getAllPeople,
  searchPeopleByName,
  searchPeopleByID
 };
