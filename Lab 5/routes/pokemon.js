//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes

const express = require('express');
const router = express.Router();

const data= require('../data');
const pokemonData= data.pokemon;

router.route('/pokemon')
      .get(async (req, res) => {       
      try {
          const pokemonList= await pokemonData.pokemon();
          res.json(pokemonList);
      } catch (e) {
          res.status(404).json({message: 'Incorrect URL'});;
      }
});

router.route('/pokemon/:id')
      .get(async(req, res) => {
      try {
          const pokemonID= await pokemonData.pokemonById(req.params.id);
          res.json(pokemonID);
      } catch (e) {
        if (e==='Invalid URL Parameter'){
            res.status(400).json({message: 'Invalid URL Parameter'}); 
        }
        else{
            res.status(404).json({message: 'Pokémon Not Found!'});
        }
      }
});

//Request Method
module.exports = router;