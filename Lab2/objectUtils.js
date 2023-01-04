/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let deepEquality = (obj1, obj2) => {    
      
      if(!(typeof(obj1)==='object' || !(typeof(obj2)==='object') || typeof(obj1)===null || typeof(obj2)===null) ||
                  Array.isArray(obj1) || Array.isArray(obj2)){
            throw 'Give objects as inputs';
      }
      if(obj1 === null && obj1 === null ){
            throw 'Objects are NULL';
      }
      const isObject = (object) => {
            return object != null && typeof object === "object";
          };
      let keysOfObject1 = Object.keys(obj1);
      let keysOfObject2 = Object.keys(obj2);
      if (keysOfObject1.length != keysOfObject2.length){ 
            return false;
      }
      for (let key of keysOfObject1) {
            const value1 = obj1[key];
            const value2 = obj2[key];
            const isObjects = isObject(value1) && isObject(value2);

            if ((isObjects && !deepEquality(value1, value2)) || (!isObjects && value1 !== value2)) {
                  return false;
            }
      }
      return true;
};

let commonKeysValues = (obj1, obj2) => {

      if(!(typeof(obj1)==='object') || !(typeof(obj2)==='object' || typeof(obj1)===null || typeof(obj2)===null) ||
                  Array.isArray(obj1) || Array.isArray(obj2)){
            throw 'Give objects as inputs';
      }
      const isObject = (object) => {
            return object != null && typeof object === "object";
          };

      let tempObject={}, finalObject={};
      let keysOfObject1 = Object.keys(obj1);

      for (let key of keysOfObject1) {
            const value1 = obj1[key];
            const value2 = obj2[key];
            if(typeof(value1)=='undefined'|| typeof(value2)=='undefined'){
                  continue;
            }
            const isObjects = isObject(value1) && isObject(value2);
            if ((isObjects && !commonKeysValues(value1, value2)) || (!isObjects && value1 !== value2)) {
                  return tempObject;
            }
            tempObject[key]= value1; 
            finalObject[key]=value1;     
      }
      
      function checkifDoubleNestedObject(finalObject){
            for (const [key, value] of Object.entries(finalObject)){
                  if(typeof(value)==='object'){
                        for (const [key1, value1] of Object.entries(value)) {
                           finalObject[key1]=value1; 
                        }
                  } 
            }
      }


      for (const [key, value] of Object.entries(tempObject)) {
            if(typeof(value)==='object'){
                  for (const [key1, value1] of Object.entries(value)) {
                     finalObject[key1]=value1;
                     checkifDoubleNestedObject(finalObject);                  
            }
          }
      }
      return finalObject;   
};

let calculateObject = (object, func) => {
      if(object===null || JSON.stringify(object) === '{}' || !(typeof(object)==='object' )
                                          || object instanceof Array || typeof(object) === "undefined"){
            throw 'Not an Object/ Empty Object';
      }
      if(func===null || !(func instanceof Function)){
            throw 'Not a Function';
      }
      let tempArray=[];
      let resultObject={};
      for (var key in object){
            if (isNaN(object[key]) || !(typeof(object[key])==='number')){
               throw 'All values enter inside object are not numbers';
            }
            if(object.hasOwnProperty(key)){
                 let sqrtValue=Math.sqrt(func(object[key]));
                 tempArray.push(parseFloat(sqrtValue.toFixed(2)));
            }
            for(let i=0;i<tempArray.length;i++){
                  resultObject[key]=tempArray[i];
            }
      }
      return resultObject;
};

module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject
    };


    //omon keys prints->check in obj2 store in array->length check and for loop,