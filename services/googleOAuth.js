var Firebase = require("firebase");
var ref = new Firebase("https://brooksnodepractice.firebaseio.com");
var authData = ref.getAuth();
var USERS_LOCATION = 'https://brooksnodepractice.firebaseio.com/users';

exports.testService = function(body,next){
    var response = 'hello';
    return next(response);
};

exports.googleOAuthService = function (POSTdata,next) {
    //Searches firebase for UserId
    var usersRef = new Firebase(USERS_LOCATION);
    var redirectUrl = ("users/" + POSTdata.uid);
    usersRef.child(POSTdata.uid).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);

    // if the user exists already in firebase, the user is 
    // redirected to his profile
            if (exists === true){
                next(redirectUrl);
            
    // if the user is not already in firebase, the application
    // will attempt to create a new user with tryCreateNewUser
                
            } else {
                tryCreateNewUser(usersRef,POSTdata.uid, POSTdata, function(){next(redirectUrl)});
                console.log(exists);
            }
    }, function(err){console.log(err)});
};

    //Creates a new user
function tryCreateNewUser (ref,uidKey, userData, next) {
    
    // on completion or failure of setting the new
    // user data, an error is thrown, or the save
    // is successful and the client is then redirected
    // to the new user landing page
    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
    // returns the uidkey for redirection to try create new user
            next(uidKey);
        }
    };
    // sets the userData in /users/ in firebase using
    // the users uid as the key
    ref.child(uidKey).set(userData, onComplete);
}
