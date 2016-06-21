(function(){
	angular.module('app.controllers')
	.controller('sectorController',['$location','sectorFactory','dashboardFactory','$window','$scope','welcomeFactory',
		function($location,sectorFactory,dashboardFactory,$window,$scope,welcomeFactory){
		var	rubro = [],
			sector = [];

		$scope.filterText = sectorFactory.getFilter();
		//codigo para que si no esta logeado no pueda acceder
		/*welcomeFactory.sessionOpen().success(function(response){
				if(response == ''){
					$location.path('page/signin');
				}
		});
		/*****************************************************/
		sectorFactory.getSectorData().success(function(response){
			$scope.sector = response;
			var rubro_id = 0;
			for (var i = 0; i < response.length; i++) {
				rubro_id = parseInt(response[i].rubro_sector_id);
				switch(rubro_id){
					case 1:
						response[i].rubro_sector_id = 'A';
					break;
					case 2:
						response[i].rubro_sector_id = 'B';
					break;
					case 3:
						response[i].rubro_sector_id = 'C';
					break;
					case 4:
						response[i].rubro_sector_id = 'D';
					break;
					case 5:
						response[i].rubro_sector_id = 'E';
					break;
					case 6:
						response[i].rubro_sector_id = 'F';
					break;
					case 7:
						response[i].rubro_sector_id = 'G';
					break;
					case 8:
						response[i].rubro_sector_id = 'H';
					break;
					case 9:
						response[i].rubro_sector_id = 'I';
					break;
					case 10:
						response[i].rubro_sector_id = 'J';
					break;
					case 11:
						response[i].rubro_sector_id = 'K';
					break;
					case 12:
						response[i].rubro_sector_id = 'L';
					break;
					case 13:
						response[i].rubro_sector_id = 'M';
					break;
					case 14:
						response[i].rubro_sector_id = 'N';
					break;
					case 15:
						response[i].rubro_sector_id = 'O';
					break;
				}
			}
			$scope.sector = response;
			//$window.alert(JSON.stringify($scope.sector));
		});
		sectorFactory.getRubroData().success(function(response){
			$scope.rubro = response;
			$scope.rubro.shift();
			//$window.alert(JSON.stringify($scope.rubro))
			//$window.alert(JSON.stringify(response));
		});
		$scope.setFilter = function(data){
			sectorFactory.setFilter(data)
			$location.path('page/sector2')
			//$window.alert($scope.filterText);
		}
		$scope.setDashData = function(data){
			var provincia = [],
				rubroData = [],
				nombreRubro = [],
				scatterEmpleoData = {},
				scatterExportData = {},
				empleoDataChildren = {},
				empleoData = {}
				empleo = [],
				exportacionData = {},
				exportacion = [],
				empleoLegend = [],
				empleoValue = 0,
				provData = [],
				scatterEmpleo = [],
				scatterExport = [];
			localStorage.setItem('sectorId',data)
			//sectorFactory.setSectorId(data);
			sectorFactory.getAllProv().success(function(response){
				provincia = response
				sectorFactory.getData(data).success(function(response){

					for (var i = 0; i < response.length; i++) {
						for (var j = 0; j < provincia.length; j++) {
							if (provincia[j].id === response[i].provincia_id) {
								response[i].nombreProvincia = provincia[j].nombre; 
							}							
						}
						response[i].part_empleo_prov_nacion = parseFloat(parseFloat(response[i].part_empleo_prov_nacion*100).toFixed(2));
						response[i].part_empleo_prov_nacion_view = response[i].part_empleo_prov_nacion.toLocaleString()
	 					response[i].dinamica_empleo = parseFloat(parseFloat(response[i].dinamica_empleo*100).toFixed(2));
	 					response[i].var_empleo_2007_2014 = parseFloat(parseFloat(response[i].var_empleo_2007_2014*100).toFixed(2));
						response[i].part_exp_prov_nacion = parseFloat(parseFloat(response[i].part_exp_prov_nacion*100).toFixed(2));
						response[i].part_exp_prov_nacion_view = response[i].part_exp_prov_nacion.toLocaleString()
						response[i].dinamica_part_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_part_exportaciones_pvciales * 100));
						//Esto lo meti asi a lo chancho para no tener que revisar todo no deberia ir asi
						response[i].sector_id = parseInt(response[i].sector_id);
						response[i].empleo_sector = parseInt(response[i].empleo_sector);
						response[i].empleo_sector_view = response[i].empleo_sector.toLocaleString();
						response[i].exportaciones = parseInt(response[i].exportaciones);
						response[i].exportaciones_view = response[i].exportaciones.toLocaleString();
						response[i].part_empleo_prov = parseFloat(parseFloat(response[i].part_empleo_prov*100).toFixed(2));
						response[i].part_empleo_prov_view = response[i].part_empleo_prov.toLocaleString();
	 					response[i].dinamica_empleo = parseFloat(parseFloat(response[i].dinamica_empleo*100).toFixed(2));
	 					response[i].dinamica_empleo_view = response[i].dinamica_empleo.toLocaleString();
	 					response[i].var_empleo_2007_2014 = parseFloat(parseFloat(response[i].var_empleo_2007_2014*100).toFixed(2)/100);
	 					response[i].var_empleo_2007_2014_view = response[i].var_empleo_2007_2014.toLocaleString();
						response[i].part_exportaciones_pvciales = parseFloat(parseFloat(response[i].part_exportaciones_pvciales*100).toFixed(2));
						response[i].part_exportaciones_pvciales_view = response[i].part_exportaciones_pvciales.toLocaleString();
						response[i].dinamica_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_exportaciones_pvciales * 100));
						response[i].dinamica_exportaciones_pvciales_view = response[i].dinamica_exportaciones_pvciales.toLocaleString();
						response[i].dinamica_part_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_part_exportaciones_pvciales * 100));
						response[i].dinamica_part_exportaciones_pvciales = response[i].dinamica_part_exportaciones_pvciales.toLocaleString();
						response[i].remuneracion = parseFloat(Math.round(response[i].remuneracion));
						response[i].remuneracion_view = parseInt(response[i].remuneracion).toLocaleString();
						response[i].dif_salario_sector = parseFloat(parseFloat(response[i].dif_salario_sector*100).toFixed(2));
						response[i].dif_salario_sector_view = response[i].dif_salario_sector.toLocaleString();
						//Objeto para graficar el scatterEmpleo
						if (response[i].nombreProvincia != 'Total Sectorial') {
							scatterEmpleoData.data = [[response[i].dinamica_empleo, response[i].var_empleo_2007_2014]];
							scatterEmpleoData.name = response[i].nombreProvincia;
							scatterEmpleoData.type = 'scatter';
							scatterEmpleoData.symbolSize = response[i].part_empleo_prov_nacion;
		                    scatterEmpleo[i] = scatterEmpleoData;
		                    scatterEmpleoData = {};

		                	scatterExportData.data = [[response[i].dinamica_part_exportaciones_pvciales, response[i].dinamica_exportaciones_pvciales]];
							scatterExportData.name = response[i].nombreProvincia;		
							scatterExportData.type = 'scatter';
							scatterExportData.symbolSize = response[i].part_exp_prov_nacion;
		                    scatterExport[i] = scatterExportData;
		                    scatterExportData = {};
						}
						
						
	                    
	                    /*--------------------------------*/
	                    /*Veo si hay un elemento igual en el array de empleo*/
	                    
	                    if (response[i].part_empleo_prov_nacion != 0 && 
	                    	response[i].nombreProvincia != 'Total Sectorial'){
		                	empleoData.name = response[i].nombreProvincia;
	                    	empleoData.value = (parseFloat(response[i].part_empleo_prov_nacion));
	                    	empleoData.itemStyle = {normal:{color:''}};
	                    	empleo.push(empleoData);
	                    	//$window.alert(JSON.stringify(empleoData))
	                    	empleoData = {};
							
		                }
		                /*Armo grafica de exportacion*/
		                if (response[i].part_exp_prov_nacion != 0 && response[i].nombreProvincia != 'Total Sectorial'){
		                	exportacionData.name = response[i].nombreProvincia;
	                    	exportacionData.value = response[i].part_exp_prov_nacion;
	                    	exportacionData.itemStyle = {normal:{color:''}};
	                    	exportacion.push(exportacionData);
	                    	exportacionData = {};
		                }
	                                       
					}
					if (empleo.length === 0) {
						empleo = [{name: 'sin valores',value: 1}];
					}
					if (exportacion.length === 0) {
						exportacion = [{name: 'sin valores',value: 1,itemStyle: {normal:{color:''}}}];
					}
					/*sectorFactory.setDashSectorData(response);
					sectorFactory.setEmpleo(empleo);
					sectorFactory.setExportacion(exportacion);
					
					sectorFactory.setScatterEmpleo(scatterEmpleo);
					
					sectorFactory.setScatterExport(scatterExport);*/
					localStorage.setItem('dashSectorData',JSON.stringify(response))
					localStorage.setItem('empleoDataSect',JSON.stringify(empleo))
					localStorage.setItem('empleoScatterSect',JSON.stringify(scatterEmpleo))
					localStorage.setItem('exportDataSect',JSON.stringify(exportacion))
					localStorage.setItem('exportScatterSect',JSON.stringify(scatterExport))
					$location.path('/page/dashSector');
				});
			})			
		}
		$scope.showSector = function (sector) {
			$scope.idSector = sector.descripcion;
		}
	}]);
})();	