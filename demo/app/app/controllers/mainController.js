(function(){
	angular.module('app.controllers')
	.controller('mainController',['$location','loginFactory','$window','$scope','welcomeFactory','$http',
		function($location,loginFactory,$window,$scope,welcomeFactory,$http){
		//codigo para que si no esta logeado no pueda acceder
		/*welcomeFactory.sessionOpen().success(function(response){
				if(response == ''){
					$location.path('page/signin');
				}else{
					$location.path('page/main');
				}
		})
		/*****************************************************/
		$scope.to = function(data){
			$location.path('page/'+data);
		}
		$scope.goTo = function(data){
			$location.path('page/'+data);
		}
		$scope.cerrarSesion = function(){
			loginFactory.sessionClose().success(function(response){
				$location.path('page/signin');
			});
		}
		$scope.location = function () {
			if($location.path() == '/page/landing' || $location.path() == '/page/nodisponible'){
				return true
			}
		}
		$scope.location1 = function () {
			if($location.path() == '/page/fichas'){
				return true
			}
		}
		$scope.location2 = function () {
			if($location.path() == '/page/main' || $location.path() == '/page/mapa' || $location.path() == '/page/sector' || $location.path() == '/page/sector2' || $location.path() == '/page/dashboard' || $location.path() == '/page/dashSector' || $location.path() == '/page/empleoProvGrande' || $location.path() == '/page/scatterEmpProvGrande'|| $location.path() == '/page/exportProvGrande'|| $location.path() == '/page/scatterExpProvGrande'|| $location.path() == '/page/empleoSectGrande'|| $location.path() == '/page/exportSectGrande'|| $location.path() == '/page/scatterEmpSectGrande'|| $location.path() == '/page/scatterExpSectGrande'){
				return true
			}
		}
		$scope.setTitulo = function () {
			if ($location.path() == '/page/fichas') {
				$scope.titulo = 'Fichas Provinciales'
				$scope.$apply()
			}else{
				$scope.titulo = 'Mapa Productivo Federal'
				
			}
		}
		$scope.sendMail = function (mail) {
				 $http.post('https://formspree.io/gpsproduc@gmail.com',mail).success(function () {
				 	 $window.alert("Muchas gracias por tu opinion, tu mensaje a sido enviado")
				 })

			}
		
	}])
})();
