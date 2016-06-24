(function(){
	angular.module('app.controllers')
	.controller('mapController',['$location','dashboardFactory','$window','$scope','welcomeFactory',
		function($location,dashboardFactory,$window,$scope,welcomeFactory){
		//codigo para que si no esta logeado no pueda acceder
		/*welcomeFactory.sessionOpen().success(function(response){
				if(response == ''){
					$location.path('page/login');
				}else{
					$location.path('page/mapa');
				}
		})
		/*****************************************************/
		$scope.setData = function(data){
			img = data + '.png';
			//dashboardFactory.setImg(img);
			$scope.cache.put('provImg',img)
			//dashboardFactory.setProv(data);
			localStorage.setItem('provName',data)
			var sector = [],
				rubro = [],
				rubroData = [],
				nombreRubro = [],
				scatterDataEmpleo = {},
				scatterDataExport = {},
				empleoDataChildren = {},
				empleoData = {}
				empleo = [],
				exportacionData = {},
				exportacion = [],
				//empleoLegend = [],
				empleoValue = 0,
				provData = [],
				scatterEmpleo = [],
				scatterExport = [];
			var countExport = 0
			var countEmpleo = 0
			dashboardFactory.getSectorData().success(function(response){
				sector = response;
				dashboardFactory.getRubroData().success(function(response){
					rubro = response;
					dashboardFactory.getProvData(data).success(function(response){				
						for (var i = 0; i < response.length; i++) {
							for (var j = 0; j < sector.length; j++) {
								if (sector[j].id === response[i].sector_id) {
									response[i].nombreSector = sector[j].nombre;
									response[i].rubro_sector_id = sector[j].rubro_sector_id;  
								}
								for (var k = 0; k < rubro.length; k++) {
									if (response[i].rubro_sector_id === rubro[k].id) {
										response[i].nombreRubro = rubro[k].descripcion;
										nombreRubro[k] =  rubro[k].descripcion; 
									}						
								}							
							}
							response[i].sector_id = parseInt(response[i].sector_id);
							response[i].empleo_sector = parseInt(response[i].empleo_sector);
							response[i].empleo_sector_view = response[i].empleo_sector.toLocaleString();
							response[i].exportaciones = parseInt(response[i].exportaciones);
							response[i].exportaciones_view = response[i].exportaciones.toLocaleString();
							response[i].part_empleo_prov = parseFloat(parseFloat(response[i].part_empleo_prov*100).toFixed(2));
							response[i].part_empleo_prov_view = response[i].part_empleo_prov.toLocaleString();
		 					response[i].dinamica_empleo = parseFloat(parseFloat(response[i].dinamica_empleo*100).toFixed(2));
		 					response[i].dinamica_empleo_view = response[i].dinamica_empleo.toLocaleString();
		 					response[i].var_empleo_2007_2014 = parseFloat(parseFloat(response[i].var_empleo_2007_2014*100).toFixed(2));
		 					response[i].var_empleo_2007_2014_view = response[i].var_empleo_2007_2014.toLocaleString();
							response[i].part_exportaciones_pvciales = parseFloat(parseFloat(response[i].part_exportaciones_pvciales*100).toFixed(2));
							response[i].part_exportaciones_pvciales_view = response[i].part_exportaciones_pvciales.toLocaleString();
							response[i].dinamica_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_exportaciones_pvciales * 100));
							response[i].dinamica_exportaciones_pvciales_view = response[i].dinamica_exportaciones_pvciales.toLocaleString();
							response[i].dinamica_part_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_part_exportaciones_pvciales * 100));
							response[i].dinamica_part_exportaciones_pvciales_view = response[i].dinamica_part_exportaciones_pvciales.toLocaleString();
							response[i].remuneracion = parseFloat(Math.round(response[i].remuneracion));
							response[i].remuneracion_view = parseInt(response[i].remuneracion).toLocaleString();
							response[i].dif_salario_sector = parseFloat(parseFloat(response[i].dif_salario_sector*100).toFixed(2));
							response[i].dif_salario_sector_view = response[i].dif_salario_sector.toLocaleString();
							
							//Objeto para graficar el scatter
							if (response[i].nombreSector != 'Total Provincia') {
								if(	response[i].dinamica_empleo != 0 && response[i].var_empleo_2007_2014 != 0){
										scatterDataEmpleo.data = [[response[i].dinamica_empleo, response[i].var_empleo_2007_2014]];
										scatterDataEmpleo.name = response[i].nombreSector;
										scatterDataEmpleo.type = 'scatter';
										scatterDataEmpleo.symbolSize = response[i].part_empleo_prov;
					                    scatterEmpleo[countEmpleo] = scatterDataEmpleo;
					                    scatterDataEmpleo = {};
					                    countEmpleo++
					            }
							}

							if (response[i].nombreSector != 'Total Provincia') {
								if(	response[i].dinamica_part_exportaciones_pvciales != 0 &&
									response[i].dinamica_exportaciones_pvciales != 0 && 
									response[i].part_exportaciones_pvciales != 0){		
					                    scatterDataExport.data = [[response[i].dinamica_part_exportaciones_pvciales, response[i].dinamica_exportaciones_pvciales]];
										scatterDataExport.name = response[i].nombreSector;
										scatterDataExport.type = 'scatter';
										scatterDataExport.symbolSize = response[i].part_exportaciones_pvciales;
					                    scatterExport[countExport] = scatterDataExport;
					                    scatterDataExport = {};
					                    countExport++;
					            }
							}
							
		                    /*--------------------------------*/
		                    /*Veo si hay un elemento igual en el array de empleo*/
		                    if (response[i].part_empleo_prov != 0 && response[i].nombreSector != 'Total Provincia'){
			                	if(verificaRubro(empleo,response[i].nombreRubro) === -1){
			                    	empleoData.name = response[i].nombreRubro;
			                    	empleoData.value = response[i].part_empleo_prov;
			                    	empleoData.itemStyle = {normal:{color:''}};
			                    	empleoData.children = [{name: response[i].nombreSector,value: response[i].part_empleo_prov,itemStyle:{normal: {color:''}}}];
			                    	empleo.push(empleoData);
			                    	empleoData = {};
			                    }else{
			                    	empleo[verificaRubro(empleo,response[i].nombreRubro)].value = 
			                    	parseFloat((empleo[verificaRubro(empleo,response[i].nombreRubro)].value + 
			                    		                    		response[i].part_empleo_prov).toFixed(2));
			                    	empleo[verificaRubro(empleo,response[i].nombreRubro)].children.
			                    	push({name: response[i].nombreSector,value: response[i].part_empleo_prov,itemStyle:{normal: {color:''}}});
			                    }
			                }
			                /*Armo grafica de exportacion*/
			                if (response[i].part_exportaciones_pvciales != 0 && response[i].nombreSector != 'Total Provincia'){
			                	if(verificaRubroExp(exportacion,response[i].nombreRubro) === -1){
			                    	exportacionData.name = response[i].nombreRubro;
			                    	exportacionData.value = response[i].part_exportaciones_pvciales;
			                    	exportacionData.itemStyle = {normal:{color:''}};
			                    	exportacionData.children = [{name: response[i].nombreSector,value: (response[i].part_exportaciones_pvciales),itemStyle:{normal: {color:''}}}];
			                    	exportacion.push(exportacionData);
			                    	exportacionData = {};
			                     }else{
			                    	exportacion[verificaRubroExp(exportacion,response[i].nombreRubro)].value = 
			                    	parseFloat((exportacion[verificaRubroExp(exportacion,response[i].nombreRubro)].value + response[i].part_exportaciones_pvciales).toFixed(2));
			                    	exportacion[verificaRubroExp(exportacion,response[i].nombreRubro)].children.
			                    	push({name: response[i].nombreSector,value: parseFloat(response[i].part_exportaciones_pvciales),itemStyle:{normal: {color:''}}});
			                    }
			                }

		                                       
						}
						if (empleo.length === 0) {
							empleo = [{name: 'sin valores',value: 1,itemStyle: {normal:{color:''}},children: [{name: 'sin valores',value: 1,itemStyle:{normal:{color:''}}}]}];
						}
						if (exportacion.length === 0) {
							exportacion = empleo = [{name: 'sin valores',value: 1,itemStyle: {normal:{color:''}},children: [{name: 'sin valores',value: 1,itemStyle:{normal:{color:''}}}]}];
						}
						if (scatterEmpleo.length === 0) {
							scatterEmpleo = [{name: 'sin valores',type:"scatter",data: [[1,1]],symbolSize: 20}];
						}
						if (scatterExport.length === 0) {

							scatterExport = [{name: 'sin valores',type:"scatter",data: [[1,1]],symbolSize: 20}];
						}
						//$window.alert(JSON.stringify(empleo));
						//dashboardFactory.setEmpleoLegend(empleoLegend);
						/*[Start Factory para pasar datos al dash]
						dashboardFactory.setProvData(response);
						dashboardFactory.setEmpleo(empleo);
						//$window.alert(JSON.stringify(exportacion))
						dashboardFactory.setExportacion(exportacion);
						dashboardFactory.setScatterEmpleo(scatterEmpleo);
						scatterExport.shift()
						dashboardFactory.setScatterExport(scatterExport);
						/*[End Factory para pasar datos al dash]*/
						//console.log(angular.toJson(scatterExport))
						localStorage.setItem('provData',JSON.stringify(response))
						localStorage.setItem('empleoData',JSON.stringify(empleo))
						localStorage.setItem('empleoScatter',JSON.stringify(scatterEmpleo))
						localStorage.setItem('exportData',JSON.stringify(exportacion))
						localStorage.setItem('exportScatter',JSON.stringify(scatterExport))
						//alert(angular.toJson(exportacion))
						$location.path('page/dashboard');
					});
				});
			});			
		/*No lo saco para no tener que tocar el html*/
			$scope.to = function(){						
			
			};
		}
		$scope.goTo = function(path){						
			$location.path(path)
		};	
	}]);
	var verificaRubro = function(empleoArray,rubro){
		for (var m = 0; m < empleoArray.length; m++) {
        	if(empleo[m].name === rubro){
           		return m
            } 
        }
        return -1
	}
	var verificaRubroExp = function(empleoArray,rubro){
		for (var m = 0; m < empleoArray.length; m++) {
        	if(exportacion[m].name === rubro){
           		return m
            } 
        }
        return -1
	}
	
})();
