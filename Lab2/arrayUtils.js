/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function isArray(array){
  if (!(Array.isArray(array))){
    throw 'Given input is not an Array, Please Enter an Array!'
  }
}

function isEmptyArray(array){
  if (array.length===0){
    throw 'Array is Empty';
  }
}

let arrayStats = (array) => {
  //input validations here
  isArray(array);
  isEmptyArray(array);
  array.forEach(element => {
    if (!(typeof(element)==='number') || isNaN(element)){
      throw 'All elements are not numbers';
    }
  });

  //finding desired values
  let mean=0, median=0, range=0, minimum=0, maximum=0, count=0, sum=0;
  array.sort((a, b) => a - b)
  array.forEach(element => {
    sum=sum+element;
  });
  count=array.length;
  minimum=array[0];
  maximum=array[count-1];
  range= maximum-minimum;
  mean=sum/count;

  let midNumber = Math.floor(count/2);
  median= count%2 !== 0?(array[midNumber]):((array[midNumber - 1] + array[midNumber]) / 2);

  var modeObj = {};
  array.forEach( num => {
    if(!modeObj[num]) modeObj[num] = 0;
    modeObj[num]++;
  });

  var maxFreq = 0;
  var mode = [];
  var modes=[]
  for(var num in modeObj) {
    if(modeObj[num] > maxFreq) {
      modes = [num];
      maxFreq = modeObj[num];
    }
    else if(modeObj[num] === maxFreq){
      modes.push(num);
    }
  }

  if(modes.length === Object.keys(modeObj).length){
    modes = [];
  } 
  if(modes.length===0){
    mode=0
  }
  else{
    mode=modes
  }
  for(let i=0;i<mode.length;i++){
    if(!isNaN(mode[i])){
      mode[i]=parseInt(mode[i]);
    }
  }
  if(modes.length===1){
    mode=modes[0];
  }

  let resultObject={

      "mean": mean,
      "median": median,
      "mode": mode,
      "range": range,
      "minimum": minimum,
      "maximum": maximum,
      "count": count,
      "sum": sum
    }
    return resultObject;
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays.length===0){
    throw 'Zero Arguments'
  }
  for (let i=0;i<arrays.length;i++){
    if (!(Array.isArray(arrays[i]))){
      throw 'input value is not array';
    }
    if (arrays[i].length!=2 || arrays[i].length===0){
      throw 'array length is not 2/ Array is empty';
    }
  }
  let resultObject={}
  for (let i=0;i<arrays.length;i++){
    resultObject[arrays[i][0]]=arrays[i][1];       
  }
  
  return resultObject;
};


let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays.length===0){
    throw 'Zero Arguments'
  }
  for (let i=0;i<arrays.length;i++){
    if(typeof(arrays)==='undefined'){
      throw 'Enter some inputs';
    }
    if (!(Array.isArray(arrays[i]))){
      throw 'input value is not array';
    }
    if (arrays.length<2){
      throw 'pass atleast 2 arrays';
    }
  }
  let mergedArrays=[]
    for(let i=0;i<arrays.length;i++){
      for(let j=0;j<arrays[i].length;j++){
        mergedArrays.push(arrays[i][j]);
      }
    }
  let count={}
   for(let i=0;i<mergedArrays.length;i++){
      if(count[mergedArrays[i]]){
        count[mergedArrays[i]] +=1;
      }
      else{
        count[mergedArrays[i]]=1;
      }
    }
    let resultArray=[];
    for (const [key, value] of Object.entries(count)) {
        if (value===arrays.length){
          resultArray.push(key);
        }
    }
    //console.log(resultArray);

    for(let i=0;i<resultArray.length;i++){
      if(!isNaN(resultArray[i])){
        resultArray[i]=parseInt(resultArray[i]);
      }
      if(resultArray[i]==='undefined'){
        resultArray[i]=undefined
      }
      if(resultArray[i]==='null'){
        resultArray[i]=null
      }
      if(typeof(resultArray[i])==='string'){
          if(resultArray[i].indexOf(',')>-1){
              resultArray[i]=resultArray[i].split(",")
          }
      }
    }
    return resultArray;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
};
