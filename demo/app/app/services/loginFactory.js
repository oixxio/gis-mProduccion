angular.module('app.services')
.factory('loginFactory', ['$http', function($http){ 
    var user ={},
        session = 0;

	user.sessionLogged = function(data){		
		return  session;       
    	};
    user.sessionIn = function(data){
    return	$http.post('app/api/login/iniciarSesion.php',data); 
    };	
    user.getCount = function(){
    	return count;
    };
    user.sessionClose = function(){
    return  $http.get('app/api/login/cerrarSesion.php'); 
    };  
	return user;
}]);
$(document).ready()