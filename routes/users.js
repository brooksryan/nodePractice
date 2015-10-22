var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
var USERS_LOCATION = 'https://brooksnodepractice.firebaseio.com/users';
var googleOAuth = require('../services/googleOAuth');
var getUserData = require('../services/getUserData');
var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET users view
router.get('/create', function(req, res, next) {
  var vm = {
      title: 'Create an account'
  };
  res.render('users/create', vm);
});

//POST new user data information 
router.post('/test', function(req, res, next) {
    googleOAuth.googleOAuthService(req.body, function(message){
            res.contentType('application/json');
            var data = (message);
            res.header('Content-Length', data.length);
            res.send(data)
            res.end();
            console.log(req.body);
    });
});

router.post('/:userId/newgame/:challengerId',function(req, res, next) {
    
},

router.get('/:userId', function(req, res, next) {
    var userId = req.params.userId;
    console.log(userId);
    getUserData.getUserProfile(userId,function(exists,userData){
        var vm = {
            name: userData.google.cachedUserProfile.name,
            profilePicture: userData.google.cachedUserProfile.picture
        };
        res.render('index',vm);   
    });
    //res.send(userId);
});

module.exports = router;
