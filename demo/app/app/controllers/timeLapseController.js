(function(){
	angular.module('app.controllers')
	.controller('timeLapseController',['$location','sectorFactory','dashboardFactory','$window','$scope','welcomeFactory','$http','$interval',
	function($location,sectorFactory,dashboardFactory,$window,$sc,welcomeFactory,$http,$interval){


		$sc.currentYear = "2015";
		$sc.currentProvName = 'Provincia';
		$sc.currentSectorName = "Sector";
        $sc.rankedList = [];

        $sc.to = function(data){
            $location.path('page/'+data);
        }
        $sc.goTo = function(data){
            $location.path('page/'+data);
        }

		$sc.datosTimeLapse = [
			{nombreProvincia: "Buenos Aires", sector: "Pesca", Empleo: "0"},
			{nombreProvincia: "CABA\r", sector: "Caza", Empleo: "1"},
			{nombreProvincia: "Catamarca\r", sector: "Ganaderia", Empleo: "2"},
			{nombreProvincia: "Chaco\r", sector: "Agricultura", Empleo: "3"},
			{nombreProvincia: "Chubut\r", sector: "Industria", Empleo: "4"},
			{nombreProvincia: "Catamarca\r", sector: "Pesca", Empleo: "5"},
			{nombreProvincia: "Córdoba\r", sector: "Caza", Empleo: "6"},
			{nombreProvincia: "Corrientes\r", sector: "Ganaderia", Empleo: "0"},
			{nombreProvincia: "Entre Ríos\r", sector: "Ganaderia", Empleo: "2"},
			{nombreProvincia: "Formosa\r", sector: "Ganaderia", Empleo: "1"},						
			{nombreProvincia: "Jujuy\r", sector: "Agricultura", Empleo: "3"},
			{nombreProvincia: "La Pampa\r", sector: "Industria", Empleo: "1"},
			{nombreProvincia: "La Rioja\r", sector: "Pesca", Empleo: "2"},
			{nombreProvincia: "Mendoza\r", sector: "Ganaderia", Empleo: "4"},
			{nombreProvincia: "Misiones\r", sector: "Agricultura", Empleo: "2"},
			{nombreProvincia: "Neuquen\r", sector: "Industria", Empleo: "5"},
			{nombreProvincia: "Río Negro", sector: "Pesca", Empleo: "0"},
			{nombreProvincia: "Salta\r", sector: "Ganaderia", Empleo: "4"},
			{nombreProvincia: "San Juan\r", sector: "Agricultura", Empleo: "Pesca"},
			{nombreProvincia: "San Luis\r", sector: "Industria", Empleo: "Pesca"},
			{nombreProvincia: "Santa Cruz\r", sector: "Pesca", Empleo: "1"},
			{nombreProvincia: "Santa Fe\r", sector: "Ganaderia", Empleo: "3"},
			{nombreProvincia: "Santiago del Estero\r", sector: "Agricultura", Empleo: "4"},
			{nombreProvincia: "Tierra del Fuego\r", sector: "Industria", Empleo: "1"},
			{nombreProvincia: "Tucumán", sector: "Pesca", Empleo: "0"}
		] 

        $sc.provPaths = [
        	{path: CABA, name: 'Capital Federal'},
			{path: catamarca, name: 'Catamarca'},
			{path: chaco, name: 'Chaco'},
			{path: chubut, name: 'Chubút'},
			{path: cordoba, name: 'Córdoba'},
			{path: corrientes, name: 'Corrientes'},
        	{path: entreRios, name: 'Entre Ríos'},
        	{path: formosa, name: 'Formosa'},
        	{path: jujuy, name: 'Jujuy'},
        	{path: laPampa, name: 'La Pampa'},
        	{path: LaRioja, name: 'La Rioja'},
        	{path: mendoza, name: 'Mendoza'},
        	{path: misiones, name: 'Misiones'},
        	{path: neuquen, name: 'Neuquén'},
        	{path: buenosAires, name: 'Buenos Aires'},
        	{path: rioNegro, name: 'Río Negro'},
        	{path: salta, name: 'Salta'},
        	{path: sanJuan, name: 'San Juan'},
        	{path: sanLuis, name: 'San Luís'},
        	{path: santaCruz, name: 'Santa Cruz'},
        	{path: santaFe, name: 'Santa Fe'},
        	{path: santiagoDelEstero, name: 'Santiago del Estero'},
        	{path: tierraDelFuego, name: 'Tierra del Fuego'},
        	{path: tucuman, name: 'Tucumán'}
    	];

		$sc.polygons = [];

		$http.get('app/api/time-lapse/getTLempleo.php').success(function(response){
			$sc.TLempleo = response;
			$http.get('app/api/time-lapse/getsector.php').success(function(response){
				$sc.sector = response;
				$sc.indexYear = $sc.TLempleo.length-1;
				$sc.initMap();
				$sc.updateMap($sc.currentYear);
				});				
			});

		$sc.playYear = function(){
            var indexTimeOut = 0;
            if($sc.currentYear === "2015"){
                indexTimeOut = 19;
                $sc.indexYear = 0;
            }else{
                indexTimeOut = 2015 - parseInt($sc.currentYear);
            }
			$sc.yourTimer = $interval(function() { $sc.toNextYear(); }, 1000, indexTimeOut);
		}

		
		$sc.pauseYear = function(state){
			$interval.cancel($sc.yourTimer);
		}

		$sc.toFirstYear = function(){
			$sc.indexYear = 0;
			$sc.currentYear = $sc.TLempleo[$sc.indexYear].fecha;
			$sc.updateMap($sc.currentYear);
		}

		$sc.toPreviousYear = function(){
			if ($sc.indexYear === 0) {
				$sc.indexYear = $sc.TLempleo.length-1;
			}else{
				$sc.indexYear--;
			}
			$sc.currentYear = $sc.TLempleo[$sc.indexYear].fecha;
			$sc.updateMap($sc.currentYear);
		}

		$sc.toNextYear = function(){
			if ($sc.indexYear === $sc.TLempleo.length-1) {
				$sc.indexYear = 0;
			}else{
				$sc.indexYear++;
			}
			$sc.currentYear = $sc.TLempleo[$sc.indexYear].fecha;
			$sc.updateMap($sc.currentYear);
		}

		$sc.toLastYear = function(){
			$sc.indexYear = $sc.TLempleo.length-1;
			$sc.currentYear = $sc.TLempleo[$sc.indexYear].fecha;
			$sc.updateMap($sc.currentYear);
		}
			
		$sc.colorSelect = function(nbrSector){
			var colorSector = '';

			switch (nbrSector.replace(/[^a-zA-Z. ]/g, "")) {
					case 'Agricultura y ganaderia':
                        colorSector = '#34e3e5';
                    break;
                    case 'Silvicultura, extraccin de madera':
                        colorSector = '#b6a2de';
                    break;
                    case 'Pesca':
                        colorSector = '#5ab1ef';
                    break;
                    case 'Carbn y lignito':
                        colorSector = '#ffb980';
                    break;
                    case 'Petrleo crudo y gas':
                        colorSector = '#f28c93';
                    break;
                    case 'Minerales metaliferos':
                        colorSector = '#b6c2e1';
                    break;
                    case 'Explotacin de otras minas y canteras':
                        colorSector = '#e5cf0d';
                    break;
                    case 'Alimentos':
                        colorSector = '#b2d563';
                    break;
                    case 'Tabaco':
                        colorSector = '#2ec7c9';
                    break;
                    case 'Textiles':
                        colorSector = '#9888b9';
                    break;
                    case 'Confeccin':
                        colorSector = '#51a0d8';
                    break;
                    case 'Calzado y cuero':
                        colorSector = '#dda06f';
                    break;
                    case 'Madera':
                        colorSector = '#d87a80';
                    break;
                    case 'Papel':
                        colorSector = '#8d98b3';
                    break;
                    case 'Edicin e impresin':
                        colorSector = '#ccb80c';
                    break;
                    case 'Productos de petrleo':
                        colorSector = '#97b552';
                    break;
                    case 'Quimicos':
                        colorSector = '#29afb1';
                    break;
                    case 'Caucho y plstico':
                        colorSector = '#83759f';
                    break;
                    case 'Otros minerales no metlicos':
                        colorSector = '#417fac';
                    break;
                    case 'Metales comunes':
                        colorSector = '#b5845c';
                    break;
                    case 'Otros productos de metal':
                        colorSector = '#b5676c';
                    break;
                    case 'Maquinaria y equipo':
                        colorSector = '#767f95';
                    break;
                    case 'Maquinaria de oficina':
                        colorSector = '#ae9d0b';
                    break;
                    case 'Aparatos elctricos':
                        colorSector = '#7f9846';
                    break;
                    case 'Radio y televisin':
                        
                        colorSector = '#208a8b';
                    break;
                    case 'Instrumentos mdicos':
                        colorSector = '#615775';
                    break;
                    case 'Automotores':
                        colorSector = '#316082';
                    break;
                    case 'Otros equipos de transporte':
                        colorSector = '#876243';
                    break;
                    case 'Muebles':
                        colorSector = '#925357';
                    break;
                    case 'Reciclamiento':
                        colorSector = '#596071';
                    break;
                    case 'Electricidad gas y agua':
                        colorSector = '#867909';
                    break;
                    case 'Distribucion de agua':
                        colorSector = '#627536';
                    break;
                    case 'Construccin':
                        colorSector = '#deb887';
                    break;
                    case 'Vta. y reparación de vehículos':
                        colorSector = '#34e3e5';
                    break;
                    case 'Comercio al por mayor':
                        colorSector = '#b6a2de';
                    break;
                    case 'Comercio al por menor':
                        colorSector = '#5ab1ef';
                    break;
                    case 'Hoteleria y restaurantes':
                        colorSector = '#ffb980';
                    break;
                    case 'Transporte ferroviario y automotor':
                        colorSector = '#f28c93';
                    break;
                    case 'Transporte maritimo y fluvial':
                        colorSector = '#b6c2e1';
                    break;
                    case 'Transporte aereo':
                        colorSector = '#e5cf0d';
                    break;
                    case 'Manipulacin de carga':
                        colorSector = '#b2d563';
                    break;
                    case 'Telecomunicaciones y correos':
                        colorSector = '#2ec7c9';
                    break;
                    case 'Intermediacin financiera':
                        colorSector = '#9888b9';
                    break;
                    case 'Seguros':
                        colorSector = '#51a0d8';
                    break;
                    case 'Ss. auxiliares a la act. financiera':
                        colorSector = '#dda06f';
                    break;
                    case 'Inmobiliarios':
                        colorSector = '#d87a80';
                    break;
                    case 'Alquiler de transporte y de maquinaria':
                        colorSector = '#8d98b3';
                    break;
                    case 'Informatica':
                        colorSector = '#ccb80c';
                    break;
                    case 'I + D':
                        colorSector = '#97b552';
                    break;
                    case 'Ss. jurdicos y contables':
                        colorSector = '#29afb1';
                    break;
                    case 'Agencias de empleo':
                        colorSector = '#83759f';
                    break;
                    case 'Enseanza':
                        colorSector = '#417fac';
                    break;
                    case 'Servicios sociales y de salud':
                        colorSector = '#b5845c';
                    break;
                    case 'Eliminacin de desperdicios':
                        colorSector = '#767f95';
                    break;
                    case 'Ss. de organizaciones empresariales':
                        colorSector = '#ae9d0b';
                    break;
                    case 'Ss culturales, deportivos':
                        colorSector = '#7f9846';
                    break;
                    case 'Ss. n.c.p.':
                        colorSector = '#208a8b';
                    break;
                }

            return colorSector;
        };


		$sc.update = function(ProvName){
			$sc.currentProvName = ProvName;
			 for (var j = 0; j < $sc.TLempleo.length; j++) {
			 	if ($sc.TLempleo[j].fecha === $sc.currentYear) {
			 		if ($sc.TLempleo[j].provincia === ProvName) {
			 			var nroSector =  $sc.TLempleo[j].sector;
			 		}
			 	}
			 }		 		
	 	 	for (var i = 0; i < $sc.sector.length; i++) {
	 			if(nroSector === $sc.sector[i].id){
	 				$sc.currentSectorName = $sc.sector[i].abv;							
	 			}
	 		}	
			$sc.$digest();		
		}


		$sc.initMap = function(){


			var map = new GMaps({
					  el: '#map',
					  //lat: -37.629253,
					  //lng: -65.762450,
                      lat: -41,
                      lng: -63.2 ,                     
					  zoom: 4,
                      disableDefaultUI: true,
                      styles: styles
					});


            var styles = [
              {
                stylers: [
                      { saturation: -100 }
                    ]
              }
            ];

            map.setOptions({styles: styles});


			for (var i = 0; i < $sc.provPaths.length; i++) {
				$sc.polygons.push(map.drawPolygon({
					name: $sc.provPaths[i].name,
					paths: $sc.provPaths[i].path, // pre-defined polygon shape
					strokeColor: '#000000',
					strokeOpacity: 0,
					strokeWeight: 2,
					fillColor: '#000000',
					fillOpacity: 0.8,
					mouseover: function(){
							this.setOptions({strokeOpacity: 1});
							$sc.update(this.name);
						},
					mouseout: function(){this.setOptions({strokeOpacity: 0})}
				}));
			}
		};


		$sc.updateMap = function(currentYear){
			for (var j = 0; j < $sc.TLempleo.length; j++) {
				if ($sc.TLempleo[j].fecha === currentYear) {
					var prov =  $sc.TLempleo[j].provincia;
					var nroSector =  $sc.TLempleo[j].sector;
				 	for (var i = 0; i < $sc.sector.length; i++) {
						if(nroSector === $sc.sector[i].id){
							var nbrSector = $sc.sector[i].abv;
							var color = $sc.colorSelect(nbrSector);
							for (var k = 0; k < $sc.provPaths.length; k++) {
								if(prov === $sc.provPaths[k].name){
									$sc.polygons[k].setOptions({fillColor: color});
								}
							}
						}
					}
				}
			}
	 		$sc.updateRanking();
		}	


		$sc.updateRanking = function(){
			var sectorList = [];
			var nroSector;
			for (var j = 0; j < $sc.TLempleo.length; j++) {
				if ($sc.TLempleo[j].fecha === $sc.currentYear) {
					nroSector =  parseInt($sc.TLempleo[j].sector);
					sectorList.push(nroSector);
				}
			}

            var a = [], b = [], c = [], d = [], prev;
            sectorList.sort();
            for ( var i = 0; i < sectorList.length; i++ ) {
                if ( sectorList[i] !== prev ) {
                    a.push(sectorList[i]);
                    b.push(1);
                } else {
                    b[b.length-1]++;
                }
                prev = sectorList[i];
            }


            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < $sc.sector.length; j++) {
                    if(a[i] === parseInt($sc.sector[j].id)){
                        c.push($sc.sector[j].abv);
                        d.push($sc.colorSelect($sc.sector[j].abv));
                    } 
                }
            }

			var sectorCountList = [];
			for (var i = 0; i < a.length; i++) {
				sectorCountList.push({
					name: c[i],
					count: b[i],
                    color: d[i]
				});
			}

            var aux={};
            //recorreremos todos los elementos hasta n-1
            for(var i=0;i<(sectorCountList.length-1);i++){
                //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
                for(var j=0;j<(sectorCountList.length - 1);j++){
                    //comparamos
                    if(sectorCountList[j].count<sectorCountList[j+1].count){
                        //guardamos el numero mayor en el auxiliar
                        aux=sectorCountList[j];
                           // console.log(aux);
                        //guardamos el numero menor en el lugar correspondiente
                        sectorCountList[j]=sectorCountList[j+1];
                        //asignamos el auxiliar en el lugar correspondiente
                        sectorCountList[j+1]=aux;
                           // console.log(aux);
                    }
                }
            }

			//console.log(sectorCountList);
            $sc.rankedList = sectorCountList;
		};	

	}]);
})();