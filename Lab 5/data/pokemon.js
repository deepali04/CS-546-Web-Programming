//Your data modules to make the Axios calls and get the data

const axios = require('axios');

const pokemon= async()=>{
  let {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return data; 
};

const pokemonById = async (id) => {

  try{
    if(typeof(id)!=='string'|| id===null){
      throw 'Invalid URL Parameter';
    }

    // if(id.length===1 && id.charAt(0)==="*"){
    //   let {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    //   return data; 
    // }

    id=id.trim();
    const specialCharacters = /[`%^&*!@#$()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if((id.match(/[a-z]/i)) || specialCharacters.test(id) || id=='0'){
      throw 'Invalid URL Parameter';
    }
  }
  catch(e){
    throw 'Invalid URL Parameter';
  }
  try{
    let {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ id.trim());
    return data;

  }
  catch(e){
    throw 'ID not found!';
  } 
};

module.exports = {
  pokemon,
  pokemonById
};