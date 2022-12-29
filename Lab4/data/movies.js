const mongoCollections = require('./../config/mongoCollections');
const helper = require('../helpers');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');


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

  helper.titleErrorChecking(title);
  helper.plotErrorChecking(plot);
  helper.studioErrorChecking(studio);
  helper.directorErrorChecking(director);
  helper.ratingErrorChecking(rating);
  helper.genresErrorChecking(genres);
  helper.castMembersErrorChecking(castMembers);
  helper.dateReleasedErrorChecking(dateReleased);
  helper.runTimeErrorChecking(runtime);

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
  //console.log(finalDate);


  const movieCollection = await movies();
  //console.log(movieCollection);
  let newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
    }
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add movie';

  const newId = insertInfo.insertedId.toString();
  const movieF = await getMovieById(newId);
  movieF['_id']=movieF['_id'].toString();

  return movieF;
};


const getAllMovies = async () => {

  const moviesCollection= await movies();
  const moviesList = await moviesCollection.find().toArray();
  if (!moviesList) 
    throw 'Could not get all movies';
  moviesList.forEach(movie => {
    movie['_id']=movie['_id'].toString();
  });
  return moviesList;
};

const getMovieById = async (id) => {
  if (!id) throw 'Please provide an ID';
  if (!(typeof(id)==='string')) throw 'ID must be a string';
  if (id.trim().length === 0) throw 'ID cannot be an empty string or just spaces';
  id = id.trim();
  //console.log(id);
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  
  const moviesCollection = await movies();
  const desiredMovie = await moviesCollection.findOne({_id: ObjectId(id)});

  if (desiredMovie === null) throw 'There is no movie in DataBase with given ID';
  
  desiredMovie['_id']=desiredMovie['_id'].toString();
  return desiredMovie;
};

const removeMovie = async (id) => {
  if (!id) throw 'Please provide an ID';
  if (!(typeof(id)==='string')) throw 'ID must be a string';
  if (id.trim().length === 0) throw 'ID cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';

  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({_id: ObjectId(id)});
  const movieToBeDeleted = await moviesCollection.deleteOne({_id: ObjectId(id)});
  

    if (movieToBeDeleted.deletedCount === 0) {
      throw `Could not delete movie with id of ${id}`;
    }
    return (movie.title +" has been successfully deleted!")

};

const renameMovie = async (id, newName) => {
  if (!id) throw 'Please provide an ID';
  if (!(typeof(id)==='string')) throw 'ID must be a string';
  if (id.trim().length === 0) throw 'ID cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
   
  if(!newName) throw 'Please provide a new name';
  helper.titleErrorChecking(newName);
  newName = newName.trim();
  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({_id: ObjectId(id)});
  //console.log(movie);
  if(movie===null) throw 'There is no movie in DataBase with given ID';
  if(movie.title===newName){
    throw 'New Name can not be same as old one.'
  }
  const updatedMovie = {
    title: newName,
  };
  const updatedInfo = await moviesCollection.updateOne(
      {_id: ObjectId(id)},
      {$set: updatedMovie}
  );
  if(updatedInfo.modifiedCount === 0) {
    throw 'could not update movie successfully';
  }

  const finalMovieObject=await getMovieById(id);
  //finalMovieObject['_id']=finalMovieObject['_id'].toString();
  return finalMovieObject; 
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};
