(function(){
	angular.module('app.controllers')
	.controller('dashboardController',['$location','dashboardFactory','$window','$scope','welcomeFactory',
	function($location,dashboardFactory,$window,$scope,welcomeFactory){
		/*welcomeFactory.sessionOpen().success(function(response){
				if(response == ''){
					$location.path('page/signin');
				}else{
					$location.path('page/dashboard');
				}
		})*/

		var sector = {};
		var chartColor;
		//$scope.departamento =  dashboardFactory.getImg();
		dashboardFactory.getNombreProv(localStorage.getItem('provName')).success(function(response){
			$scope.provincia = response[0].nombre;
			//alert(response[0].nombre)
			var provMapa,latitud,longitud,zoom
			
			switch (response[0].nombre.replace(/[^a-zA-Z ]/g, "")) {
	        case "Buenos Aires":
	            provMapa = buenosAires;
	            latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  "Buenos_Aires"
	            //chartColor = '#34e3e5'
	             break;
	        case 'CABA':
	            provMapa = CABA;
	            latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 9
	            $scope.provLink =  'CABA'
	            //chartColor = '#b6a2de';
	             break;
	        case 'Catamarca':
	             provMapa = catamarca;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Catamarca'
	            //chartColor = '#5ab1ef';
	             break;
	        case 'Chaco':
	             provMapa = chaco;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Chaco'
	            //chartColor = '#ffb980';
	             break;
	        case 'Chubut':
	            provMapa = chubut;
	            latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Chubut'
	            //chartColor = '#f28c93';
	            break;
	        case 'Crdoba':
	             provMapa = cordoba;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Cordoba'
	            //chartColor = '#b6c2e1';
	             break;
	        case 'Corrientes':
	             provMapa = corrientes;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Corrientes'
	            //chartColor = '#e5cf0d';
	             break;
	        case 'Entre Ros':
	             provMapa = entreRios;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Entre_Rios'
	            //chartColor = '#b2d563';
	             break;
	        case 'Formosa':
	             provMapa = formosa;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Formosa'
	            //chartColor = '#2ec7c9';
	             break;
	        case 'Jujuy':
	             provMapa = jujuy;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Jujuy'
	            //chartColor = '#51a0d8';
	             break;
	        case 'La Pampa':
	             provMapa = laPampa;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'La_Pampa'
	            //chartColor = '#dda06f';
	             break;
	        case 'La Rioja':
	             provMapa = LaRioja;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'La_Rioja'
	            //chartColor = '#d87a80';
	             break;
	        case 'Mendoza':
	             provMapa = mendoza;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Mendoza'
	            //chartColor = '#8d98b3';
	             break;
	        case 'Misiones':
	             provMapa = misiones;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Misiones'
	            //chartColor = '#ccb80c';
	             break;
	        case 'Neuquen':
	            provMapa = neuquen;
	            latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Neuquen'
	            //chartColor = '#97b552'
	            break;
	        case 'Ro Negro':
	             provMapa = rioNegro;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Rio_Negro'
	            //chartColor = '#29afb1';
	             break;
	        case 'Salta':
	             provMapa = salta;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Salta'
	            //chartColor = '#83759f';
	             break;
	        case 'San Juan':
	             provMapa = sanJuan;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'San_Juan'
	            //chartColor = '#417fac';
	             break;
	        case 'San Luis':
	             provMapa = sanLuis;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'San_Luis'
	            //chartColor = '#b5845c';
	             break;
	        case 'Santa Cruz':
	             provMapa = santaCruz;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Santa_Cruz'
	            //chartColor = '#b5676c';
	             break;
	        case 'Santa Fe':
	             provMapa = santaFe;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Santa_Fe'
	            //chartColor = '#767f95';
	             break;
	        case 'Santiago del Estero':
	             provMapa = santiagoDelEstero;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Santiago_del_Estero'
	            //chartColor = '#ae9d0b';
	             break;
	        case 'Tierra del Fuego':
	             provMapa = tierraDelFuego;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	            $scope.provLink =  'Tierra_del_Fuego'
	            //chartColor = '#7f9846';
	             break;
	        case 'Tucumn':
	             provMapa = tucuman;
	             latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 7
	            $scope.provLink =  'Tucuman'
	            //chartColor = '#208a8b';
	             break;
	        default:
	            provMapa = cordoba;
	            latitud = provMapa[0][0]
	            longitud = provMapa[0][1]
	            zoom = 5
	             break;
	        };
			var map = new GMaps({
			  el: '#map',
			  lat: latitud,
			  lng: longitud,
			  zoom: zoom
			  
			});
			map.drawPolygon({
			  paths: provMapa, // pre-defined polygon shape
			  //fillColor: chartColor,
			  fillColor: "#FFFFFF",
			  fillOpacity: 0.0,
			  strokeWeight: 2,
			  strokeOpacity: 0.8,  
			});
		});
		dashboardFactory.getSectorData().success(function(response){
			sector = response;
		});
		dashboardFactory.getDatosGenerales(localStorage.getItem('provName')).success(function(response){
			//$window.alert(JSON.stringify(response));
			response[0].poblacion=parseInt(response[0].poblacion).toLocaleString();
			response[0].prop_pobl_total_nac=parseFloat(parseFloat(response[0].prop_pobl_total_nac*100).toFixed(2)).toLocaleString();
			response[0].part_pbg_pbi=parseFloat(parseFloat(response[0].part_pbg_pbi*100).toFixed(2)).toLocaleString();
			response[0].prop_emp_publ_total_nac=parseFloat(parseFloat(response[0].prop_emp_publ_total_nac*100).toFixed(2)).toLocaleString();
			response[0].exp_mill_usd = parseInt(response[0].exp_mill_usd).toLocaleString()
			response[0].prop_exp_mill_usd_total_nac=parseFloat(parseFloat(response[0].prop_exp_mill_usd_total_nac*100).toFixed(2)).toLocaleString();
			response[0].emp_publ_prov=parseInt(response[0].emp_publ_prov).toLocaleString();
			response[0].pbg=parseInt(response[0].pbg).toLocaleString();
			response[0].part_2005_total_nac=parseFloat(response[0].part_2005_total_nac*100).toLocaleString();
			//response[0].part_exp_total_nac=parseFloat(response[0].part_exp_total_nac*100).toLocaleString('en-US');
			$scope.datosGenerales = response;
		});
		$scope.datosProv = JSON.parse(localStorage.getItem('provData'));

		$scope.scatterChart = 'app/page/scatterChart.html';
		$scope.setColor = function(data){

			return data<0? {color: "red"} : {color: "green"};
		}
		//$scope.sort = 'empleo_sector';
		$scope.reverse = false;

		$scope.changeSort = function(value){
		    if ($scope.sort == value){
		      $scope.reverse = !$scope.reverse;
		      return;
		    }

		    $scope.sort = value;
		    $scope.reverse = false;
		}
		$scope.goTo = function (location) {
			 $location.path(location);
		}
		$scope.active = function (element) {
			 switch (element) {
			 	case 1:
			 		$('#DG').css('background-color','lightGray')	
			 		$('#EM').css('background-color','white')	
			 		$('#EX').css('background-color','white')	
			 	break;
			 	case 2:
			 		$('#DG').css('background-color','white')	
			 		$('#EM').css('background-color','lightGray')	
			 		$('#EX').css('background-color','white')	
			 	break;
			 	case 3:
			 		$('#DG').css('background-color','white')	
			 		$('#EM').css('background-color','white')	
			 		$('#EX').css('background-color','lightGray')	
			 	break;
			 	default:
			 		// statements_def
			 		break;
			}
		}
	}]);
})();