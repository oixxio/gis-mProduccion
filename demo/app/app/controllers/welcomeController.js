(function(){
	angular.module('app.controllers')
	.controller('welcomeController',['$location','welcomeFactory','$window','$scope','$http',
		function($location,welcomeFactory,$window,$scope,$http){
			/*welcomeFactory.sessionOpen().success(function(response){
				if(response == ''){
					$location.path('page/signin');
				}else{
					$location.path('page/main');
				}
			})*/
			$scope.to = function(data){
				$location.path('page/'+data);
			}
			$scope.goBack = function () {
				 $window.history.back();
			}
	}])
})();

