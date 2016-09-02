(function(){
	angular.module('app.controllers')
	.controller('sectorController',['$timeout','$location','sectorFactory','dashboardFactory','$window','$scope','welcomeFactory',
		function($timeout,$location,sectorFactory,dashboardFactory,$window,$scope,welcomeFactory){
		var	rubro = [],
			sector = [];

		$scope.to = function(data){
			$location.path('page/'+data);
		}
		$scope.goTo = function(data){
			$location.path('page/'+data);
		}

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
			var countExport= 0;
			var countEmpleo = 0
			localStorage.setItem('sectorId',data)
			//sectorFactory.setSectorId(data);
			sectorFactory.getAllProv().success(function(response){
				provincia = response
				sectorFactory.getData(data).success(function(response){
					
					for (var i = 0; i < response.length; i++) {
						for (var j = 0; j < provincia.length; j++) {
							if (provincia[j].id === response[i].provincia_id) {
								response[i].nombreProvincia = provincia[j].nombre;
								response[i].abvProv = provincia[j].abv; 
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
	 					//response[i].dinamica_empleo = parseFloat(parseFloat(response[i].dinamica_empleo*100).toFixed(2));
	 					response[i].dinamica_empleo_view = response[i].dinamica_empleo.toLocaleString();
	 					//response[i].var_empleo_2007_2014 = parseFloat(parseFloat(response[i].var_empleo_2007_2014*100).toFixed(2)/100);
	 					response[i].var_empleo_2007_2014_view = response[i].var_empleo_2007_2014.toLocaleString();
						response[i].part_exportaciones_pvciales = parseFloat(parseFloat(response[i].part_exportaciones_pvciales*100).toFixed(2));
						response[i].part_exportaciones_pvciales_view = response[i].part_exportaciones_pvciales.toLocaleString();
						response[i].dinamica_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_exportaciones_pvciales * 100));
						response[i].dinamica_exportaciones_pvciales_view = response[i].dinamica_exportaciones_pvciales.toLocaleString();
						//response[i].dinamica_part_exportaciones_pvciales = parseFloat(Math.round(response[i].dinamica_part_exportaciones_pvciales * 100));
						response[i].dinamica_part_exportaciones_pvciales = response[i].dinamica_part_exportaciones_pvciales.toLocaleString();
						response[i].remuneracion = parseFloat(Math.round(response[i].remuneracion));
						response[i].remuneracion_view = parseInt(response[i].remuneracion).toLocaleString();
						response[i].dif_salario_sector = parseFloat(parseFloat(response[i].dif_salario_sector*100).toFixed(2));
						response[i].dif_salario_sector_view = response[i].dif_salario_sector.toLocaleString();

						//[START fix datos var%empleo en tabla]
							if (response[i].empleo_sector != 0) {
								empleo_2007 = response[i].empleo_sector/(Math.exp(response[i].var_empleo_2007_2014/100))
								response[i].var_empleo_tabla = ((response[i].empleo_sector-empleo_2007)*100)/empleo_2007
								response[i].var_empleo_tabla = parseFloat(parseFloat(response[i].var_empleo_tabla).toFixed(2));
								response[i].var_empleo_tabla_view = response[i].var_empleo_tabla.toLocaleString();
							}else {
								response[i].var_empleo_tabla = 0
								response[i].var_empleo_tabla_view = response[i].var_empleo_tabla.toLocaleString();
							}							
							//[END fix datos var%empleo en tabla] 

							//[START fix datos var part exp en tabla]
							if (response[i].exportaciones != 0) {
								exp_2007 = response[i].exportaciones/(Math.exp(response[i].dinamica_exportaciones_pvciales/100))
								response[i].dinamica_exp_tabla = ((response[i].exportaciones-exp_2007)*100)/exp_2007
								response[i].dinamica_exp_tabla = parseFloat(parseFloat(response[i].dinamica_exp_tabla).toFixed(2));
								response[i].dinamica_exp_tabla_view = response[i].dinamica_exp_tabla.toLocaleString();
							}else {
								response[i].dinamica_exp_tabla = 0
								response[i].dinamica_exp_tabla_view = response[i].dinamica_exp_tabla.toLocaleString()
							}
							
							//[END fix datos var part exp en tabla]

						/*Objeto para graficar el scatterEmpleo
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
						}*/
							if (response[i].nombreProvincia != 'Total Sectorial') {
								if(	response[i].dinamica_empleo != 0 && response[i].var_empleo_2007_2014 != 0){
										scatterEmpleoData.data = [[response[i].dinamica_empleo, response[i].var_empleo_2007_2014]];
										scatterEmpleoData.name = response[i].nombreProvincia;
										scatterEmpleoData.type = 'scatter';
										scatterEmpleoData.symbolSize = $scope.scaleRadius(response[i].part_empleo_prov);
					                    scatterEmpleo[countEmpleo] = scatterEmpleoData;
					                    scatterEmpleoData = {};
					                    countEmpleo++
					            }
							}

							if (response[i].nombreProvincia != 'Total Sectorial' && response[i].part_exp_prov_nacion > 0) {
								if(	response[i].dinamica_part_exportaciones_pvciales != 0 &&
									response[i].dinamica_exportaciones_pvciales != 0 ){		
					                    scatterExportData.data = [[response[i].dinamica_part_exportaciones_pvciales, response[i].dinamica_exportaciones_pvciales]];
										scatterExportData.name = response[i].nombreProvincia;
										scatterExportData.type = 'scatter';
										scatterExportData.symbolSize = $scope.scaleRadius(response[i].part_exportaciones_pvciales);
					                    scatterExport[countExport] = scatterExportData;
					                    scatterExportData = {};
					                    countExport++;
					            }
							}
						
	                    
	                    /*--------------------------------*/
	                    /*Veo si hay un elemento igual en el array de empleo*/
	                    
	                    if (response[i].nombreProvincia != 'Total Sectorial' && response[i].part_empleo_prov_nacion > 0){
		                	empleoData.name = response[i].nombreProvincia;
	                    	empleoData.value = response[i].part_empleo_prov_nacion;
	                    	empleoData.itemStyle = {normal:{ label: {show: true,formatter: "{b}: {c}%"},color:''}};
	                    	empleo.push(empleoData);
	                    	//$window.alert(JSON.stringify(empleoData))
	                    	empleoData = {};
		                }
		                /*Armo grafica de exportacion*/
		                if (response[i].nombreProvincia != 'Total Sectorial' && response[i].part_exp_prov_nacion > 0){
		                	exportacionData.name = response[i].nombreProvincia;
	                    	exportacionData.value = response[i].part_exp_prov_nacion;
	                    	exportacionData.itemStyle = {normal:{ label: {show: true,formatter: "{b}: {c}%"},color:''}};
	                    	exportacion.push(exportacionData);
	                    	exportacionData = {};
		                }
	                                       
					}
			
					if (empleo.length === 0) {
						empleo = [{name: 'sin valores',value: 1,itemStyle: {normal:{color:''}},children: [{name: 'sin valores',value: 1,itemStyle:{normal:{color:''}}}]}];
					}
					if (exportacion.length === 0) {
						exportacion = [{name: 'sin valores',value: 1,itemStyle: {normal:{color:''}},children: [{name: 'sin valores',value: 1,itemStyle:{normal:{color:''}}}]}];
					}
					if (scatterEmpleo.length === 0) {
						scatterEmpleo = [{name: 'sin valores',type:"scatter",data: [[1,1]],symbolSize: 20}];
					}
					if (scatterExport.length === 0) {
						scatterExport = [{name: 'sin valores',type:"scatter",data: [[1,1]],symbolSize: 20}];
					}
					/*sectorFactory.setDashSectorData(response);
					sectorFactory.setEmpleo(empleo);
					sectorFactory.setExportacion(exportacion);
					
					sectorFactory.setScatterEmpleo(scatterEmpleo);
					
					sectorFactory.setScatterExport(scatterExport);*/

					/* FIX-29/08/2016 para adaptar datos ficticios en los scatter */
					sectorFactory.getScatterSectorData(data).success(function(response){
						
						//EXPORTACION
						var countExportFake = 0;
						var scatterExportDataFake = {};
						var scatterExportFake = [];
						var auxA, auxB, auxC, auxD, auxE;
						for (var i = 0; i < response.length; i++) {
							//reemplaza provincia_id por nombre
							for (var j = 0; j < provincia.length; j++) {
								if (provincia[j].id === response[i].provincia_id) {
									response[i].nombreProvincia = provincia[j].nombre;
									response[i].abvProv = provincia[j].abv; 
								}							
							}							
							//adaptacion de strings 
						    auxA = parseFloat( response[i].export_var_2007_2015 ) * 100;
							response[i].export_var_2007_2015 = parseFloat( auxA.toFixed(2) );														

							auxB = parseFloat( response[i].export_coef_esp );
							response[i].export_coef_esp = parseFloat( auxB.toFixed(2) );

							auxC = parseFloat( response[i].export_var_2007_2015_fake ) * 100;
							response[i].export_var_2007_2015_fake = parseFloat( auxC.toFixed(2) );

							auxD = parseFloat( response[i].export_coef_esp_fake );
							response[i].export_coef_esp_fake = parseFloat( auxD.toFixed(2) );

							auxE = parseFloat( response[i].export_part_prov_2015 ) * 100;
							response[i].export_part_prov_2015 = parseFloat( auxE.toFixed(2) );
							//preparaciond atos para scatter
							
							if (response[i].nombreProvincia != 'Total Sectorial') {
								if(response[i].export_var_2007_2015 != 0 && response[i].export_part_prov_2015 != 0 && response[i].export_coef_esp != 0){
										scatterExportDataFake.data = [[response[i].export_coef_esp_fake,response[i].export_var_2007_2015_fake]];
										scatterExportDataFake.name = response[i].nombreProvincia;
										var colorA = hexToRgbA(getColorByName(response[i].nombreProvincia));
										scatterExportDataFake.itemStyle = {normal: { color: colorA} };
										scatterExportDataFake.name = response[i].nombreProvincia + '<br> '
																 + response[i].export_var_2007_2015 + '% '
																 + response[i].export_coef_esp;					 
										scatterExportDataFake.type = 'scatter';
										scatterExportDataFake.symbolSize = $scope.scaleRadius(response[i].export_part_prov_2015);
					                    scatterExportFake[countExportFake] = scatterExportDataFake;
					                    scatterExportDataFake = {};
					                    countExportFake++;
					            }
							} else if (response[i].nombreProvincia == 'Total Sectorial') {
					            var scatterExportDataFake = {
					                    name: 'Total Sectorial',
					                    type:'scatter',
					                    symbolSize: 0,
					                    data: [[0,response[i].export_var_2007_2015]],
					                    markLine: {
					                        symbolSize: [2,2],
					                        tooltip: {
					                            show: true, formatter: 'Total Sectorial<br>{c}%'
					                        },
					                        itemStyle: {
					                            normal: { lineStyle: { type: 'dotted', width: 2 }, label: { show: true, position: 'right', formatter: '{c}%' }, },
					                            emphasis: { lineStyle: { width: 2 } }
					                        },
					                        data : [[
					                                {name: 'Total Sectorial', value: response[i].export_var_2007_2015, xAxis: 0, yAxis: response[i].export_var_2007_2015},
					                                {name: 'Total Sectorial', xAxis: 1000, yAxis: response[i].export_var_2007_2015}
					                            ]]
					                    }
				                }
				                scatterExportFake[countExportFake] = scatterExportDataFake;
			                    scatterExportDataFake = {};
			                    countExportFake++;								
							}							
						}
						

						//EMPLEO
						var countEmpleoFake = 0;
						var scatterEmpleoDataFake = {};
						var scatterEmpleoFake = [];
						for (var i = 0; i < response.length; i++) {
							//reemplaza provincia_id por nombre
							for (var j = 0; j < provincia.length; j++) {
								if (provincia[j].id === response[i].provincia_id) {
									response[i].nombreProvincia = provincia[j].nombre;
									response[i].abvProv = provincia[j].abv; 
								}							
							}							
							//adaptacion de strings 
						    auxA = parseFloat( response[i].empleoB_var_2007_2015 ) * 100;
							response[i].empleoB_var_2007_2015 = parseFloat( auxA.toFixed(2) );														

							auxB = parseFloat( response[i].empleoB_coef_esp );
							response[i].empleoB_coef_esp = parseFloat( auxB.toFixed(2) );

							auxC = parseFloat( response[i].empleoB_var_2007_2015_fake ) * 100;
							response[i].empleoB_var_2007_2015_fake = parseFloat( auxC.toFixed(2) );

							auxD = parseFloat( response[i].empleoB_coef_esp_fake );
							response[i].empleoB_coef_esp_fake = parseFloat( auxD.toFixed(2) );

							auxE = parseFloat( response[i].empleoB_part_prov_2015 ) * 100;
							response[i].empleoB_part_prov_2015 = parseFloat( auxE.toFixed(2) );
							//preparaciond atos para scatter
							
							if (response[i].nombreProvincia != 'Total Sectorial') {
								if(response[i].empleoB_var_2007_2015 != 0 && response[i].empleoB_part_prov_2015 != 0 && response[i].empleoB_coef_esp != 0){
										scatterEmpleoDataFake.data = [[response[i].empleoB_coef_esp_fake,response[i].empleoB_var_2007_2015_fake]];
										scatterEmpleoDataFake.name = response[i].nombreProvincia;
										var colorB = hexToRgbA(getColorByName(response[i].nombreProvincia));
										scatterEmpleoDataFake.itemStyle = {normal: { color: colorB} };
										scatterEmpleoDataFake.name = response[i].nombreProvincia + '<br> '
																 + response[i].empleoB_var_2007_2015 + '% '
																 + response[i].empleoB_coef_esp;					 
										scatterEmpleoDataFake.type = 'scatter';
										scatterEmpleoDataFake.symbolSize = $scope.scaleRadius(response[i].empleoB_part_prov_2015);
					                    scatterEmpleoFake[countEmpleoFake] = scatterEmpleoDataFake;
					                    scatterEmpleoDataFake = {};
					                    countEmpleoFake++;
					            }
							} else if (response[i].nombreProvincia == 'Total Sectorial') {
					            scatterEmpleoDataFake = {
					                    name: 'Total Sectorial',
					                    type:'scatter',
					                    symbolSize: 0,
					                    data: [[0,response[i].empleoB_var_2007_2015]],
					                    markLine: {
					                        symbolSize: [2,2],
					                        tooltip: {
					                            show: true, formatter: 'Total Sectorial<br>{c}%'
					                        },
					                        itemStyle: {
					                            normal: { lineStyle: { type: 'dotted', width: 2 }, label: { show: true, position: 'right', formatter: '{c}%' }, },
					                            emphasis: { lineStyle: { width: 2 } }
					                        },
					                        data : [[
					                                {name: 'Total Sectorial', value: response[i].empleoB_var_2007_2015, xAxis: 0, yAxis: response[i].empleoB_var_2007_2015},
					                                {name: 'Total Sectorial', xAxis: 1000, yAxis: response[i].empleoB_var_2007_2015}
					                            ]]
					                    }
				                }
				                scatterEmpleoFake[countEmpleoFake] = scatterEmpleoDataFake;
			                    scatterEmpleoDataFake = {};
			                    countEmpleoFake++;								
							}							
						}
						localStorage.setItem('exportScatterSectFake',JSON.stringify(scatterExportFake));
						localStorage.setItem('empleoScatterSectFake',JSON.stringify(scatterEmpleoFake));

						
						$timeout(function(){$location.path('/page/dashSector');}, 1000)					
						

					});
					/* END FIX-29/08/2016 para adaptar datos ficticios en los scatter */
					localStorage.setItem('dashSectorData',JSON.stringify(response))
					localStorage.setItem('empleoDataSect',JSON.stringify(empleo))
					localStorage.setItem('empleoScatterSect',JSON.stringify(scatterEmpleo))
					localStorage.setItem('exportDataSect',JSON.stringify(exportacion))
					localStorage.setItem('exportScatterSect',JSON.stringify(scatterExport))

						//$location.path('/page/dashSector');

				});
			})			
		}
		$scope.showSector = function (sector) {
			$scope.idSector = sector.descripcion;
		}

		//Se usa para convertir el HEXA de getColorByName a rgba() para poder usar transparencia
		function hexToRgbA(hex){
		    var c;
		    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		        c= hex.substring(1).split('');
		        if(c.length== 3){
		            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		        }
		        c= '0x'+c.join('');
		        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
		    }
		    throw new Error('Bad Hex');
		}

        function getColorByName(name) {
                    name = name.replace(/[^a-zA-Z. ]/g, "");
                    switch (name) {
                        case 'Buenos Aires':                           return '#34e3e5'; break;
                        case 'CABA':                                   return '#b6a2de'; break;
                        case 'Catamarca':                              return '#5ab1ef'; break;
                        case 'Chaco':                                  return '#ffb980'; break;
                        case 'Chubut':                                 return '#f28c93'; break;
                        case 'Crdoba':                                 return '#b6c2e1'; break;
                        case 'Corrientes':                             return '#e5cf0d'; break;
                        case 'Entre Ros':                              return '#b2d563'; break;
                        case 'Formosa':                                return '#2ec7c9'; break;
                        case 'Jujuy':                                  return '#51a0d8'; break;
                        case 'La Pampa':                               return '#dda06f'; break;
                        case 'La Rioja':                               return '#d87a80'; break;
                        case 'Mendoza':                                return '#8d98b3'; break;
                        case 'Misiones':                               return '#ccb80c'; break;
                        case 'Neuquen':                                return '#97b552'; break;
                        case 'Ro Negro':                               return '#29afb1'; break;
                        case 'Salta':                                  return '#83759f'; break;
                        case 'San Juan':                               return '#417fac'; break;
                        case 'San Luis':                               return '#b5845c'; break;
                        case 'Santa Cruz':                             return '#b5676c'; break;
                        case 'Santa Fe':                               return '#767f95'; break;
                        case 'Santiago del Estero':                    return '#ae9d0b'; break;
                        case 'Tierra del Fuego':                       return '#7f9846'; break;
                        case 'Tucumn':                                 return '#208a8b'; break;
                        case 'Agricultura y ganaderia':                return '#34e3e5'; break;
                        case 'Silvicultura, extraccin de madera':      return '#b6a2de'; break;
                        case 'Pesca':                                  return '#5ab1ef'; break;
                        case 'Carbn y lignito':                        return '#ffb980'; break;
                        case 'Petrleo crudo y gas':                    return '#f28c93'; break;
                        case 'Minerales metaliferos':                  return '#b6c2e1'; break;
                        case 'Explotacin de otras minas y canteras':   return '#e5cf0d'; break;
                        case 'Alimentos':                              return '#b2d563'; break;
                        case 'Tabaco':                                 return '#2ec7c9'; break;
                        case 'Textiles':                               return '#9888b9'; break;
                        case 'Confeccin':                              return '#51a0d8'; break;
                        case 'Calzado y cuero':                        return '#dda06f'; break;
                        case 'Madera':                                 return '#d87a80'; break;
                        case 'Papel':                                  return '#8d98b3'; break;
                        case 'Edicin e impresin':                      return '#ccb80c'; break;
                        case 'Productos de petrleo':                   return '#97b552'; break;
                        case 'Quimicos':                               return '#29afb1'; break;
                        case 'Caucho y plstico':                       return '#83759f'; break;
                        case 'Otros minerales no metlicos':            return '#417fac'; break;
                        case 'Metales comunes':                        return '#b5845c'; break;
                        case 'Otros productos de metal':               return '#b5676c'; break;
                        case 'Maquinaria y equipo':                    return '#767f95'; break;
                        case 'Maquinaria de oficina':                  return '#ae9d0b'; break;
                        case 'Aparatos elctricos':                     return '#7f9846'; break;
                        case 'Radio y televisin':                      return '#208a8b'; break;
                        case 'Instrumentos mdicos':                    return '#615775'; break;
                        case 'Automotores':                            return '#316082'; break;
                        case 'Otros equipos de transporte':            return '#876243'; break;
                        case 'Muebles':                                return '#925357'; break;
                        case 'Reciclamiento':                          return '#596071'; break;
                        case 'Electricidad gas y agua':                return '#867909'; break;
                        case 'Distribucion de agua':                   return '#627536'; break;
                        case 'Construccin':                            return '#34e3e5'; break;
                        case 'Vta. y reparación de vehículos':         return '#34e3e5'; break;
                        case 'Comercio al por mayor':                  return '#b6a2de'; break;
                        case 'Comercio al por menor':                  return '#5ab1ef'; break;
                        case 'Hoteleria y restaurantes':               return '#ffb980'; break;
                        case 'Transporte ferroviario y automotor':     return '#f28c93'; break;
                        case 'Transporte maritimo y fluvial':          return '#b6c2e1'; break;
                        case 'Transporte aereo':                       return '#e5cf0d'; break;
                        case 'Manipulacin de carga':                   return '#b2d563'; break;
                        case 'Telecomunicaciones y correos':           return '#2ec7c9'; break;
                        case 'Intermediacin financiera':               return '#9888b9'; break;
                        case 'Seguros':                                return '#51a0d8'; break;
                        case 'Ss. auxiliares a la act. financiera':    return '#dda06f'; break;
                        case 'Inmobiliarios':                          return '#d87a80'; break;
                        case 'Alquiler de transporte y de maquinaria': return '#8d98b3'; break;
                        case 'Informatica':                            return '#ccb80c'; break;
                        case 'I + D':                                  return '#97b552'; break;
                        case 'Ss. jurídicos y contables':              return '#29afb1'; break;
                        case 'Agencias de empleo':                     return '#83759f'; break;
                        case 'Enseanza':                               return '#417fac'; break;
                        case 'Servicios sociales y de salud':          return '#b5845c'; break;
                        case 'Eliminacin de desperdicios':             return '#767f95'; break;
                        case 'Ss. de organizaciones empresariales':    return '#ae9d0b'; break;
                        case 'Ss culturales, deportivos':              return '#7f9846'; break;
                        case 'Ss. n.c.p.':                             return '#208a8b'; break;
                        default:                                       return '#' + (Math.floor(Math.random() * 10)) + '' + (Math.floor(Math.random() * 10)) + '' + (Math.floor(Math.random() * 10)) + '' + (Math.floor(Math.random() * 10)) + '' + (Math.floor(Math.random() * 10)) + '' + (Math.floor(Math.random() * 10)) + ''; break;
                    };            
        }		

	}]);
})();	