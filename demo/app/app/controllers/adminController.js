(function(){
	angular.module('app.controllers')
	.controller('adminController',['$location','$http','dashboardFactory','adminFactory','sectorFactory','$window','$scope','welcomeFactory',
		function($location,$http,dashboardFactory,adminFactory,sectorFactory,$window,$scope,welcomeFactory){
		/*codigo para que si no esta logeado no pueda acceder
		welcomeFactory.sessionOpen().success(function(response){
				if(response == ''){
					$location.path('page/signin');
				}else{
					$location.path('page/admin');
				}
		})
		/*****************************************************/
		var sector = [],
			rubro = [],
			provincia = [],
			rubroData = [],
			nombreRubro = [];
		dashboardFactory.getSectorData().success(function(response){
			sector = response;
		});
		sectorFactory.getAllProv().success(function(response){
				provincia = response
		})	
		dashboardFactory.getAllData().success(function(response){
			for (var i = 0; i < response.length; i++) {
				for (var j = 0; j < sector.length; j++) {
					if (sector[j].id === response[i].sector_id) {
						response[i].nombreSector = sector[j].nombre;
					}							
				}
				for (var k = 0; k < provincia.length; k++) {
					if (response[i].provincia_id != '-1') {
						if (response[i].provincia_id === provincia[k].id) {
							response[i].nombreProvincia = provincia[k].nombre;  
						}	
					}else{
						response[i].nombreProvincia = 'Total Pais';  
					}						
				}
				response[i].sector_id = parseInt(response[i].sector_id);
				response[i].empleo_sector = parseInt(response[i].empleo_sector);
				response[i].exportaciones = parseInt(response[i].exportaciones);
				response[i].part_empleo_prov = parseFloat(parseFloat(response[i].part_empleo_prov*100).toFixed(2));
				response[i].part_empleo_prov_nacion = parseFloat(parseFloat(response[i].part_empleo_prov_nacion*100).toFixed(2));
				response[i].dinamica_empleo = parseFloat(parseFloat(response[i].dinamica_empleo*100).toFixed(2));
				response[i].part_exportaciones_pvciales = parseFloat(parseFloat(response[i].part_exportaciones_pvciales*100).toFixed(2));
				response[i].part_exp_prov_nacion = parseFloat(parseFloat(response[i].part_exp_prov_nacion*100).toFixed(2));
				response[i].dinamica_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_exportaciones_pvciales * 100) / 100);
				response[i].coefesp = parseFloat(Math.round(response[i].coefesp * 100) / 100);
				response[i].dif_salario_sector = parseFloat(parseFloat(response[i].dif_salario_sector*100).toFixed(2));
				response[i].participacion_sector_nacion = parseFloat(Math.round(response[i].participacion_sector_nacion * 100) / 100);
				response[i].dinamica_empleo_nacion = parseFloat(Math.round(response[i].dinamica_empleo_nacion * 100) / 100);
			}
			$scope.adminData = response;
			$scope.screen = 'app/page/adminTable.html'
		})
		$scope.setModalData = function(data){
			adminFactory.setModalData(data);
			$scope.previousData = data;
		}
		$scope.getModalData = function(){
			$scope.modalData = adminFactory.getModalData();
			$scope.previousData = adminFactory.getModalData();
		}
		$scope.guardar = function(data){
			data.part_empleo_prov = data.part_empleo_prov/100;
			data.part_empleo_prov_nacion = data.part_empleo_prov_nacion/100;
			data.dinamica_empleo = data.dinamica_empleo/100;
			data.part_exportaciones_pvciales = data.part_exportaciones_pvciales/100;
			data.part_exp_prov_nacion = data.part_exp_prov_nacion/100;
			data.dinamica_exportaciones_pvciales = data.dinamica_exportaciones_pvciales/100;
			data.coefesp = data.coefesp/100;
			data.dif_salario_sector = data.dif_salario_sector/100;
			data.participacion_sector_nacion = data.participacion_sector_nacion/100;
			data.dinamica_empleo_nacion = data.dinamica_empleo_nacion/100;

			$http.post('app/api/admin/guardarDatos.php',data).success(function(response){
				if (response === 'campo actualizado') {
					$window.alert(response);
					data.part_empleo_prov = parseFloat(parseFloat(data.part_empleo_prov*100).toFixed(2));
					data.part_empleo_prov_nacion = parseFloat(parseFloat(data.part_empleo_prov_nacion*100).toFixed(2));
					data.dinamica_empleo = parseFloat(parseFloat(data.dinamica_empleo*100).toFixed(2));
					data.part_exportaciones_pvciales = parseFloat(parseFloat(data.part_exportaciones_pvciales*100).toFixed(2));
					data.part_exp_prov_nacion = parseFloat(parseFloat(data.part_exp_prov_nacion*100).toFixed(2));
					data.dinamica_exportaciones_pvciales = parseFloat(Math.round(data.dinamica_exportaciones_pvciales * 100) / 100);
					data.coefesp = parseFloat(Math.round(data.coefesp * 100) / 100);
					data.dif_salario_sector = parseFloat(parseFloat(data.dif_salario_sector*100).toFixed(2));
					data.participacion_sector_nacion = parseFloat(Math.round(data.participacion_sector_nacion * 100) / 100);
					data.dinamica_empleo_nacion = parseFloat(Math.round(data.dinamica_empleo_nacion * 100) / 100);
					$scope.adminData[data.id-1] = data;
				}else{
					$window.alert(response);
				}
			});
		}
		$scope.setColor = function(data){
			return data<0? {color: "red"} : {color: "green"};
		}
	}]);
	
})();
