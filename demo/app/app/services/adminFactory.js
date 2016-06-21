angular.module('app.services')
.factory('adminFactory', ['$http', function($http){ 
    var admin ={},
        modalData = {};

	admin.setModalData = function(data){		
		modalData = data;
    };
    admin.getModalData = function(data){     
        return modalData;
    };
    admin.saveData = function(data){
    	return $http.post('app/api/dashboard/obtenerDatosProv.php',data);
    }
	return admin;
}]);