const axios = require('axios');

 const getDataFromAPI=async()=>{
  let {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
};

const getPersonById = async (id) => {
  if(id===null || !(typeof(id)==='string') || id.trim().length===0){
    throw "Not a valid ID. Please provide valid ID";
  }
  let peopleData = await getDataFromAPI();
  let desiredPerson={}
  peopleData.forEach(person => {
    if(person.id.trim()===id.trim()){
      Object.assign(desiredPerson,person)
    }
  });
  if(Object.keys(desiredPerson).length === 0){
    throw  "person not found";
  }
  return desiredPerson;
};

const sameJobTitle = async (jobTitle) => {
  if(jobTitle===null || !(typeof(jobTitle)==='string') || jobTitle.trim().length===0){
    throw "Not a valid job title. Please provid proper Job Title";
  }
  let peopleData = await getDataFromAPI();
  let peopleWithSameJob=[]
  peopleData.forEach(person => {
      if(person.job_title.toLowerCase().trim()===jobTitle.toLowerCase().trim()){
        peopleWithSameJob.push(person);
      }
  });
  if(peopleWithSameJob.length<2){
    throw "there are not two people with that job title";
  }
  return peopleWithSameJob;
};

const getPostalCodes = async (city, state) => {
  if(city===null || state===null || !(typeof(city)==='string') || !(typeof(state)==='string') ||
                         city.trim().length===0 || state.trim().length===0){
    throw 'Not a valid city/state. Please provid proper city/state';
  }

  const peopleData = await getDataFromAPI();
  let postalCodeArray =[];
  peopleData.forEach(element => {
    if(element.city.toLowerCase().trim()===city.toLowerCase().trim() && 
                                  element.state.toLowerCase().trim()===state.toLowerCase().trim()){
      postalCodeArray.push(element.postal_code);
    }
  });    

  if(postalCodeArray.length===0){
    throw 'There are no postal_codes for the given city and state combination';
  }
  
  for(let i=0;i<postalCodeArray.length;i++){
    if(!isNaN(postalCodeArray[i])){
      postalCodeArray[i]=parseInt(postalCodeArray[i]);     
    }
  }

  postalCodeArray.sort((a, b) => a - b)  
  return postalCodeArray;
};

const sameCityAndState = async (city, state) => {
  if(city===null || state===null || !(typeof(city)==='string') || !(typeof(state)==='string') ||
                                    city.trim().length===0 || state.trim().length===0){
    throw 'Not a valid city/state. Please provid proper city/state';
  }

  const peopleData = await getDataFromAPI();
  let peopleArray=[]
  peopleData.forEach(person => {
    if(person.state.toLowerCase().trim()=== state.toLowerCase().trim() && person.city.toLowerCase().trim()===city.toLowerCase().trim()){
        personFullName= person.first_name + ' ' + person.last_name;
        peopleArray.push(personFullName);
    } 
  });

  if(peopleArray.length<2){
    throw 'there are not two people who live in the same city and state';
  }

  const sortedNames = peopleArray.slice().sort(function(fName, lName) { 
    const LastName1 = fName.split(" ")[1];
    const LastName2 = lName.split(" ")[1];
    if(LastName1<LastName2){
      return -1;
    } 
    if(LastName1>LastName2){
      return 1;
    }
    return 0;
   });
  return sortedNames;
};

module.exports = {
  getPersonById,
  sameJobTitle,
  getPostalCodes,
  sameCityAndState
};
