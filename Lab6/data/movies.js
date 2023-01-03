const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper = require('../helpers');

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

try{
  helper.titleErrorChecking(title);
  helper.plotErrorChecking(plot);
  helper.studioErrorChecking(studio);
  helper.directorErrorChecking(director);
  helper.ratingErrorChecking(rating);
  helper.genresErrorChecking(genres);
  helper.castMembersErrorChecking(castMembers);
  helper.dateReleasedErrorChecking(dateReleased);
  helper.runTimeErrorChecking(runtime);
}catch (e) {
  throw e;
}
title=title.trim();
plot=plot.trim();
rating=rating.trim();
studio=studio.trim();
director=director.trim();
dateReleased=dateReleased.trim();
runtime=runtime.trim();

genres = genres.map(element => {
  return element.trim();
});

castMembers = castMembers.map(element => {
  return element.trim();
});

if(runtime.charAt(0)==='0'){
  runtime=runtime.slice(1);
}
let index= runtime.indexOf('min');
if(runtime.charAt(index-2)==='0'){
  runtime=runtime.slice(0,index-2)+ runtime.slice(index-1);
}
const releasedDate=new Date(dateReleased);
const finalDate=helper.formatDateReleased(releasedDate);


const movieCollection = await movies();
let newMovie = {
  title: title,
  plot: plot,
  genres: genres,
  rating: rating,
  studio: studio,
  director: director,
  castMembers: castMembers,
  dateReleased: finalDate,
  runtime: runtime,
  reviews:[],
  overallRating: 0
  }

  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw [500,"Could not add new movie"];

  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId.toString());
  return movie;
};

const getAllMovies = async () => {

  const moviesCollection= await movies();
  const moviesList = await moviesCollection.find().toArray();
  if (!moviesList) 
    throw 'Could not get all movies';
  resultArray=[];
  moviesList.forEach(movie => {
    resultObject={}
    movie['_id'] = movie['_id'].toString();
    resultObject._id=movie['_id']
    resultObject.title=movie.title;
    resultArray.push(resultObject)
  }); 

  return resultArray;
};

const getMovieById = async (movieId) => {
  if (!movieId)
    throw [400,"You must provide an ID"];
  if (typeof movieId !== 'string' || movieId.trim().length===0)
    throw [400,"Please provide a valid ID"];
  if(!ObjectId.isValid(movieId))
    throw [400,"The ID is not a valid Object ID"];

  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: ObjectId(movieId) });
  if (movie === null)
      throw [404,"No movie exists with this ID"];
  
  movie._id = movie._id.toString();
  return movie;
  
};

const removeMovie = async (movieId) => {
  if (!movieId)
    throw [400,"provide an ID to search for"];

  if(typeof movieId !== 'string' || movieId.trim().length===0)
    throw [400,"Please provide a valid ID"];

  if(!ObjectId.isValid(movieId))
    throw [400,"The ID is not a valid Object ID"];

let resultData = {};
const movieCollection = await movies();
const movie = await movieCollection.findOne({ _id: ObjectId(movieId) });

if (movie === null)
  throw [404,"No Movie present with that ID"];

const deletionInfo = await movieCollection.deleteOne({ _id: ObjectId(movieId) });

if(deletionInfo.deletedCount === 0) { 
  // console.log("here then")
  throw [400,"Could not delete movie"];
}
resultData = {"MovieID": movieId, "deleted": true};
return resultData;
};

const updateMovie = async (movieId, title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime) => {
  try{
    helper.titleErrorChecking(title);
    helper.plotErrorChecking(plot);
    helper.studioErrorChecking(studio);
    helper.directorErrorChecking(director);
    helper.ratingErrorChecking(rating);
    helper.genresErrorChecking(genres);
    helper.castMembersErrorChecking(castMembers);
    helper.dateReleasedErrorChecking(dateReleased);
    helper.runTimeErrorChecking(runtime);
  } catch (e) {
      throw e;
  }
  title=title.trim();
  plot=plot.trim();
  rating=rating.trim();
  studio=studio.trim();
  director=director.trim();
  dateReleased=dateReleased.trim();
  runtime=runtime.trim();
  
  genres = genres.map(element => {
    return element.trim();
  });
  
  castMembers = castMembers.map(element => {
    return element.trim();
  });
  
  if(runtime.charAt(0)==='0'){
    runtime=runtime.slice(1);
  }
  let index= runtime.indexOf('min');
  if(runtime.charAt(index-2)==='0'){
    runtime=runtime.slice(0,index-2)+ runtime.slice(index-1);
  }
  const releasedDate=new Date(dateReleased);
  const finalDate=helper.formatDateReleased(releasedDate);
  
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({_id: ObjectId(movieId)});

  if(movie === null){
    // console.log("hello")
    throw [404,"Requested Movie does not exist"];
  }

  let movieUpdateInfo = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews: movie.reviews,
    overallRating: movie.overallRating
  };
  const updatedMovie = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: movieUpdateInfo}
  );

  if(!updatedMovie.matchedCount && !updatedMovie.modifiedCount){
      
  }
      
  if(!updatedMovie.modifiedCount){
    throw [400,"Same values has been provided again. Please add new values"];
  }   

  const movieF = await movieCollection.findOne({_id: ObjectId(movieId)});
  return movieF;
  };


const renameMovie = async (id, newName) => {
  //Not used for this lab
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie  
};
