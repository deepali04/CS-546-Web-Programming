const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');
const helper = require('../helpers');

const createReview = async (movieId, reviewTitle, reviewerName, review, rating) => {

  if(!ObjectId.isValid(movieId))
    throw [400,"The ID is not a valid Object ID"];

  rating= Math.round(rating * 10) / 10; 
  
  try{
    helper.reviewTitleErrorChecking(reviewTitle);
    helper.reviewerNameErrorChecking(reviewerName);
    helper.reviewErrorChecking(review);
    helper.reviewRatingErrorChecking(rating);
  } catch (e) {
    throw e;
  }
  console.log("idhar came");
  const movieCollection = await movies();
  const wrongMovie = await movieCollection.findOne({ _id: ObjectId(movieId)});
  console.log(wrongMovie);
  console.log(wrongMovie === null);

  if(wrongMovie === null)
    throw [400,"Movie does not exists, Please try again for another movie"];

  const moment = require("moment");
  let reviewDate= moment().format("MM/DD/YYYY");
  
  const newReview = {
    _id: new ObjectId(),
    reviewTitle: reviewTitle,
    reviewerName: reviewerName,
    review: review,
    rating: rating,
    reviewDate: reviewDate   
  };
  
  
  console.log("below is newreview");
  console.log(newReview)

  let movieArray=[], avgRating=0;
  const addReview = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$push: {reviews: newReview}}
  )
  if(!addReview.matchedCount && !addReview.modifiedCount)
    throw [500,"Update of the reviews has been failed"];

    const reviewA= await movieCollection.findOne({ _id: ObjectId(movieId)});
    if(reviewA===null){
      throw [404,"please try again. this id doesn't exists"];
    }

    movieArray.push(reviewA);
    movieArray.forEach(movie => {
      movie.reviews.forEach(review => {
          avgRating += review.rating;
      });
  });

  avgRating = (avgRating/reviewA.reviews.length);
  //avgRating= Number(avgRating.toFixed(1));
  avgRating= Math.round(avgRating * 10) / 10;
  const reviewUpdate = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: {overallRating: avgRating}}
  ) 
  if(!reviewUpdate.matchedCount && !reviewUpdate.modifiedCount)
    throw [500,"Update of the rating has been failed"];
  
  const movie1 = await movieCollection.findOne({ _id: ObjectId(movieId)});    
  
  if (movie1 === null)
    throw [400,"No Movie found with that id"];

  movie1._id = movie1._id.toString();   

  for(let key in movie1) {
    if(typeof movie1[key] === 'object' && key === "reviews") {
      if(Array.isArray(movie1[key])) {
        for(let i = 0; i < movie1[key].length; i++) {
          movie1[key][i]._id = movie1[key][i]._id.toString();
        }
      }
    }
  }
  return movie1;
};

const getAllReviews = async (movieId) => {

  if (!movieId)
    throw [400,"You must provide valid Id input for your review"];
        
  if (typeof movieId !== 'string')
    throw [400,"Please enter a valid string for your review Id inputs"];

  if(!movieId.trim().length)
    throw [400,"Only empty spaces in the review Id input is not allowed"];

  if(!ObjectId.isValid(movieId))
    throw [400,"The ID is not a valid Object ID"];

  
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: ObjectId(movieId)});

  if (movie === null)
      throw [404,"No Movie found with that id"];

  movie.reviews.forEach(element => {
      element._id = element._id.toString();
  })
  if(movie.reviews.length===0){
    throw [404,"No Reviews found with this movieID"];
  }
  return movie.reviews;
};

const getReview = async (reviewId) => {    
  if (!reviewId)
    throw [400,"You must provide valid ID"];

  if (typeof (reviewId) !== 'string')
    throw [400,"Please Enter a string"];

  if(!reviewId.trim().length)
    throw [400,"movie ID contains only blank spaces"];

  if(!ObjectId.isValid(reviewId))
    throw [400,"The ID is not a valid Object ID"];
  
  
  let resultData = {};
  const movieCollection = await movies();
  const movie = await movieCollection.find({}).toArray();
  if(movie === null)
    throw [404,"No review present with that ID"];
  
  movie.forEach(element => {
    element.reviews.forEach(review => {
      if(review._id.toString() === reviewId) {
        resultData = {
          "_id": review._id,
          "reviewTitle": review.reviewTitle,
          "reviewerName": review.reviewerName,
          "review": review.review,
          "rating": review.rating,                     
        };
      }
    })
  });

  resultData._id = resultData._id.toString();
  return resultData;
};

const removeReview = async (reviewId) => { 
  if (!reviewId)
    throw [400,"You must provide valid ID"];

  if (typeof (reviewId) !== 'string')
    throw [400,"Please Enter a string"];

  if(!reviewId.trim().length)
    throw [400,"movie ID contains only blank spaces"];

  if(!ObjectId.isValid(reviewId))
    throw [400,"The ID is not a valid Object ID"];
  
  let movieID = "", avgRating = 0, resultData = {};  
  const movieCollection = await movies();
  const movie = await movieCollection.find({}).toArray();
  //console.log(movie);
  if(movie=== null)
    throw [400,"This reviw ID does not exists"];
  
  movie.forEach(element => {
    element.reviews.forEach(data => {
      if(data._id.toString() === reviewId) {
        movieID = element._id;
        console.log(movieID)
      }
    })
  });
  const removeReview = await movieCollection.updateMany({}, {$pull: {reviews: {_id: ObjectId(reviewId)}}});   
  console.log(removeReview);
  if(!removeReview.matchedCount && !removeReview.modifiedCount)
    throw [500,"Can't remove this Review"];
        
  const movieReview = await movieCollection.find({}).toArray();
  console.log("this is movieReview");
  //console.log(movieReview);
  if(movieReview === null)
    throw [404,"No review present with that Id"];

  movieReview.forEach(element => {
    if(element._id.toString() === movieID.toString()) {
      element.reviews.forEach(data => {
        avgRating += data.rating;
    })
    avgRating = (avgRating/element.reviews.length);
    }
  });

  if(isNaN(avgRating)){
    avgRating=0;
  }

  avgRating= Math.round(avgRating * 10) / 10; 
  const reviewUpdate = await movieCollection.updateOne(
      {_id: ObjectId(movieID)},
      {$set: {overallRating: avgRating}}
  )

  if(!reviewUpdate.matchedCount && !reviewUpdate.modifiedCount)
      throw [500,"Update of the rating has been failed"];

  // resultData = {"reviewId": reviewId, "deleted": true};  
  // return resultData;

  const movieReturned= await movieCollection.findOne({ _id: ObjectId(movieID)});
  return movieReturned;
  
}

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
