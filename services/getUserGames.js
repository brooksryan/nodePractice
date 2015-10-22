var Firebase = require("firebase");
var Ref = new Firebase("rubbermatch.firebaseIO.com/");
var GAMES_LOCATION = "rubbermatch.firebaseIO.com/games";
var gamesRef = new Firebase(GAMES_LOCATION);

//Get Information from firebase Reusable function
var forEach = function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val());
    });
}
//get specific child data from a ref based on a 
// particular child value

var getUserGames = function (ref,childToOrganizeBy,ChildValue,next) {
    ref.orderByChild(childToOrganizeBy).equalTo(ChildValue).once('value',next);
};

getUserGames(gamesRef,'completed',false,forEach);


