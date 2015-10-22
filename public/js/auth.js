//var Firebase = require("firebase");
var ref = new Firebase("https://brooksnodepractice.firebaseio.com");
var authData = ref.getAuth();
var USERS_LOCATION = 'https://brooksnodepractice.firebaseio.com/users';

/*
* Use Firebase's google OAuth serivce. If the service is successful
* the google OAuth payload is send back to the server through $.post
*/

var callbackFunction = function (status){
    console.log(status);
};

var newAjax =function (loginInfo) { 
    jQuery(function($){
        $.ajax({
            url: '/users/test',
            type: 'POST',
            dataType: 'json',
            data: loginInfo
            }).always(function(data){
                window.location.href = (data.responseText);
            }).fail (function(data)  { alert(data.param1)}); 
    });
};
    

jQuery(function($){
    $("#testTarget").click(function(){
        console.log('composing Ajax request');
        ref.authWithOAuthPopup("google", function(error, authData) { 
            if (error) { 
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully!", authData);
              //var jsonifyData = JSON.stringify(authData);
             newAjax(authData);
            }
        }); 
        
    });
});

if (authData) {
  console.log("User " + authData.uid + " is logged in with " + authData.provider);
} else {
  console.log("User is logged out");
}


//Creates a new user