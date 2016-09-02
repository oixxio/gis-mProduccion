(function(){
	angular.module('app.controllers')
	.controller('dashSectorController',['$location','sectorFactory','dashboardFactory','$window','$scope','welcomeFactory',
	function($location,sectorFactory,dashboardFactory,$window,$scope,welcomeFactory){
		/*welcomeFactory.sessionOpen().success(function(response){
				if(response == ''){
					$location.path('page/signin');
				}else{
					$location.path('page/dashSector');
				}
		})*/
		var sector = {};
		sectorFactory.getSector().success(function(response){
			$scope.sector = response[0].nombre;
			dashboardFactory.getDatosGeneralesSector(response[0].id).success(function(response){
				//$window.alert(JSON.stringify(response))
				response[0].empleo_sector=parseInt(response[0].empleo_sector).toLocaleString();
				response[0].exportacion=parseInt(response[0].exportacion).toLocaleString();
				response[0].part_emp_total_nac = parseFloat(parseFloat(response[0].part_emp_total_nac*100).toFixed(2)).toLocaleString();
				response[0].part_exp_sect_total_nac = parseFloat(parseFloat(response[0].part_exp_sect_total_nac*100).toFixed(2)).toLocaleString();
				$scope.datosGenerales = response[0];
			});
		});
		$scope.datosSector = JSON.parse(localStorage.getItem('dashSectorData'))
		$scope.setColor = function(data){
			return data<0? {color: "red"} : {color: "green"};
		}

		$scope.sort = "provincia_id";
		$scope.reverse = false;
		$scope.changeSort = function(value){
		    if ($scope.sort == value){
		      $scope.reverse = !$scope.reverse;
		      return;
		    }

		    $scope.sort = value;
		    $scope.reverse = false;
		}
		$scope.heatMap = function(data){
			//$window.alert(JSON.stringify(data))
			var map = new GMaps({
					  el: '#map',
					  lat: -37.629253,
					  lng: -65.762450,
					  zoom: 3
					});
			var provMapa,coefesp
			for (var i = 0; i < data.length; i++) {

				switch (data[i].nombreProvincia) {
			        case "Buenos Aires":
			            provMapa = buenosAires;
			          
			             break;
			        case 'CABA\r':
			            provMapa = CABA;
			          
			             break;
			        case 'Catamarca\r':
			             provMapa = catamarca;
			           
			             break;
			        case 'Chaco\r':
			             provMapa = chaco;
			           
			             break;
			        case 'Chubut\r':
			            provMapa = chubut;
			          
			            break;
			        case 'Córdoba':
			             provMapa = cordoba;
			           
			             break;
			        case 'Corrientes\r':
			             provMapa = corrientes;
			           
			             break;
			        case 'Entre Ríos':
			             provMapa = entreRios;
			           
			             break;
			        case 'Formosa\r':
			             provMapa = formosa;
			           
			             break;
			        case 'Jujuy\r':
			             provMapa = jujuy;
			           
			             break;
			        case 'La Pampa\r':
			             provMapa = laPampa;
			           
			             break;
			        case 'La Rioja\r':
			             provMapa = LaRioja;
			           
			             break;
			        case 'Mendoza\r':
			             provMapa = mendoza;
			           
			             break;
			        case 'Misiones\r':
			             provMapa = misiones;
			           
			             break;
			        case 'Neuquen\r':
			            provMapa = neuquen;
			          
			            break;
			        case 'Río Negro':
			             provMapa = rioNegro;
			           
			             break;
			        case 'Salta\r':
			             provMapa = salta;
			           
			             break;
			        case 'San Juan\r':
			             provMapa = sanJuan;
			           
			             break;
			        case 'San Luis\r':
			             provMapa = sanLuis;
			           
			             break;
			        case 'Santa Cruz\r':
			             provMapa = santaCruz;
			           
			             break;
			        case 'Santa Fe\r':
			             provMapa = santaFe;
			           
			             break;
			        case 'Santiago del Estero\r':
			             provMapa = santiagoDelEstero;
			           
			             break;
			        case 'Tierra del Fuego\r':
			             provMapa = tierraDelFuego;
			           
			             break;
			        case 'Tucumán':
			             provMapa = tucuman;
			           
			             break;
			        default:
			            provMapa = cordoba;
			          
			             break;
			        };				
		        coefesp = data[i].coefesp;
			     //Falta modificar colores
			    var color;
			    coefesp<=1 && coefesp>=0 ? color = '#ffffff':""
			    coefesp<=2 && coefesp>1 ? color = '#E0E0F8':""
			    coefesp<=3 && coefesp>2 ? color = '#A9A9F5':""
			    coefesp<=4 && coefesp>3 ? color = '#8181F7':""
			    coefesp<=5 && coefesp>4 ? color = '#2E2EFE':""
			    coefesp>5 ? color = '#0404B4':""
				map.drawPolygon({
				  paths: provMapa, // pre-defined polygon shape
				  fillColor: color,
				  fillOpacity: 0.7,
				  strokeWeight: 1,
			  	  strokeOpacity: 0.0, 
				});
			}
		}
		$scope.JSONToCSVConvertor = function(JSONData, ReportTitle, ShowLabel) {
		    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
		    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;		    
		    var CSV = '';    
		    //Set Report title in first row or line		    
		    CSV += ReportTitle + '\r\n\n';
		    //This condition will generate the Label/Header
		    if (ShowLabel) {
		        var row = "";		        
		        //This loop will extract the label from 1st index of on array
		        for (var index in arrData[0]) {		            
		            //Now convert each value to string and comma-seprated
		            row += index + ',';
		        }
		        row = row.slice(0, -1);		        
		        //append Label row with line break
		        CSV += row + '\r\n';
		    }
		    //1st loop is to extract each row
		    for (var i = 0; i < arrData.length; i++) {
		        var row = "";   
		        //2nd loop will extract each column and convert it in string comma-seprated
		        for (var index in arrData[i]) {
		            row += '"' + arrData[i][index] + '",';
		        }
		        row.slice(0, row.length - 1);
		        //add a line break after each row
		        CSV += row + '\r\n';
		    }

		    if (CSV == '') {        
		        alert("Invalid data");
		        return;
		    }   		    
		    //Generate a file name
		    var fileName = "_";
		    //this will remove the blank-spaces from the title and replace it with an underscore
		    fileName += ReportTitle.replace(/ /g,"_");   
		    
		    //Initialize file format you want csv or xls
		    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);		    
		    // Now the little tricky part.
		    // you can use either>> window.open(uri);
		    // but this will not work in some browsers
		    // or you will not get the correct file extension    
		    
		    //this trick will generate a temp <a /> tag
		    var link = document.createElement("a");    
		    link.href = uri;
		    
		    //set the visibility hidden so it will not effect on your web-layout
		    link.style = "visibility:hidden";
		    link.download = fileName + ".csv";
		    
		    //this part will append the anchor tag and remove it after automatic click
		    document.body.appendChild(link);
		    link.click();
		    document.body.removeChild(link);
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