//var User = require('../models/user').User;
var Firebase = require("firebase");
var ref = new Firebase("https://brooksnodepractice.firebaseio.com");
var USERS_LOCATION = 'https://brooksnodepractice.firebaseio.com/users';

exports.getUserProfile = function(userId, next){
    var usersRef = new Firebase(USERS_LOCATION);
    usersRef.child(userId).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        var userData = snapshot.val();
            if (exists){
            return next(exists, userData);
      } else {
            console.log('this user does not exist, something is wrong');
      } 
  },function(err){ 
        console.log(err);
  });
};