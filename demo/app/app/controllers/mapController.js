(function(){
	angular.module('app.controllers')
	.controller('mapController',['$timeout','$location','dashboardFactory','$window','$scope','welcomeFactory',
		function($timeout,$location,dashboardFactory,$window,$scope,welcomeFactory){


		$scope.to = function(data){
			//$location.path('page/'+data);
		}
		$scope.goTo = function(data){
			$location.path('page/'+data);
		}

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
					//variables agregadas para calcular los datos de tabla no logaritmicos
					var empleo_2007 = 0;	
					var exp_2007 = 0;	
					//--------------------------------------------------------------------	
						for (var i = 0; i < response.length; i++) {
							//reemplaza ids por nombres
							for (var j = 0; j < sector.length; j++) {
								if (sector[j].id === response[i].sector_id) {
									response[i].nombreSector = sector[j].nombre;
									response[i].abvSector = sector[j].abv;
									response[i].rubro_sector_id = sector[j].rubro_sector_id;  
								}
								for (var k = 0; k < rubro.length; k++) {
									if (response[i].rubro_sector_id === rubro[k].id) {
										response[i].abvRubro = rubro[k].abv;
										response[i].nombreRubro = rubro[k].descripcion;
										nombreRubro[k] =  rubro[k].descripcion; 
									}						
								}							
							}
							//adaptacion de datos, parsing a enteros, etc
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
							//Objeto para graficar el scatter
							if (response[i].abvSector != 'Total Provincia') {
								if(	response[i].dinamica_empleo != 0 && response[i].var_empleo_2007_2014 != 0){
										scatterDataEmpleo.data = [[response[i].dinamica_empleo, response[i].var_empleo_2007_2014]];
										scatterDataEmpleo.name = response[i].abvSector;
										scatterDataEmpleo.type = 'scatter';
										scatterDataEmpleo.symbolSize = $scope.scaleRadius(response[i].part_empleo_prov);
					                    scatterEmpleo[countEmpleo] = scatterDataEmpleo;
					                    scatterDataEmpleo = {};
					                    countEmpleo++
					            }
							}
							//Arma datos para SCATTER EXPORTACION
							if (response[i].abvSector != 'Total Provincia') {
								if(	response[i].dinamica_part_exportaciones_pvciales != 0 &&
									response[i].dinamica_exportaciones_pvciales != 0 && 
									response[i].part_exportaciones_pvciales != 0){		
					                    scatterDataExport.data = [[response[i].dinamica_part_exportaciones_pvciales, response[i].dinamica_exportaciones_pvciales]];
										scatterDataExport.name = response[i].abvSector;
										scatterDataExport.type = 'scatter';
										scatterDataExport.symbolSize = $scope.scaleRadius(response[i].part_exportaciones_pvciales);
					                    scatterExport[countExport] = scatterDataExport;
					                    scatterDataExport = {};
					                    countExport++;
					            }
							}
		                    //Arma datos para TREEMAP EMPLEO
		                    if (response[i].part_empleo_prov != 0 && response[i].nombreSector != 'Total Provincia'){
			                	if(verificaRubro(empleo,response[i].abvRubro) === -1){
			                    	empleoData.name = response[i].abvRubro;
			                    	empleoData.value = response[i].part_empleo_prov;
			                    	empleoData.itemStyle = {normal:{ label: {show: true,formatter: "{b} "},color:''}};
			                    	empleoData.children = [{name: response[i].abvSector,value: response[i].part_empleo_prov,itemStyle:{normal:{ label: {show: true,formatter: "{b}: {c}%"},color:''}}}];
			                    	empleo.push(empleoData);
			                    	empleoData = {};
			                    }else{
			                    	empleo[verificaRubro(empleo,response[i].abvRubro)].value = 
			                    	parseFloat((empleo[verificaRubro(empleo,response[i].abvRubro)].value + 
			                    		                    		response[i].part_empleo_prov).toFixed(2));
			                    	empleo[verificaRubro(empleo,response[i].abvRubro)].children.
			                    	push({name: response[i].abvSector,value: response[i].part_empleo_prov,itemStyle:{normal:{ label: {show: true,formatter: "{b}: {c}%"},color:''}}});
			                    }
			                }
			                //Arma datos para TREEMAP EMPLEO
			                if (response[i].part_exportaciones_pvciales != 0 && response[i].nombreSector != 'Total Provincia'){
			                	if(verificaRubroExp(exportacion,response[i].abvRubro) === -1){
			                    	exportacionData.name = response[i].abvRubro;
			                    	exportacionData.value = response[i].part_exportaciones_pvciales;
			                    	exportacionData.itemStyle = {normal:{ label: {show: true,formatter: "{b} "},color:''}};
			                    	exportacionData.children = [{name: response[i].abvSector,value: (response[i].part_exportaciones_pvciales),itemStyle:{normal:{ label: {show: true,formatter: "{b}: {c}%"},color:''}}}];
			                    	exportacion.push(exportacionData);
			                    	exportacionData = {};
			                     }else{
			                    	exportacion[verificaRubroExp(exportacion,response[i].abvRubro)].value = 
			                    	parseFloat((exportacion[verificaRubroExp(exportacion,response[i].abvRubro)].value + response[i].part_exportaciones_pvciales).toFixed(2));
			                    	exportacion[verificaRubroExp(exportacion,response[i].abvRubro)].children.
			                    	push({name: response[i].abvSector,value: parseFloat(response[i].part_exportaciones_pvciales),itemStyle:{normal:{ label: {show: true,formatter: "{b}: {c}%"},color:''}}});
			                    }
			                }                  
						} // END for
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

					/* FIX-29/08/2016 para adaptar datos ficticios en los scatter */
					dashboardFactory.getScatterProvData(data).success(function(response){
						console.log(response);
						//EXPORTACION
						var countExportFake = 0;
						var scatterExportDataFake = {};
						var scatterExportFake = [];
						var auxA, auxB, auxC, auxD, auxE;
						for (var i = 0; i < response.length; i++) {
							//reemplaza sector_id por nombre
							for (var j = 0; j < sector.length; j++) {
								if (sector[j].id === response[i].sector_id) {
									response[i].nombreSector = sector[j].nombre;
									response[i].abvSector = sector[j].abv;
									response[i].rubro_sector_id = sector[j].rubro_sector_id;  
								}
								for (var k = 0; k < rubro.length; k++) {
									if (response[i].rubro_sector_id === rubro[k].id) {
										response[i].abvRubro = rubro[k].abv;
										response[i].nombreRubro = rubro[k].descripcion;
										nombreRubro[k] =  rubro[k].descripcion; 
									}						
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
							
							if (response[i].nombreSector != 'Total Provincia') {
								if(response[i].export_var_2007_2015 != 0 && response[i].export_part_prov_2015 != 0 && response[i].export_coef_esp != 0){
										scatterExportDataFake.data = [[response[i].export_coef_esp_fake,response[i].export_var_2007_2015_fake]];
										scatterExportDataFake.name = response[i].abvSector;
										var colorA = hexToRgbA(getColorByName(response[i].abvSector));
										scatterExportDataFake.itemStyle = {normal: { color: colorA} };
										scatterExportDataFake.name = response[i].abvSector + '<br> '
																 + response[i].export_var_2007_2015 + '% '
																 + response[i].export_coef_esp;					 
										scatterExportDataFake.type = 'scatter';
										scatterExportDataFake.symbolSize = $scope.scaleRadius(response[i].export_part_prov_2015);
					                    scatterExportFake[countExportFake] = scatterExportDataFake;
					                    scatterExportDataFake = {};
					                    countExportFake++;
					            }
							} else if (response[i].nombreSector == 'Total Provincia') {
					            var scatterExportDataFake = {
					                    name: 'Total Provincia',
					                    type:'scatter',
					                    symbolSize: 0,
					                    data: [[0,response[i].export_var_2007_2015]],
					                    markLine: {
					                        symbolSize: [2,2],
					                        tooltip: {
					                            show: true, formatter: 'Total Provincia<br>{c}%'
					                        },
					                        itemStyle: {
					                            normal: { lineStyle: { type: 'dotted', width: 2 }, label: { show: true, position: 'right', formatter: '{c}%' }, },
					                            emphasis: { lineStyle: { width: 2 } }
					                        },
					                        data : [[
					                                {name: 'Total Provincia', value: response[i].export_var_2007_2015, xAxis: 0, yAxis: response[i].export_var_2007_2015},
					                                {name: 'Total Provincia', xAxis: 1000, yAxis: response[i].export_var_2007_2015}
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
							//reemplaza sector_id por nombre
							for (var j = 0; j < sector.length; j++) {
								if (sector[j].id === response[i].sector_id) {
									response[i].nombreSector = sector[j].nombre;
									response[i].abvSector = sector[j].abv;
									response[i].rubro_sector_id = sector[j].rubro_sector_id;  
								}
								for (var k = 0; k < rubro.length; k++) {
									if (response[i].rubro_sector_id === rubro[k].id) {
										response[i].abvRubro = rubro[k].abv;
										response[i].nombreRubro = rubro[k].descripcion;
										nombreRubro[k] =  rubro[k].descripcion; 
									}						
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
							
							if (response[i].nombreSector != 'Total Provincia') {
								if(response[i].empleoB_var_2007_2015 != 0 && response[i].empleoB_part_prov_2015 != 0 && response[i].empleoB_coef_esp != 0){
										scatterEmpleoDataFake.data = [[response[i].empleoB_coef_esp_fake,response[i].empleoB_var_2007_2015_fake]];
										scatterEmpleoDataFake.name = response[i].abvSector;
										var colorB = hexToRgbA(getColorByName(response[i].abvSector));
										scatterEmpleoDataFake.itemStyle = {normal: { color: colorB} };
										scatterEmpleoDataFake.name = response[i].abvSector + '<br> '
																 + response[i].empleoB_var_2007_2015 + '% '
																 + response[i].empleoB_coef_esp;					 
										scatterEmpleoDataFake.type = 'scatter';
										scatterEmpleoDataFake.symbolSize = $scope.scaleRadius(response[i].empleoB_part_prov_2015);
					                    scatterEmpleoFake[countEmpleoFake] = scatterEmpleoDataFake;
					                    scatterEmpleoDataFake = {};
					                    countEmpleoFake++;
					            }
							} else if (response[i].nombreSector == 'Total Provincia') {
					            scatterEmpleoDataFake = {
					                    name: 'Total Provincia',
					                    type:'scatter',
					                    symbolSize: 0,
					                    data: [[0,response[i].empleoB_var_2007_2015]],
					                    markLine: {
					                        symbolSize: [2,2],
					                        tooltip: {
					                            show: true, formatter: 'Total Provincia<br>{c}%'
					                        },
					                        itemStyle: {
					                            normal: { lineStyle: { type: 'dotted', width: 2 }, label: { show: true, position: 'right', formatter: '{c}%' }, },
					                            emphasis: { lineStyle: { width: 2 } }
					                        },
					                        data : [[
					                                {name: 'Total Provincia', value: response[i].empleoB_var_2007_2015, xAxis: 0, yAxis: response[i].empleoB_var_2007_2015},
					                                {name: 'Total Provincia', xAxis: 1000, yAxis: response[i].empleoB_var_2007_2015}
					                            ]]
					                    }
				                }
				                scatterEmpleoFake[countEmpleoFake] = scatterEmpleoDataFake;
			                    scatterEmpleoDataFake = {};
			                    countEmpleoFake++;								
							}							
						}
						localStorage.setItem('exportScatterProvFake',JSON.stringify(scatterExportFake));
						localStorage.setItem('empleoScatterProvFake',JSON.stringify(scatterEmpleoFake));

						
						$timeout(function(){$location.path('/page/dashboard');}, 1000)						
						//$location.path('/page/dashboard');

					});
					/* END FIX-29/08/2016 para adaptar datos ficticios en los scatter */

					localStorage.setItem('provData',JSON.stringify(response))
					localStorage.setItem('empleoData',JSON.stringify(empleo))
					localStorage.setItem('empleoScatter',JSON.stringify(scatterEmpleo))
					localStorage.setItem('exportData',JSON.stringify(exportacion))
					localStorage.setItem('exportScatter',JSON.stringify(scatterExport))
					//alert(angular.toJson(exportacion))
					//$location.path('page/dashboard');
					});
				});
			});	
		}
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

})();
