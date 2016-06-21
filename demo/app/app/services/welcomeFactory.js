angular.module('app.services')
.factory('welcomeFactory', ['$http', function($http){ 
    var user ={},
        session = 0;

	user.sessionLogged = function(){		
		return  session;       
    	};
    user.sessionOpen = function(data){
    return	$http.post('app/api/login/iniciarSesion.php',data); 
    };	
    user.getCount = function(){
    	return count;
    };
    user.setSession = function(data){
        session = data;
    }
	return user;
}]);