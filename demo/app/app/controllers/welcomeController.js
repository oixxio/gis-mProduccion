(function(){
	angular.module('app.controllers')
	.controller('welcomeController',['$location','welcomeFactory','$window','$scope','$http','$cacheFactory',
		function($location,welcomeFactory,$window,$scope,$http,$cacheFactory){
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
		$scope.goTo = function(data){
			$location.path('page/'+data);
		}
					
			$scope.cache = $cacheFactory('cache',{capacity: 100});
			$scope.goBack = function () {
				 $window.history.back();
			}
			//Funcion que controla el radio de los circulos de los charts de dispersion (scatter)
			$scope.scaleRadius = function (value) {
				//scatterRadius determina el parametro basepara escalar el radio de los puntos del scatter
				var scatterRadius = 4.5;
				if (value < 1) { return scatterRadius*1}
				else if (value < 5) { return scatterRadius*2 }
				else if (value < 10) { return scatterRadius*3 }
				else if (value < 20) { return scatterRadius*4 }
				else if (value < 30) { return scatterRadius*5 }
				else if (value < 50) { return scatterRadius*6 }
				else if (value < 75) { return scatterRadius*7 }
				else { return scatterRadius*8 };	
			}
			
	}])
})();

