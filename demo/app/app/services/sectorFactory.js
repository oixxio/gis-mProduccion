angular.module('app.services')
.factory('sectorFactory', ['$http', function($http){ 
    var sector ={},
        sectorId = '',
    	empleo=[],
    	exportacion=[],
    	scatterEmpleo = [],
        scatterExport = [],
    	sectorData=[];
        filter = '';

    sector.setSectorId = function(data){
        sectorId = data;
    }
    sector.setFilter = function (data) {
         filter = data 
    }
    sector.getFilter = function () {
         return filter
    }
    sector.getSector = function(){
    	return $http.post('app/api/dashboard/obtenerNombreSect.php',localStorage.getItem('sectorId'));
    };
    sector.getSectorData = function(){
        return $http.get('app/api/dashboard/obtenerDatosSect.php');
    };
    sector.getRubroData = function(){
        return $http.get('app/api/dashboard/obtenerDatosRubro.php');
    };
    sector.getData = function(data){
    	return $http.post('app/api/dashboard/obtenerDatosDashSector.php',data);	
    }
    sector.getAllProv = function(){
    	return $http.get('app/api/dashboard/obtenerAllprov.php');
    }
    sector.setDashSectorData = function(data){
    	sectorData = data;
    }
    sector.getDashSectorData = function(data){
    	return sectorData;
    }
    sector.setEmpleo = function(data){
        empleo = data;
    }
    sector.getEmpleo = function(){
        return empleo;
    }
    sector.setExportacion = function(data){
        exportacion = data;
    }
    sector.getExportacion = function(data){
       return exportacion;
    }
    sector.setScatterEmpleo = function(data){
    	scatterEmpleo = data;
    }
    sector.getScatterEmpleo = function(){
    	return scatterEmpleo;
    }
    sector.setScatterExport = function(data){
        scatterExport = data;
    }
    sector.getScatterExport = function(){
        return scatterExport;
    }
    return sector;
}]);