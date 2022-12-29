//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

function titleErrorChecking(title){
  if(!title) throw 'Provide a title';
  if(!(typeof(title)==='string')) throw 'Title should be a string';
  title=title.trim();
  if(title.length===0) throw 'Title can not be empty or just spaces';
  if(title.length<2) throw 'Title is too short, should be atleast 2 characters.';
  var regEx = /^[0-9a-zA-Z ]+$/;
  if(!(title.match(regEx))) throw 'Verify Title, it should not contain any special characters.';
}

function plotErrorChecking(plot){
  if(!plot) throw 'Provide a Plot';
  if(!(typeof(plot)==='string')) throw 'Plot should be a string';
  plot=plot.trim();
  if(plot.length===0) throw 'Plot can not be empty or just spaces';
}

function studioErrorChecking(studio){
  if(!studio) throw 'Provide a Studio';
  if(!(typeof(studio)==='string')) throw 'Studio should be a string';
  studio=studio.trim();
  if(studio.length===0) throw 'Studio can not be empty or just spaces'; 
  if(studio.length<5)   throw 'Studio Name is too short, should be atleast 5 characters long';
  var regEx = /^[a-zA-Z ]+$/;
  if(!(studio.match(regEx))) throw 'Verify Studio, it should contain only alphabetic characters';
}

function directorErrorChecking(director){
  if(!director) throw 'Provide a Director';
  if(!(typeof(director)==='string')) throw 'Director should be a string';
  director=director.trim();
  if(director.length===0) throw 'Director can not be empty or just spaces'; 
  let directorArray=director.split(" ");
  if (!(directorArray.length===2)) throw 'Provide only first and last name of director';
  directorArray.forEach(element => {
    if(element.length<3) throw 'First name or Last name of director should be atleast 3 character long';
    var regEx = /^[a-zA-Z ]+$/;
    if(!(element.match(regEx))) throw 'Verify Director Name, it should contain only alphabetic characters';    
  });
}

function ratingErrorChecking(rating){
  if(!rating) throw 'Provide a Rating';
  if(!(typeof(rating)==='string')) throw 'Rating should be a string';
  rating=rating.trim();
  if(rating.length===0) throw 'Rating can not be empty or just spaces'; 
  if(!(rating==='G' || rating==='PG'|| rating==='PG-13'|| rating==='R'|| rating==='NC-17')){
      throw 'Not a valid value for Rating';
    }
}

function genresErrorChecking(genres){
  if(!genres) throw 'Provide Genres';
  if(!(Array.isArray(genres))) throw 'Genre should be an Array';
  if(genres.length===0) throw 'Genre can not be empty';
  genres.forEach(genre=>{
    if(!genre) throw 'Provide a value of genre';
    if(!(typeof(genre)==='string')) throw 'genre value should be a string';
    genre=genre.trim();
    if(genre.length===0) throw 'genre value can not be empty or just spaces';
    if(genre.length<5)   throw 'genre name must be atleast 5 characters';
    var regEx = /^[a-zA-Z ]+$/;
    if(!(genre.match(regEx))) throw 'Genre should contain only Alphabets';
  });
}

function castMembersErrorChecking(castMembers){
  if(!castMembers) throw 'Provide Cast Members';
  if(!(Array.isArray(castMembers))) throw 'Cast Members should be an Array'; 
  if(castMembers.length===0) throw 'Cast Members should not be empty'; 
  castMembers.forEach(castMember=>{
    if(!castMember) throw 'Provide name of cast member';
    if(!(typeof(castMember)==='string')) throw 'cast member name should be a string';
    castMember=castMember.trim();
    if(castMember.length===0) throw 'cast member name can not be empty or just spaces';
    let castMemberArray=castMember.split(" "); 
    if (!(castMemberArray.length===2)) throw 'Provide only first and last name of cast members in format fname space lname';
    castMemberArray.forEach(element => {
        var regEx = /^[a-zA-Z ]+$/;
        if(element.length<3) throw 'First name and Last name should be atleast 3 character long';
        if(!(element.match(regEx))) throw 'FirstName and LastName should contain only Alphabets';
    });
  });
}

function dateReleasedErrorChecking(dateReleased){
  if(!dateReleased) throw 'Provide a release date';
  if(!(typeof(dateReleased)==='string')) throw 'Release Date should be a string';
  dateReleased=dateReleased.trim();
  if(dateReleased.length===0) throw 'Release Date can not be empty or just spaces';
  if(dateReleased.length!==10) throw 'Provide Date in proper format';
  if(!(dateReleased.includes('/')) || (dateReleased.includes('-'))) throw 'Provide date in mm/dd/yyyy format';

  const releasedDate = new Date(dateReleased);
  // console.log(releasedDate);
  const date= formatDateReleased(releasedDate);
  // console.log(date);
  const oldestDate= new Date('01/01/1900');

  if(releasedDate < oldestDate || releasedDate.getFullYear()>new Date().getFullYear()+2)
    throw 'Date doesn not fall in a proper range (1990-2024)';

  if(date.trim().slice(0,2)!==dateReleased.trim().slice(0,2)){
    throw 'Date is not proper, enter valid date.';
  }

}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDateReleased(releasedDate){
  return [
    padTo2Digits(releasedDate.getMonth() + 1),
    padTo2Digits(releasedDate.getDate()),
    releasedDate.getFullYear(),
  ].join('/');
}

function runTimeErrorChecking(runtime){
  if(!runtime) throw 'Provide movie runtime';
  if(!(typeof(runtime)==='string')) throw 'run time should be a string';
  runtime=runtime.trim();
  if(runtime.length===0) throw 'Runtime can not be empty or just spaces';
  // var regex= /^(0[0-9]|1[0-9]|2[0-3])h [0-5][0-9]$min/;
  let runTimeArray=runtime.split(" ");
 // console.log(runTimeArray);
  let count=0;
  runTimeArray.forEach(element=>{
    if(element!==null){
      count++;
    }
  });
  if(count!==2){
    throw 'Runtime is not valid string';
  }
  if(runTimeArray[0].length!==2){
    if(runTimeArray[0].length!==3)
      throw 'Runtime hours is not valid';
  }
  if(runTimeArray[1].length!==5){
    if(runTimeArray[1].length!==4)
      throw 'Runtime minutes is not valid';
  }
  let hourValue= parseInt(runTimeArray[0].slice(0,runTimeArray[0].length));
  let minuteValue=parseInt(runTimeArray[1].slice(0,2));

  // console.log(typeof(hourValue));
  // console.log(typeof(minuteValue));
  // console.log(hourValue);
  // console.log(minuteValue);
  if(!(hourValue>0 && hourValue<99 && hourValue%1===0)){
    throw 'Not valid hours';
  }
  if(!(minuteValue>=0 && minuteValue<=59 && minuteValue%1===0)){
    throw 'not valid minutes';
  }
  if(runTimeArray[0].charAt(runTimeArray[0].length-1)!=='h' || runTimeArray[1].slice(runTimeArray[1].length-3)!=='min'){
    throw 'not valid format for runtime';
  }
}

module.exports = {
  titleErrorChecking,
  plotErrorChecking,
  studioErrorChecking,
  directorErrorChecking,
  ratingErrorChecking,
  genresErrorChecking,
  castMembersErrorChecking,
  dateReleasedErrorChecking,
  runTimeErrorChecking,
  formatDateReleased
};
