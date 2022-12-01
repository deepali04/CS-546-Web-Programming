function questionOne(arr) {
  // TODO: Implement question 1 here
  //declaring empty array to store result
  let result_array = [];

  //Separate function to calculate prime number 
  function isElementPrime(element){
    if (!(typeof(element) === 'number'))
      return false;
    if(element===2){
      return true;
    }
    if(element<2 || element%2===0){
      return false;
    }
    for(let i=3; i*i<=element; i+=2){
      if(element%i===0){
        return false;
      }
    }
    return true;
  }

  //Checking each element of array for prime number
  arr.forEach(function(element) {
    const result = isElementPrime(element);
      result_array.push(result);
  });
return result_array;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here
  if(startingNumber===0 || commonRatio===0){
    return 0;
  }
  if (numberOfTerms<=0 || numberOfTerms != Math.floor(numberOfTerms)){
    return NaN;
  }

  //calculating sum of Geometric series
  let sumOfGS=0
  sumOfGS= startingNumber*((1-(Math.pow(commonRatio,numberOfTerms)))/(1-commonRatio));
  return sumOfGS;
}

function questionThree(str) {
  // TODO: Implement question 3 here
  str=str.trim();
  str=str.toLowerCase();
  let consonantCount=0;

  //check if character is consonant
  function isCharacterConsonant(character){
    return (!(character=="a" ||
              character=="e" ||
              character=="i" ||
              character=="o" ||
              character=="u") && (character.match(/[a-z]/i)));
  }

  for (let i=0; i<str.length; i++){
    if (isCharacterConsonant(str[i]))
      consonantCount++;
  }
  return consonantCount; 
}

function questionFour(fullString, substring) {
  // TODO: Implement question 4 here

  let regularExpression = new RegExp(substring,"gi");
  let countFrequency =0;
  countFrequency = fullString.split(substring).length - 1;
  return countFrequency;
}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'Deepali',
  lastName: 'Nagwade',
  studentId: '20013393',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};

