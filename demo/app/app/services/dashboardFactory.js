var app = angular.module('app.services')
/*Configuracion de las request para que los post sean directos*/
app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
});
/**/
app.factory('dashboardFactory', ['$http', function($http){ 
    var dashboard ={},
        img = '',
        prov = '',
        provData,
        scatterEmpleo = [],
        scatterExport = [],
        empleo = [],
        exportacion = [],
        empleoLegend = [];

	dashboard.setImg = function(data){		
		img = data;
    };
    dashboard.setProv = function(data){     
        prov = data;
    };
    dashboard.getImg = function(){     
       return img;
    };
    dashboard.getProv = function(){
        return prov;
    };
    dashboard.getProvData = function(data){
        return $http.post('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerDatosProv.php',data);
    };
    dashboard.getSectorData = function(){
        return $http.get('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerDatosSect.php');
    };
    dashboard.getRubroData = function(){
        return $http.get('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerDatosRubro.php');
    };
    dashboard.getNombreProv = function(data){
        return $http.post('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerNombreProv.php',data);
    };
    dashboard.setProvData = function(data){
        $cacheFactory('provData', options)
        provData = data
    };
    dashboard.getDashData = function(){
        return provData;
    }
    dashboard.setScatterEmpleo = function(data){
        scatterEmpleo = data;
    }
    dashboard.setScatterExport = function(data){
        scatterExport = data;
    }
    dashboard.setEmpleo = function(data){
        empleo = data;
    }
    dashboard.setExportacion = function(data){
        exportacion = data;
    }
    dashboard.setEmpleoLegend = function(data){
        empleoLegend = data;
    }
    dashboard.getScatterEmpleo = function(){
        return scatterEmpleo;
    }
    dashboard.getScatterExport = function(){
        return scatterExport;
    }
    dashboard.getEmpleo = function(){
        return empleo;
    }
    dashboard.getExportacion = function(){
        return exportacion;
    }
    dashboard.getEmpleoLegend = function(){
        return empleoLegend;
    }
    dashboard.getAllData = function(){
        return $http.get('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerAllData.php');
    }
    dashboard.getDatosGenerales = function(data){
        return $http.post('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerDatosGenerales.php',data);
    }
    dashboard.getDatosGeneralesSector = function(data){
        return $http.post('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerDatosGeneralesSector.php',data);
    }
    /* FIX-29/08/2016 para adaptar datos ficticios en los scatter */
    dashboard.getScatterProvData = function(data){
        return $http.post('http://www.oixxio.net/mProduccion/app/api/dashboard/obtenerDatosScatterProvFake.php',data);
    }
    /* END FIX-29/08/2016 para adaptar datos ficticios en los scatter */    
	return dashboard;
}]);