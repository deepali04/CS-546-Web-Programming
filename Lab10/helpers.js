//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
function validationFunction(username, password){
  if(!username || !password){
    throw {statusCode: 400, message: "Please provide a valid username or password!"};
  } 
  if(typeof username !== 'string' || typeof password !== 'string') {
    throw {statusCode: 400, message: 'Please provide string values for uname or password!'};
  }
  if(!username.trim().length || !password.trim().length ) {
    throw {statusCode: 400, message: 'Username or Password can not be empty or plain spaces!'};
  }

  var validateUserName=/^[a-zA-Z0-9]+$/i;
  var validatePassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;

  if(!validateUserName.test(username) || username.trim().length<4 ){
    throw {statusCode: 400, message: 'Username should be atleast 4 characters long and only consists of alphaneumeric characters!'};
  } 

  if(!validatePassword.test(password) || password.trim().length<6 ){
    throw {statusCode: 400, message: 'Password should be atleast 6 characters long and should follow contraints'};
  }

}

module.exports = {
  validationFunction
};