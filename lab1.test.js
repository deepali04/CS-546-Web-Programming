const lab1 = require('./lab1');

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

//Test-Cases for Question1
console.log(lab1.questionOne([4, 879, 492113])); 
console.log(lab1.questionOne([1, 79, "Deepali"]));
console.log(lab1.questionOne([5, -1, 1000231])); 
console.log(lab1.questionOne([2, 1, 0])); 
console.log(lab1.questionOne([4, ,17]));


// //Test-Cases for Question2
console.log(lab1.questionTwo(3, 11, 4)); //Returns and then outputs 2222
console.log(lab1.questionTwo(512, 1007, -5)); //Returns and then outputs NaN
console.log(lab1.questionTwo(-1, 12, 3));//Returns and then outputs -157 
console.log(lab1.questionTwo(3, 0, 2));//Returns and then outputs 0
console.log(lab1.questionTwo(0, 1, 4));//Returns and then outputs 0
//r=1 case have to check

//Test-Cases for Question3
console.log(lab1.questionThree("     Welcome to CS-546")); // Returns and then outputs 7 
console.log(lab1.questionThree("863826484724924802")); // Returns and then outputs 0
console.log(lab1.questionThree("Hey, This class is amazing!!!!")); // Returns and then outputs 14
console.log(lab1.questionThree("")); // Returns and then output 0
console.log(lab1.questionThree("DDDDDDDDD")); // Returns and then outputs 9


//Test-Cases for Question4
console.log(lab1.questionFour("Helllllllo, class!", "ll")); //Returns and then outputs 3 
console.log(lab1.questionFour("rrrrrrrrrrrr", "rr")); //Returns and then outputs 6
console.log(lab1.questionFour("", "ee")); //Returns and then outputs 0
console.log(lab1.questionFour("http:///www.google.com/javascript/", "/")); //Returns and then outputs 5
console.log(lab1.questionFour("God bless you", "o")); //Returns and then outputs 2