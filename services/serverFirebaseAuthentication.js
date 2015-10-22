/*
* This service continously authorizes the server as an admin to 
* enabling it to write to the database. This service is run on startup
* TODO: need to manage diruptions in connection. 
*/

exports.authenticateMe = function (){
    var Firebase = require("firebase");
    var FirebaseTokenGenerator = require("firebase-token-generator");
    var tokenGenerator = new FirebaseTokenGenerator("aYIxjQx6ZAeTQBtKmdS3z6GkOPZJ8hN3LMUblp15");
    var token = tokenGenerator.createToken(
       {uid: "my-awesome-server"}, 
       { expires: 1476559239,
         admin:true,
         debug: true
       }
    );

    var ref = new Firebase("https://brooksnodepractice.firebaseio.com");
    ref.authWithCustomToken(token, function(error, authData) {
      error ? console.log(error)
      : console.log('firebase has authenticated this client');
    })
};


