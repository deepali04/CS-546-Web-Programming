//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const movieData= data.movies;
const { ObjectId } = require('mongodb');
const helper = require('../helpers');

router
  .route('/:movieId')
  .get(async (req, res) => {
    if (!req.params.movieId) {
      res.status(400).json({ error: 'You must provide an ID' });
      return;
    }
  
    if (!req.params.movieId.trim().length) {
      res.status(400).json({ error: 'ID provided only contains blank spaces' });
      return;
    }
  
    if(!ObjectId.isValid(req.params.movieId)) {
      res.status(400).json({ error: 'The ID is not a valid Object ID' });
      return;
    }
    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: 'Movie not found' });
      return;
    }  
    try {
      let review = await reviewData.getAllReviews(req.params.movieId);
      res.json(review);
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: e });
    }
  })
  
  .post(async (req, res) => {
    let reviewInformation = req.body;

    if (!req.params.movieId) {
      res.status(400).json({ error: 'You must provide an ID' });
      return;
    }
    if (!req.params.movieId.trim().length) {
      res.status(400).json({ error: 'ID provided only contains blank spaces' });
      return;
    }
    if(!ObjectId.isValid(req.params.movieId)) {
      res.status(400).json({ error: 'The ID is not a valid Object ID' });
      return;
    }

    if (!reviewInformation) {
      res.status(400).json({ error: 'Provide data to create review' });
      return;
    }
    try{
      helper.reviewTitleErrorChecking(reviewInformation.reviewTitle);
      helper.reviewerNameErrorChecking(reviewInformation.reviewerName);
      helper.reviewErrorChecking(reviewInformation.review);
      helper.reviewRatingErrorChecking(reviewInformation.rating);
    }
    catch(e){
      res.status(400).json({ error: e });
      return;
    } 
    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    try {
      const newReview = await reviewData.createReview(
        req.params.movieId,
        reviewInformation.reviewTitle.trim(),
        reviewInformation.reviewerName.trim(),
        reviewInformation.review.trim(),
        reviewInformation.rating
      );
      res.json(newReview);
    } catch (e) {
      res.status(400).json({ error: e });
      }
})

router
  .route('/review/:reviewId')
  .get(async (req, res) => {

    if (!req.params.reviewId) {
      res.status(400).json({ error: 'You must provide an ID' });
      return;
    }
    if (!req.params.reviewId.trim().length) {
      res.status(400).json({ error: 'ID provided only contains blank spaces' });
      return;
    }
  
    if(!ObjectId.isValid(req.params.reviewId)) {
      res.status(400).json({ error: 'The ID is not a valid Object ID' });
      return;
    }
    
    try {
      let review = await reviewData.getReview(req.params.reviewId);
      res.json(review);
    } catch (e) {
      res.status(404).json({ error: 'Review not found' });
    }    
  })
  .delete(async (req, res) => {
    
    if (!req.params.reviewId) {
      res.status(400).json({ error: 'You must provide an ID' });
      return;
    }
    if (!req.params.reviewId.trim().length) {
      res.status(400).json({ error: 'ID provided only contains blank spaces' });
      return;
    }
    if(!ObjectId.isValid(req.params.reviewId)) {
      res.status(400).json({ error: 'The ID is not a valid Object ID' });
      return;
    }

    try {
      await reviewData.getReview(req.params.reviewId);
    } catch (e) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
      
    try {
      const deletedReview = await reviewData.removeReview(req.params.reviewId);
      res.json(deletedReview);
    } catch (e) {
      res.status(500).json({ error: 'Review cannot be deleted' });
    }
  });

  module.exports = router;
