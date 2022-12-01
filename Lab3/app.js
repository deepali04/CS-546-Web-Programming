/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

*/
const people = require("./people");
const companies = require("./companies");

async function main(){


    //Functions for people.js

    //1. GetPersonByID

    //must Pass
    try{
        const peopledata = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
        //const peopledata = await people.getPersonById(" fa36544d-bf92-4ed6-aa84-7085c6cb0440  ");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }


    //Throw Error
    // try{
    //     const peopledata = await people.getPersonById();
    //     //const peopledata = await people.getPersonById(-1);
    //     //const peopledata = await people.getPersonById(null);
    //     //const peopledata = await people.getPersonById(undefined);
    //     //const peopledata = await people.getPersonById(" Fa36544d-bf92-4ed6-aa84-7085c6cb0440  ");
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }



    //2. sameJobTitle

    //must pass
    try{
        //const sameJobTitle = await people.sameJobTitle("   Help Desk Operator");
        const sameJobTitle = await people.sameJobTitle("Programmer ii");
        console.log(sameJobTitle);
    }catch(e){
        console.log (e);
    }

    //throw error

    // try{
    //     //const sameJobTitle = await people.sameJobTitle();
    //     //const sameJobTitle = await people.sameJobTitle("       ");
    //     //const sameJobTitle = await people.sameJobTitle(null);
    //     const sameJobTitle = await people.sameJobTitle({});
    //     //const sameJobTitle = await people.sameJobTitle(NaN);
    //     //const sameJobTitle = await people.sameJobTitle("Programmer it");
    //     console.log(sameJobTitle);
    // }catch(e){
    //     console.log (e);
    //  }


    //3.getPostalCodes
    //must pass
    try{
        const getpostalCode = await people.getPostalCodes("   Salt Lake City", "Utah	");
        //const getpostalCode = await people.getPostalCodes("austin", "TEXAS");
        //const getpostalCode = await people.getPostalCodes("Woburn", "Massachusetts");
        // const getpostalCode = await people.getPostalCodes("Austin", "Texas");
        console.log(getpostalCode);
    }catch(e){
        console.log (e);
    }

    //throw error
    // try{
    //     //const getpostalCode = await people.getPostalCodes("    ", "Texas");
    //     //const getpostalCode = await people.getPostalCodes("austin", "   ");
    //     //const getpostalCode = await people.getPostalCodes();
    //     const getpostalCode = await people.getPostalCodes(10, 4);
    //     //const getpostalCode = await people.getPostalCodes("Austin", 4);
    //     //const getpostalCode = await people.getPostalCodes("14  ", "");
    //     //const getpostalCode = await people.getPostalCodes("Bayside", "New York");

    //     console.log(getpostalCode);
    // }catch(e){
    //         console.log (e);
    // }



    //4.sameCityAndState
    //must pass
    try{
        const sameCityAndState = await people.sameCityAndState("salt Lake City     ", "Utah");
        //const sameCityAndState = await people.sameCityAndState("DallAs", " TEXAS");
        
        console.log(sameCityAndState);
    }catch(e){
        console.log (e);
    }

    //must fail
    // try{
    //     //const sameCityAndState = await people.sameCityAndState("Bayside", "New York");
    //     //const sameCityAndState = await people.sameCityAndState(2,29);
    //     //const sameCityAndState = await people.sameCityAndState();
    //     const sameCityAndState = await people.sameCityAndState("Bayside", null);
    //     // const sameCityAndState = await people.sameCityAndState([]);
    //     // const sameCityAndState = await people.sameCityAndState(undefined);
    //     // const sameCityAndState = await people.sameCityAndState("Bayside", "New York");
    //     console.log(sameCityAndState);
    // }catch(e){
    //         console.log (e);
    // }


    //Functions in companies.js

    //1.listEmployees
    //must pass

    try{
        //const listEmployees = await companies.listEmployees("   Homenick, SKILES and Konopelski");
        const listEmployees = await companies.listEmployees("   Kemmer-Mohr");
        console.log(listEmployees);
    }catch(e){
        console.log (e);
    }

    //Throw Error

    // try{
    //     const listEmployees = await companies.listEmployees(123);
    //     //const listEmployees = await companies.listEmployees('foobar');
    //     //const listEmployees = await companies.listEmployees(null);
    //     console.log(listEmployees);
    // }catch(e){
    //         console.log (e);
    // }

    //2.sameIndustry
    //Should Pass
    try{
        const samesIndustry = await companies.sameIndustry("     auto Parts:O.E.M.   ");
        //const samesIndustry = await companies.sameIndustry("n/a");
        console.log(samesIndustry);
    }catch(e){
        console.log (e);
    }

    //Throw Error
    // try{
    //     //const samesIndustry = await companies.sameIndustry('Foobar Industry');
    //     //const samesIndustry = await companies.sameIndustry(' ');
    //     //const samesIndustry = await companies.sameIndustry(null);
    //     //const samesIndustry = await companies.sameIndustry();
    //     //const samesIndustry = await companies.sameIndustry(undefined);
    //     //const samesIndustry = await companies.sameIndustry([]);
    //     const samesIndustry = await companies.sameIndustry(123);
    //     console.log(samesIndustry);
    // }catch(e){
    //     console.log (e);
    // }
  


    //3.getCompanyById
    //must pass
    try{
        const getCompanies = await companies.getCompanyById("  fb90892a-f7b9-4687-b497-d3b4606faddf");
        console.log(getCompanies);
    }catch(e){
            console.log (e);
    }


    //Throw error
    // try{
    //     //const getCompanies = await companies.getCompanyById("  Fb90892a-f7b9-4687-b497-d3b4606faddf");
    //     //const getCompanies = await companies.getCompanyById("");
    //     //const getCompanies = await companies.getCompanyById(null);
    //     //const getCompanies = await companies.getCompanyById(undefined);
    //     //const getCompanies = await companies.getCompanyById(NaN);
    //     //const getCompanies = await companies.getCompanyById(-1);
    //     //const getCompanies = await companies.getCompanyById([]);
    //     console.log(getCompanies);
    // }catch(e){
    //         console.log (e);
    // }
   
 }
 main();