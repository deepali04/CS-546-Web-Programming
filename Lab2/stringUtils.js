/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let palindromes = (string) => {
      
      if(!(typeof(string)==='string')){
            throw 'This is not a String, Please Enter a String';
      }
      if(!((string.trim().length)>0)){
            throw 'Length of String should be Greater than 0';
      }
      //Function to check if the word is Palindrome
      function isPalindrome(string){
            let characterArray= string.split('');
            let reverseCharacterArray= characterArray.reverse();
            let reversedWord=reverseCharacterArray.join('');
            if (string.toLowerCase() === reversedWord.toLowerCase()){
                  return true;
            }
            return false;
      }
      
      let resultArray=[]; 
      string=string.trim();
      //console.log(string.length);
      const wordsArray=string.split(" ");
      wordsArray.forEach(word => {
            word=word.replace(/[^a-zA-Z]/g, '');
            if(word.length==1){
                  return resultArray;
            }
            if(isPalindrome(word)){
                  if (!(word===''))
                  resultArray.push(word);
            }
      });      
      return resultArray;
};

let replaceChar = (string) => {

      if(!(typeof(string)==='string')){
            throw 'This is not a String, Please Enter a String';
      }
      if(string.trim().length===0){
            throw 'Length of String should be Greater than 0';
      }
      string= string.trim();
      let stringArray=string.split("");
      stringArray[1]='*';   
      
      //console.log(stringArray.length);
      
      for(let i=3;i<stringArray.length;i++){
            if(i%2!=0){
                  if(stringArray[i-2]=='*'){
                        stringArray[i]='$';
                  }  
                  else{
                        stringArray[i]='*';
                  }
            }
      }
      return stringArray.join('');
};

let charSwap = (string1, string2) => {
      if((typeof(string1)!='string' || typeof(string2)!='string' || string1 == null || string2 == null)){
            throw 'Not a string, Please Enter a string';
      }     
      if(!((string1.trim().length)>=4) || !((string2.trim().length)>=4)) {
            throw 'Enter different string, this is too short';
      }
      let finalString='';
      string1=string1.trim();
      string2=string2.trim();
      string1Length=string1.length;
      string2Length= string2.length;
      finalString= string2.slice(0,4)+ string1.slice(4,string1Length) + ' ' + string1.slice(0,4)+ string2.slice(4,string2Length);
      return finalString;
};

module.exports = {
      palindromes,
      replaceChar,
      charSwap
    };
