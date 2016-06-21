angular.module('app.services')
.factory('searchFactory', ['$http', function($http){
	var db = {},
		promise = $http({method: 'POST',
						url: 'api/api.php',
						data: {
							userName: '',
							userPass: '',
							command: 'search',
							userNewPass: ''}
						}
					),
		dbData,
		allData = [];
	db.getData = function(){		
		return  promise;
	};
	db.setAllData = function(data){
		allData = data;
	}
	db.getStoredData = function(){
		return allData;
	};
	return db;
}]);