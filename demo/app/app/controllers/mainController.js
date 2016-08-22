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
			if($location.path() == '/page/fichas' || $location.path() == '/page/timeLapseEmpleo'){
				return true
			}
			else {
				return false
			}				
		}
		$scope.location2 = function () {
			if($location.path() == '/page/main' || $location.path() == '/page/mapa' || $location.path() == '/page/sector' || $location.path() == '/page/sector2' || $location.path() == '/page/dashboard' || $location.path() == '/page/dashSector' || $location.path() == '/page/empleoProvGrande' || $location.path() == '/page/scatterEmpProvGrande'|| $location.path() == '/page/exportProvGrande'|| $location.path() == '/page/scatterExpProvGrande'|| $location.path() == '/page/empleoSectGrande'|| $location.path() == '/page/exportSectGrande'|| $location.path() == '/page/scatterEmpSectGrande'|| $location.path() == '/page/scatterExpSectGrande' || $location.path() == '/page/timeLapseEmpleo'){
				return true
			}
			else {
				return false
			}
		}

		$scope.location3 = function () {
			if($location.path() == '/page/timeLapseEmpleo'){
				return true
			}
			else {
				return false
			}
		}

		$scope.setTitulo = function () {	
			if ($location.path() == '/page/fichas') {
				$scope.titulo = 'Fichas Provinciales';
			}if($location.path() == '/page/main'){
				$scope.titulo = 'Mapa Productivo Federal';
			}
		}
		$scope.sendMail = function (mail) {
				 $http.post('https://formspree.io/gpsproduc@gmail.com',mail).success(function () {
				 	 $window.alert("Muchas gracias por tu opinion, tu mensaje a sido enviado")
				 })

		}
	}])
})();


(function(){
	angular.module('app.controllers')
	.controller('ModalDemoCtrl',['$rootScope','$location','$scope', '$uibModal', '$log', ModalDemoCtrl])

    function ModalDemoCtrl($rootScope,$location,$scope, $uibModal, $log) {
        $scope.items = ['item1', 'item2', 'item3'];


        var modalInstance = {};

        $scope.animationsEnabled = true;



        $scope.open = function (size) {
            $rootScope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalDemoCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            // $scope.modalInstance.result.then(function (selectedItem) {
            //     $scope.selected = selectedItem;
            // }, function () {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });
        };

		$scope.to2= function(data){
			$rootScope.modalInstance.dismiss('cancel');
			$location.path('page/'+data);
		}        
        
        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }

})();