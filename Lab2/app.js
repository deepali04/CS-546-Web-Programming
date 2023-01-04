/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const arrayUtils = require('./arrayUtils');
const stringUtils= require('./stringUtils');
const objectUtils= require('./objectUtils');

//1. Calling arryUtils functions : arrayStats
//should Pass
// try{
//     // console.log(arrayUtils.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20]));
//     //console.log(arrayUtils.arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
//     // console.log(arrayUtils.arrayStats([1,5,5]));
//     //console.log(arrayUtils.arrayStats([0]));
//     //console.log(arrayUtils.arrayStats([7, 9, 11, 15, 19, 20, 35, 0]));
//     //console.log(arrayUtils.arrayStats([11, 5, 54, 11]));
// }catch(e){
//     console.log(e);
// }

//Should Throw Error
// try{
//     console.log(arrayUtils.arrayStats([NaN]));
//     // console.log(arrayUtils.arrayStats([]));
//     // console.log(arrayUtils.arrayStats());
//     // console.log(arrayUtils.arrayStats(''));
//     // console.log(arrayUtils.arrayStats([undefined]));
//     // console.log(arrayUtils.arrayStats([null]));
// }catch(e){
//     console.log(e);
// }

//2. Calling arryUtils functions : makeObjects

//Should Pass
 
// try{
//     //  //console.log(arrayUtils.makeObjects(["foo", "bar"], [5, "John"]));
//     //  console.log(arrayUtils.makeObjects(["foo", "bar"], ["name", "Patrick Hill"], ["foo", "not bar"]));
//     // // console.log(arrayUtils.makeObjects(["foo", "bar"], ["name", "Patrick Hill"], ["foo", "not bar"], ["class", "CS-546"], ["name", "John Smith"], ["foo", "not bar and not \'not bar\'"]));
//     // console.log(arrayUtils.makeObjects([true, undefined], [null, null]));
//     // console.log(arrayUtils.makeObjects([undefined, true], ["date", "9/11/2022"]));
//     console.log(arrayUtils.makeObjects([4, 1, 2], [1,2]));
//     console.log(arrayUtils.makeObjects([undefined, true], ["date", "9/11/2022"]));
//     console.log(arrayUtils.makeObjects([undefined, true], ["date", "9/11/2022"]));
// }catch(e){
//     console.log(e);
// }

// Should Throw Error
// try{
//     //console.log(arrayUtils.makeObjects());
//     //console.log(arrayUtils.makeObjects(["guitar", 1, 3, "apple"]));
//     //console.log(arrayUtils.makeObjects("banana"));
//     console.log(arrayUtils.makeObjects([]));
    
// }catch(e){
//     console.log(e);
//}


//3. Calling arryUtils functions : commonElements
 try{

    const arr1 = [5, 7]; 
    const arr2 = [20, 5]; 
    const arr3 = [true, 5, 'Patrick']; 
    const arr4 = ["CS-546", 'Patrick']; 
    const arr5 = [67.7, 'Patrick', true]; 
    const arr6 = [true, 5, 'Patrick']; 
    const arr7 = [null, undefined, 5, 'Patrick']; 
    const arr8 = [null, undefined, true];
    const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
    const arr10= [["foo", "bar"], true, "String", 10]

    //console.log(arrayUtils.commonElements([1,2,3], [], [1,3,4]));
    //console.log(arrayUtils.commonElements(arr5, arr6));
    //console.log(arrayUtils.commonElements(arr7, arr8));
    //console.log(arrayUtils.commonElements(({name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, age: 46, hello: NaN}, {school: "Stevens", name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, hello:NaN}));
    //console.log(arrayUtils.commonElements(arr1));
}catch(e){
    console.log(e);
}


//4. Calling stringUtils functions : palindromes

//Should Pass
// try{
//     //console.log(stringUtils.palindromes('!Wow! Did you see that racecar go?'));
//     // console.log(stringUtils.palindromes('Nan'));
//     //console.log(stringUtils.palindromes('hh'));
//     console.log(stringUtils.palindromes("hello    @aa@"));
//     //console.log(stringUtils.palindromes('h        !!!!'));
// }catch(e){
//     console.log(e);
// }

//Should Throw Error
// try{
     //console.log(stringUtils.palindromes("The racecar went to a big track. 'Wow!' i, said. zzbbzz?"));
//     // console.log(stringUtils.palindromes([]));
//     console.log(stringUtils.palindromes('!Wow! Did you see that racecar go?'));
//     // console.log(stringUtils.palindromes('Nan'));
//     console.log(stringUtils.palindromes(["hello there"]));
// }catch(e){
//     console.log(e);
// }

//5. Calling stringUtils functions : replaceChar

//Should pass
// try{
    //console.log(stringUtils.replaceChar('H   '));
//     console.log(stringUtils.replaceChar("1234567890"));
//     console.log(stringUtils.replaceChar(" Momm y "))
//     //console.log(stringUtils.replaceChar({}));
//     //console.log(stringUtils.replaceChar(""));
// }catch(e){
//     console.log(e);
// }

//Should Throw Error
try{

    // console.log(stringUtils.replaceChar({}));
    // console.log(stringUtils.replaceChar(""));
}catch(e){
    console.log(e);
}


//6. Calling stringUtils functions : charSwap
//Should Pass
try{
    
    // console.log(stringUtils.charSwap("Patrick", "Hill"));
    // console.log(stringUtils.charSwap("hello", "world"));
    // console.log(stringUtils.charSwap("      hello", "world"));
}catch(e){
    console.log(e);
}

//should Throw Error
try{
    //console.log(stringUtils.charSwap());
    //console.log(stringUtils.charSwap(null, "Hill"));
    //console.log(stringUtils.charSwap(1234, "Hill"));
    //console.log(stringUtils.charSwap("h", "Hello"));
    //console.log(stringUtils.charSwap("John")); // Throws error)
    //console.log(stringUtils.charSwap(undefined,undefined));
}catch(e){
    console.log(e);
}


//7. Calling objectUtils functions : deepEquality

//Should Pass

     try{
        const first = {a: 2, b: 3};
        const second = {a: 2, b: 3};
        const forth = {a: {sA: ['v',"q"], sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
        const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: {v:"p"}}}; 
        const six = {a: 2, b: {c: true, d: false}};
        const seven ={b: {c: true, d: false}, foo: "bar"};

    console.log(objectUtils.deepEquality({b:2, a:2, c:{d:[1,2,3]}}, {a:2, c:{d:[3,2,1]}, b:2}));
    //console.log(objectUtils.deepEquality(forth, fifth));

    //     //console.log(objectUtils.deepEquality("hello", "world"));
    }catch(e){
         console.log(e);
     }

//Should Throw Error

try{
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}; 
    const six = {a: 2, b: {c: true, d: false}};
    const seven ={b: {c: true, d: false}, foo: "bar"};

    console.log(objectUtils.deepEquality({a: 1, b:2, c:{1: [1,2,3,[1,2,3,{a:a, b:b}]]}},{a: 1, b:2, c:{1: [1,2,3,[1,2,3,{a:a, b:b}]]}}));
    //console.log(objectUtils.deepEquality(NaN, NaN));
    //console.log(objectUtils.deepEquality([1,2,3], [1,2,3]));
    // console.log(objectUtils.deepEquality("hello", "world"));
}catch(e){
     console.log(e);
 }

//8. Calling objectUtils functions : commonKeysValues
const first = {name: {first: "Patrick", last: "Hill"}, age: 46};
const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
const third = {a: 2, b: {c: true, d: false}};
const forth = {b: {c: true, d: false}, foo: "bar"};

//Should Pass
try{

    //console.log(objectUtils.commonKeysValues({name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, age: 46, hello: NaN}, {school: "Stevens", name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, hello:NaN}));
    //console.log(objectUtils.commonKeysValues(third, forth));
    //console.log(objectUtils.commonKeysValues({name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, age: 46, hello: NaN}, {school: "Stevens", name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, hello:NaN}));
    //console.log(objectUtils.commonKeysValues({name: {first: "Patrick", last: {a:2,b:3}}}, {name: {first: "Patrick", last: {a:2,b:3}}}));
    
}catch(e){
    console.log(e);
}

//Should Throw Error
try{
    //console.log(objectUtils.commonKeysValues([],{}));
    //console.log(objectUtils.commonKeysValues());
    //console.log(objectUtils.commonKeysValues("foo", "bar"));

}catch(e){
    console.log(e);
}

//9. Calling objectUtils functions : calculateObject


//Should Pass
try{
    //negative numbers sqrt have to check ?
    //console.log(objectUtils.calculateObject({a:16,b:4}, n => Math.sqrt(n)));
    //console.log(objectUtils.calculateObject({a: 9, b: 'deepali'}, n => n + 2));
    //console.log(objectUtils.calculateObject({a: -9, b: -2}, n => n * 2)); //have to check with TA
    
}catch(e){
    console.log(e);
}

//Should Throw Error

try{
    //negative numbers ka sqrt check karna hai
    //console.log(objectUtils.calculateObject([], n => n * 8));
    // console.log(objectUtils.calculateObject({}, n => n + 2));
   // console.log(objectUtils.calculateObject({a: 0},n=>1/n));

}catch(e){
    console.log(e);
}

