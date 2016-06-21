(function(){
	angular.module('app.controllers')
	.controller('loginController',['$location','loginFactory','$window','$scope','welcomeFactory',
		function($location,loginFactory,$window,$scope,welcomeFactory){
		$scope.fieldWrong = false;
		$scope.startSession = function(data){
			loginFactory.sessionIn(data).success(function(response){
				if (response != ""){
					$location.path('page/main');
				}else{
					$scope.fieldWrong = true;
				}
			});
		}
	}])
})();