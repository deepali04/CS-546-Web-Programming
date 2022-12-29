/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/
const movies = require("./data/movies");
const connection = require('./config/mongoConnection');

async function main() {

  const db = await connection.dbConnection();
  await db.dropDatabase();

  let movie1 = undefined;
  let movie2 = undefined;
  let movie3 = undefined;

  // 1. Create a Movie of your choice
  try{
      movie1 = await movies.createMovie(
      "Hacksaw Ridge",
      "The true story of Pfc. Desmond T. Doss, who won the Congressional Medal of Honor despite refusing to bear arms during WWII on religious grounds.",
      ["Drama", "Historical Fiction", "Biography"],
      "R",
      "Summit Entertainment Cross Creek",
      "Mel Gibson",
      ["Andrew Garfield", "Teresa Palmer", "Luke Btacy", "Vince Vaughn"],
      "10/12/2024",
      "01h 55min"
    );
    console.log(movie1);
  }catch (e) {
    console.log(e);
  }

  // 2. Log the newly created Movie. (Just that movie, not all movies)
  try{
    movieone= await movies.getMovieById(movie1._id)
    console.log(movieone);
  }catch(e) {
    console.log(e);
  }


  // // //3. Create another movie of your choice.
  try{
      movie2 = await movies.createMovie(
      "Tick Tick Boom    ",
      "Story of Jonathan Larson on how he struggled and wrote tick tick boom and RENT for Broadway",
      ["Biography    ", "Drama"],
      "PG-13    ",
      "Netflix   ",
      "LinManuel Miranda",
      ["Andrew Garfield      ", "Robin DeJesus", "Vanessa Hudson", "Alexandra Ship", "Joshua Henry"],
      "04/03/2021     ",
      "1h 55min    "
    )
    console.log(movie2);
  }catch (e) {
    console.log(e);
  }

  //4. Query all movies and log them all
  try{
    console.log(await movies.getAllMovies());
  }catch (e) {
    console.log(e);
  }
    
  //5. Create the 3rd movie of your choice.
  try{
      movie3 =await movies.createMovie(
      "The Amazing SpiderMan",
      "Abandoned by his parents and raised by an aunt and uncle, teenager Peter Parker (Andrew Garfield), AKA Spider-Man, is trying to sort out who he is and exactly what his feelings are for his first crush, Gwen Stacy (Emma Stone). ",
      ["Romance", "SuperHero", "Sci Fi"],
      "PG-13",
      "SONY PICTURES",
      "Marc Webb",
      ["Andrew Garfield", "Emma Stone", "Curt Conners"],
      "10/15/2022",
      "2h 16min"
    )
    console.log(movie3);
  }catch(e) {
    console.log(e);
  }

  //6. Log the newly created 3rd movie. (Just that movie, not all movies)
  try{
    moviethree= await movies.getMovieById(movie3._id)
    console.log(moviethree);
  }catch(e) {
    console.log(e);
  }

  //7. Rename the first movie
  try{
    console.log(
    await movies.renameMovie(movie1._id, "HackSaw Ridge New")
    );
  }catch(e){
    console.log(e);
  }

  //8. Log the first movie with the updated name
  try{
  const moviebyID = await movies.getMovieById(movie1._id);
  console.log(moviebyID);
  }catch(e){
    console.log(e);
  }


  //9. Remove the second movie you created.
  try{
    console.log(await movies.removeMovie(movie2._id));
  }catch(e) {
    console.log(e);
  }


  // //10. Query all movies, and log them all
  try{
    console.log(await movies.getAllMovies());
  }catch(e) {
      console.log(e);
  }

  //11. Try to create a movie with bad input parameters to make sure it throws errors.
  try{
    console.log(
      await movies.createMovie(
        "The Dark Knight",
        "Fight Between Batman and Joker",
        ["SuperHero", "Drama", "Sci-Fi"],
        "PG-13",
        "Warner Bros",
        "Christopher Nolan",
        ["Chritian Bale", "Heath Ledger", "Michael Caine", "Morgan Freeman"],
        "09/31/1995",
        "2h 16min"
      )
    );
  }catch(e) {
      console.log(e);
  }

  //12. Try to remove a movie that does not exist to make sure it throws errors.
  try{
    console.log(await movies.removeMovie("63461c2ea631c64cc79c458e"));
  }catch(e) {
    console.log(e);
  }

  //13. Try to rename a movie that does not exist to make sure it throws errors.
  try {
    console.log(await movies.renameMovie("633e3d0c2c81ca2ad93365db","The Hangover"));
  }catch(e) {
    console.log(e);
  }


  //14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
  try{
    console.log(
    await movies.renameMovie("633e3d0c2c81ca2ad93365de", "The amazing    ")
    );
  }catch(e){
    console.log(e);
  }
  
  //15. Try getting a movie by ID that does not exist to make sure it throws errors.
  try{
    console.log(await movies.getMovieById("633e3d0c2c81ca2ad93365de"));
  }catch(e){
    console.log(e);
  }

  await connection.closeConnection();
}

main();