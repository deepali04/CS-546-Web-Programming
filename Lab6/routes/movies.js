//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const {ObjectId} = require('mongodb');
const helper = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const movieList = await movieData.getAllMovies();
      res.json(movieList);
    } catch (e) {
      res.status(404).json({error: 'No Movie found'});
    }
  })
  .post(async (req, res) => {
    const movieInformation = req.body;
    try{
      helper.titleErrorChecking(movieInformation.title);
      helper.plotErrorChecking(movieInformation.plot);
      helper.studioErrorChecking(movieInformation.studio);
      helper.directorErrorChecking(movieInformation.director);
      helper.ratingErrorChecking(movieInformation.rating);
      helper.genresErrorChecking(movieInformation.genres);
      helper.castMembersErrorChecking(movieInformation.castMembers);
      helper.dateReleasedErrorChecking(movieInformation.dateReleased);
      helper.runTimeErrorChecking(movieInformation.runtime);
    }
    catch(e){
      res.status(400).json({ error: e });
      return;
    }

    movieInformation.title=movieInformation.title.trim();
    movieInformation.plot=movieInformation.plot.trim();
    movieInformation.rating=movieInformation.rating.trim();
    movieInformation.studio=movieInformation.studio.trim();
    movieInformation.director=movieInformation.director.trim();
    movieInformation.dateReleased=movieInformation.dateReleased.trim();
    movieInformation.runtime=movieInformation.runtime.trim();

    try{
      let newMovie = await movieData.createMovie(
        movieInformation.title,
        movieInformation.plot,
        movieInformation.genres,
        movieInformation.rating,
        movieInformation.studio,
        movieInformation.director,
        movieInformation.castMembers,
        movieInformation.dateReleased,
        movieInformation.runtime
      );
      res.json(newMovie);
    } catch (e) {
      res.status(400).json({error: 'Error while creating Movie. Please check'});
      }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    if (!req.params.movieId) {
      res.status(400).json({error: 'You must provide an ID'});
      return;
    }
  
    if (!req.params.movieId.trim().length===0) {
      res.status(400).json({error: 'ID contains only empty spaces'});
      return;
    }
  
    if(!ObjectId.isValid(req.params.movieId)) {
      res.status(400).json({ error: 'The ID provided is not a valid Object ID' });
      return;
    }
  
    try {
      let movie = await movieData.getMovieById(req.params.movieId);
      console.log(movie);
      res.json(movie);
    } catch (e) {
      res.status(404).json({ error: 'Movie not found' });
    }

});

router
  .route('/:movieId')
  .delete(async (req, res) => {
    if (!req.params.movieId) {
      res.status(400).json({error: 'You must provide an ID'});
      return;
    }
  
    if (!req.params.movieId.trim().length===0) {
      res.status(400).json({error: 'ID contains only empty spaces'});
      return;
    }
  
    if(!ObjectId.isValid(req.params.movieId)) {
      res.status(400).json({ error: 'The ID provided is not a valid Object ID' });
      return;
    }
    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    try {
      const deletedMovie = await movieData.removeMovie(req.params.movieId);
      res.json(deletedMovie);
    } catch (e) {
      res.status(400).json({ error: 'Provided movie can not be deleted' });
    }
  });
  
  router
  .route('/:movieId')
  .put(async (req, res) => {
    //code here for PUT
    let movieInformation = req.body;
    try{
      helper.titleErrorChecking(movieInformation.title);
      helper.plotErrorChecking(movieInformation.plot);
      helper.studioErrorChecking(movieInformation.studio);
      helper.directorErrorChecking(movieInformation.director);
      helper.ratingErrorChecking(movieInformation.rating);
      helper.genresErrorChecking(movieInformation.genres);
      helper.castMembersErrorChecking(movieInformation.castMembers);
      helper.dateReleasedErrorChecking(movieInformation.dateReleased);
      helper.runTimeErrorChecking(movieInformation.runtime);
    }
    catch(e){
      res.status(400).json({ error: e });
      return;
    }
    movieInformation.title=movieInformation.title.trim();
    movieInformation.plot=movieInformation.plot.trim();
    movieInformation.rating=movieInformation.rating.trim();
    movieInformation.studio=movieInformation.studio.trim();
    movieInformation.director=movieInformation.director.trim();
    movieInformation.dateReleased=movieInformation.dateReleased.trim();
    movieInformation.runtime=movieInformation.runtime.trim();

    movieInformation.genres = movieInformation.genres.map(element => {
      return element.trim();
    });

    movieInformation.castMembers = movieInformation.castMembers.map(element => {
      return element.trim();
    });

    if(movieInformation.runtime.charAt(0)==='0'){
      movieInformation.runtime=movieInformation.runtime.slice(1);
    }
    let index= movieInformation.runtime.indexOf('min');
    if(movieInformation.runtime.charAt(index-2)==='0'){
      movieInformation.runtime=movieInformation.runtime.slice(0,index-2)+ movieInformation.runtime.slice(index-1);
    }
    const releasedDate=new Date(movieInformation.dateReleased);
    const finalDate= helper.formatDateReleased(releasedDate);

    if(!ObjectId.isValid(req.params.movieId)) {
      res.status(400).json({ error: 'The ID is not a valid Object ID' });
      return;
    }
    
    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    try {
      const updatedMovie = await movieData.updateMovie(
        req.params.movieId,
        movieInformation.title,
        movieInformation.plot,
        movieInformation.genres,
        movieInformation.rating,
        movieInformation.studio,
        movieInformation.director,
        movieInformation.castMembers,
        movieInformation.dateReleased,
        movieInformation.runtime
      );
      res.json(updatedMovie);
    } catch (e) {
      res.status(404).json(e);
    }
});
  module.exports = router;
