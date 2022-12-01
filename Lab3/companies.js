const axios = require('axios');

const getCompaniesDataFromAPI=async()=>{
  let {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data;
};

const getpeopleDataFromAPI=async()=>{
  let {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
};

const listEmployees = async (companyName) => {
  if(companyName===null || !(typeof(companyName)==='string') || companyName.trim().length===0){
    throw "Not a valid company. Please provide valid company";
  }
  let companiesData = await getCompaniesDataFromAPI();
  let peopleData= await getpeopleDataFromAPI();

  let companyObject ={};
  let arrayofNames=[];
  companiesData.forEach(element => {
    if(element.name.toLowerCase().trim()===companyName.toLowerCase().trim()){
      peopleData.forEach(person => {
        if(person.company_id===element.id){
          arrayofNames.push(person.first_name+ ' ' + person.last_name);
        }  
        const sortedNames = arrayofNames.slice().sort(function(fName, lName) { 
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
        element['employees']=sortedNames;
      });
      Object.assign(companyObject, element);
    }
  }); 

  if(Object.keys(companyObject).length === 0){
      throw `No company name with ${companyName}`;
  }  
  return companyObject;

};


const sameIndustry = async (industry) => {
  if(industry===null || !(typeof(industry)==='string') || industry.trim().length===0){
    throw "Not a valid industry. Please Enter valid industry";
  }
  let companiesData = await getCompaniesDataFromAPI();
  let companyArray=[]
  companiesData.forEach(company => {
    if(company.industry.toLowerCase().trim()=== industry.toLowerCase().trim()){
        companyArray.push(company);
    } 
  });

  if(companyArray.length===0){
    throw " No companies in that industry";
  }
  return companyArray;
};

const getCompanyById = async (id) => {
  if(id==null || !(typeof(id)==='string') || id.trim().length===0){
    throw "Not a valid ID. Please provide valid ID";
  }

  let companyData = await getCompaniesDataFromAPI();
  let desiredCompany={};
  companyData.forEach(company => {
    if(company.id.trim()===id.trim()){
      Object.assign(desiredCompany,company)
    }
  });

  if(Object.keys(desiredCompany).length === 0){
    throw 'company not found';
}  
  return desiredCompany;
};

module.exports = {
  listEmployees,
  sameIndustry,
  getCompanyById
};
