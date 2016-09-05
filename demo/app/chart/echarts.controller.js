(function () {
    'use strict';

    angular.module('app.chart')
        .controller('EChartsCtrl', ['$rootScope','$location', '$route', '$scope', '$timeout', 'dashboardFactory','sectorFactory','$window', EChartsCtrl])


    function EChartsCtrl($rootScope, $location, $route, $scope, $timeout,dashboardFactory,sectorFactory,$window) {


    $scope.goTo = function(data){
        $location.path(data);
    }
    console.log($rootScope.chartFullScreen);
    $scope.goChartFullScreen = function (options, type, category) {
        $rootScope.chartFullScreen = {};
        if (type == 'treemap') {
            $rootScope.show = false;
        } else {
            $rootScope.show = true;
        }
        $rootScope.category = category;
        $rootScope.chartFullScreen.options = options;

        $timeout(function () {$location.path('page/chartFullScreen');}, 500);
    }    

    //INIT OPTIONS DATA
        //Provincia EMPLEO
        $scope.treemap = {};    //treemap (empleoData)
        $scope.scatter1 = {};   //scatter (scatterEmpleoData)
        //Provincia EXPORTACION
        $scope.funnel1 = {};    //treemap (exportacionData)
        $scope.line4 = {};      //scatter (scatterExportData)

        //Sector EMPLEO
        $scope.line2 = {};      //treemap (empleoSectorData)
        $scope.line1 = {};      //scatter (scatterEmpleoSectorData)
        //Sector EXPORTACION
        $scope.line3 = {};      //treemap (exportacionSectorData)
        $scope.bar1 = {};       //scatter (scatterExportSectorData)


    //SACA DATOS DEL LOCAL STORAGE
        //Provincia EMPLEO
        var empleoData = JSON.parse(localStorage.getItem('empleoData'))
        var scatterEmpleoData = JSON.parse(localStorage.getItem('empleoScatter'))
        //Provincia EXPORTACION
        var exportacionData = JSON.parse(localStorage.getItem('exportData'))
        var scatterExportData = JSON.parse(localStorage.getItem('exportScatter'))

        //Sector EMPLEO
        var empleoSectorData = JSON.parse(localStorage.getItem('empleoDataSect'))
        var scatterEmpleoSectorData = JSON.parse(localStorage.getItem('empleoScatterSect'))
        //Sector EXPORTACION
        var exportacionSectorData = JSON.parse(localStorage.getItem('exportDataSect'))
        var scatterExportSectorData = JSON.parse(localStorage.getItem('exportScatterSect'))


    //MAGIA PARA LOS COLORES DE LOS TREEMAPS
        var empleoLegend = dashboardFactory.getEmpleoLegend();     
        var colorVar;

        var empleoSectorName;
        if (empleoSectorData) {
            for (var i = 0; i < empleoSectorData.length; i++) {    
                empleoSectorName = empleoSectorData[i].name.replace(/[^a-zA-Z. ]/g, "");
                switch (empleoSectorName) {
                    case "Buenos Aires":
                        empleoSectorData[i].itemStyle.normal.color = '#34e3e5'
                         break;
                    case 'CABA':
                         empleoSectorData[i].itemStyle.normal.color = '#b6a2de';
                         break;
                    case 'Catamarca':
                         empleoSectorData[i].itemStyle.normal.color = '#5ab1ef';
                         break;
                    case 'Chaco':
                         empleoSectorData[i].itemStyle.normal.color = '#ffb980';
                         break;
                    case 'Chubut':
                        empleoSectorData[i].itemStyle.normal.color = '#f28c93';
                                 break;
                    case 'Crdoba':                     
                         empleoSectorData[i].itemStyle.normal.color = '#b6c2e1';
                         break;
                    case 'Corrientes':
                         empleoSectorData[i].itemStyle.normal.color = '#e5cf0d';
                         break;
                    case 'Entre Ros':
                         empleoSectorData[i].itemStyle.normal.color = '#b2d563';
                         break;
                    case 'Formosa':
                         empleoSectorData[i].itemStyle.normal.color = '#2ec7c9';
                         break;
                    case 'Jujuy':
                         empleoSectorData[i].itemStyle.normal.color = '#51a0d8';
                         break;
                    case 'La Pampa':
                         empleoSectorData[i].itemStyle.normal.color = '#dda06f';
                         break;
                    case 'La Rioja':
                         empleoSectorData[i].itemStyle.normal.color = '#d87a80';
                         break;
                    case 'Mendoza':
                         empleoSectorData[i].itemStyle.normal.color = '#8d98b3';
                         break;
                    case 'Misiones':
                         empleoSectorData[i].itemStyle.normal.color = '#ccb80c';
                         break;
                    case 'Neuquen':
                        empleoSectorData[i].itemStyle.normal.color = '#97b552'
                        break;
                    case 'Ro Negro':
                         empleoSectorData[i].itemStyle.normal.color = '#29afb1';
                         break;
                    case 'Salta':
                         empleoSectorData[i].itemStyle.normal.color = '#83759f';
                         break;
                    case 'San Juan':
                         empleoSectorData[i].itemStyle.normal.color = '#417fac';
                         break;
                    case 'San Luis':
                         empleoSectorData[i].itemStyle.normal.color = '#b5845c';
                         break;
                    case 'Santa Cruz':
                         empleoSectorData[i].itemStyle.normal.color = '#b5676c';
                         break;
                    case 'Santa Fe':
                         empleoSectorData[i].itemStyle.normal.color = '#767f95';
                         break;
                    case 'Santiago del Estero':
                         empleoSectorData[i].itemStyle.normal.color = '#ae9d0b';
                         break;
                    case 'Tierra del Fuego':
                         empleoSectorData[i].itemStyle.normal.color = '#7f9846';
                         break;
                    case 'Tucumn':
                         empleoSectorData[i].itemStyle.normal.color = '#208a8b';
                         break;
                    default:
                        empleoSectorData[i].itemStyle.normal.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                         break;
                };
            }
        }
        var exportSectorName;
        if (exportacionSectorData) {
            for (var i = 0; i < exportacionSectorData.length; i++) {   
                exportSectorName = exportacionSectorData[i].name.replace(/[^a-zA-Z. ]/g, "");
                switch (exportSectorName) {
                    case "Buenos Aires":
                        exportacionSectorData[i].itemStyle.normal.color = '#34e3e5'
                         break;
                    case 'CABA':
                         exportacionSectorData[i].itemStyle.normal.color = '#b6a2de';
                         break;
                    case 'Catamarca':
                         exportacionSectorData[i].itemStyle.normal.color = '#5ab1ef';
                         break;
                    case 'Chaco':
                         exportacionSectorData[i].itemStyle.normal.color = '#ffb980';
                         break;
                    case 'Chubut':
                        exportacionSectorData[i].itemStyle.normal.color = '#f28c93';
                                 break;
                    case 'Crdoba':                     
                         exportacionSectorData[i].itemStyle.normal.color = '#b6c2e1';
                         break;
                    case 'Corrientes':
                         exportacionSectorData[i].itemStyle.normal.color = '#e5cf0d';
                         break;
                    case 'Entre Ros':
                         exportacionSectorData[i].itemStyle.normal.color = '#b2d563';
                         break;
                    case 'Formosa':
                         exportacionSectorData[i].itemStyle.normal.color = '#2ec7c9';
                         break;
                    case 'Jujuy':
                         exportacionSectorData[i].itemStyle.normal.color = '#51a0d8';
                         break;
                    case 'La Pampa':
                         exportacionSectorData[i].itemStyle.normal.color = '#dda06f';
                         break;
                    case 'La Rioja':
                         exportacionSectorData[i].itemStyle.normal.color = '#d87a80';
                         break;
                    case 'Mendoza':
                         exportacionSectorData[i].itemStyle.normal.color = '#8d98b3';
                         break;
                    case 'Misiones':
                         exportacionSectorData[i].itemStyle.normal.color = '#ccb80c';
                         break;
                    case 'Neuquen':
                        exportacionSectorData[i].itemStyle.normal.color = '#97b552'
                        break;
                    case 'Ro Negro':
                         exportacionSectorData[i].itemStyle.normal.color = '#29afb1';
                         break;
                    case 'Salta':
                         exportacionSectorData[i].itemStyle.normal.color = '#83759f';
                         break;
                    case 'San Juan':
                         exportacionSectorData[i].itemStyle.normal.color = '#417fac';
                         break;
                    case 'San Luis':
                         exportacionSectorData[i].itemStyle.normal.color = '#b5845c';
                         break;
                    case 'Santa Cruz':
                         exportacionSectorData[i].itemStyle.normal.color = '#b5676c';
                         break;
                    case 'Santa Fe':
                         exportacionSectorData[i].itemStyle.normal.color = '#767f95';
                         break;
                    case 'Santiago del Estero':
                         exportacionSectorData[i].itemStyle.normal.color = '#ae9d0b';
                         break;
                    case 'Tierra del Fuego':
                         exportacionSectorData[i].itemStyle.normal.color = '#7f9846';
                         break;
                    case 'Tucumn':
                         exportacionSectorData[i].itemStyle.normal.color = '#208a8b';
                         break;
                    default:
                        exportacionSectorData[i].itemStyle.normal.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                         break;
                };
            }
        }
        var empleoName = {}; 
        if (empleoData) {
            for (var i = 0; i < empleoData.length; i++) {
                for (var j = 0; j < empleoData[i].children.length; j++) {
                    empleoName = empleoData[i].children[j].name.replace(/[^a-zA-Z. ]/g, "");
                    switch (empleoName) {
                        case "Buenos Aires":
                            empleoData[i].children[j].itemStyle.normal.color = '#34e3e5'
                             break;
                        case 'CABA':
                             empleoData[i].children[j].itemStyle.normal.color = '#b6a2de';
                             break;
                        case 'Catamarca':
                             empleoData[i].children[j].itemStyle.normal.color = '#5ab1ef';
                             break;
                        case 'Chaco':
                             empleoData[i].children[j].itemStyle.normal.color = '#ffb980';
                             break;
                        case 'Chubut':
                            empleoData[i].children[j].itemStyle.normal.color = '#f28c93';
                                     break;
                        case 'Crdoba':                     
                             empleoData[i].children[j].itemStyle.normal.color = '#b6c2e1';
                             break;
                        case 'Corrientes':
                             empleoData[i].children[j].itemStyle.normal.color = '#e5cf0d';
                             break;
                        case 'Entre Ros':
                             empleoData[i].children[j].itemStyle.normal.color = '#b2d563';
                             break;
                        case 'Formosa':
                             empleoData[i].children[j].itemStyle.normal.color = '#2ec7c9';
                             break;
                        case 'Jujuy':
                             empleoData[i].children[j].itemStyle.normal.color = '#51a0d8';
                             break;
                        case 'La Pampa':
                             empleoData[i].children[j].itemStyle.normal.color = '#dda06f';
                             break;
                        case 'La Rioja':
                             empleoData[i].children[j].itemStyle.normal.color = '#d87a80';
                             break;
                        case 'Mendoza':
                             empleoData[i].children[j].itemStyle.normal.color = '#8d98b3';
                             break;
                        case 'Misiones':
                             empleoData[i].children[j].itemStyle.normal.color = '#ccb80c';
                             break;
                        case 'Neuquen':
                            empleoData[i].children[j].itemStyle.normal.color = '#97b552'
                            break;
                        case 'Ro Negro':
                             empleoData[i].children[j].itemStyle.normal.color = '#29afb1';
                             break;
                        case 'Salta':
                             empleoData[i].children[j].itemStyle.normal.color = '#83759f';
                             break;
                        case 'San Juan':
                             empleoData[i].children[j].itemStyle.normal.color = '#417fac';
                             break;
                        case 'San Luis':
                             empleoData[i].children[j].itemStyle.normal.color = '#b5845c';
                             break;
                        case 'Santa Cruz':
                             empleoData[i].children[j].itemStyle.normal.color = '#b5676c';
                             break;
                        case 'Santa Fe':
                             empleoData[i].children[j].itemStyle.normal.color = '#767f95';
                             break;
                        case 'Santiago del Estero':
                             empleoData[i].children[j].itemStyle.normal.color = '#ae9d0b';
                             break;
                        case 'Tierra del Fuego':
                             empleoData[i].children[j].itemStyle.normal.color = '#7f9846';
                             break;
                        case 'Tucumn':
                             empleoData[i].children[j].itemStyle.normal.color = '#208a8b';
                             break;
                        case 'Agricultura y ganaderia':
                            empleoData[i].children[j].itemStyle.normal.color = '#34e3e5';
                        break;
                        case 'Silvicultura, extraccin de madera':
                            empleoData[i].children[j].itemStyle.normal.color = '#b6a2de';
                        break;
                        case 'Pesca':
                            empleoData[i].children[j].itemStyle.normal.color = '#5ab1ef';
                        break;
                        case 'Carbn y lignito':
                            empleoData[i].children[j].itemStyle.normal.color = '#ffb980';
                        break;
                        case 'Petrleo crudo y gas':
                            empleoData[i].children[j].itemStyle.normal.color = '#f28c93';
                        break;
                        case 'Minerales metaliferos':
                            empleoData[i].children[j].itemStyle.normal.color = '#b6c2e1';
                        break;
                        case 'Explotacin de otras minas y canteras':
                            empleoData[i].children[j].itemStyle.normal.color = '#e5cf0d';
                        break;
                        case 'Alimentos':
                            empleoData[i].children[j].itemStyle.normal.color = '#b2d563';
                        break;
                        case 'Tabaco':
                            empleoData[i].children[j].itemStyle.normal.color = '#2ec7c9';
                        break;
                        case 'Textiles':
                            empleoData[i].children[j].itemStyle.normal.color = '#9888b9';
                        break;
                        case 'Confeccin':
                            empleoData[i].children[j].itemStyle.normal.color = '#51a0d8';
                        break;
                        case 'Calzado y cuero':
                            empleoData[i].children[j].itemStyle.normal.color = '#dda06f';
                        break;
                        case 'Madera':
                            empleoData[i].children[j].itemStyle.normal.color = '#d87a80';
                        break;
                        case 'Papel':
                            empleoData[i].children[j].itemStyle.normal.color = '#8d98b3';
                        break;
                        case 'Edicin e impresin':
                            empleoData[i].children[j].itemStyle.normal.color = '#ccb80c';
                        break;
                        case 'Productos de petrleo':
                            empleoData[i].children[j].itemStyle.normal.color = '#97b552';
                        break;
                        case 'Quimicos':
                            empleoData[i].children[j].itemStyle.normal.color = '#29afb1';
                        break;
                        case 'Caucho y plstico':
                            empleoData[i].children[j].itemStyle.normal.color = '#83759f';
                        break;
                        case 'Otros minerales no metlicos':
                            empleoData[i].children[j].itemStyle.normal.color = '#417fac';
                        break;
                        case 'Metales comunes':
                            empleoData[i].children[j].itemStyle.normal.color = '#b5845c';
                        break;
                        case 'Otros productos de metal':
                            empleoData[i].children[j].itemStyle.normal.color = '#b5676c';
                        break;
                        case 'Maquinaria y equipo':
                            empleoData[i].children[j].itemStyle.normal.color = '#767f95';
                        break;
                        case 'Maquinaria de oficina':
                            empleoData[i].children[j].itemStyle.normal.color = '#ae9d0b';
                        break;
                        case 'Aparatos elctricos':
                            empleoData[i].children[j].itemStyle.normal.color = '#7f9846';
                        break;
                        case 'Radio y televisin':
                            
                            empleoData[i].children[j].itemStyle.normal.color = '#208a8b';
                        break;
                        case 'Instrumentos mdicos':
                            empleoData[i].children[j].itemStyle.normal.color = '#615775';
                        break;
                        case 'Automotores':
                            empleoData[i].children[j].itemStyle.normal.color = '#316082';
                        break;
                        case 'Otros equipos de transporte':
                            empleoData[i].children[j].itemStyle.normal.color = '#876243';
                        break;
                        case 'Muebles':
                            empleoData[i].children[j].itemStyle.normal.color = '#925357';
                        break;
                        case 'Reciclamiento':
                            empleoData[i].children[j].itemStyle.normal.color = '#596071';
                        break;
                        case 'Electricidad gas y agua':
                            empleoData[i].children[j].itemStyle.normal.color = '#867909';
                        break;
                        case 'Distribucion de agua':
                            empleoData[i].children[j].itemStyle.normal.color = '#627536';
                        break;
                        case 'Construccin':
                            empleoData[i].children[j].itemStyle.normal.color = '#34e3e5';
                        break;
                        case 'Vta. y reparación de vehículos':
                            empleoData[i].children[j].itemStyle.normal.color = '#34e3e5';
                        break;
                        case 'Comercio al por mayor':
                            empleoData[i].children[j].itemStyle.normal.color = '#b6a2de';
                        break;
                        case 'Comercio al por menor':
                            empleoData[i].children[j].itemStyle.normal.color = '#5ab1ef';
                        break;
                        case 'Hoteleria y restaurantes':
                            empleoData[i].children[j].itemStyle.normal.color = '#ffb980';
                        break;
                        case 'Transporte ferroviario y automotor':
                            empleoData[i].children[j].itemStyle.normal.color = '#f28c93';
                        break;
                        case 'Transporte maritimo y fluvial':
                            empleoData[i].children[j].itemStyle.normal.color = '#b6c2e1';
                        break;
                        case 'Transporte aereo':
                            empleoData[i].children[j].itemStyle.normal.color = '#e5cf0d';
                        break;
                        case 'Manipulacin de carga':
                            empleoData[i].children[j].itemStyle.normal.color = '#b2d563';
                        break;
                        case 'Telecomunicaciones y correos':
                            empleoData[i].children[j].itemStyle.normal.color = '#2ec7c9';
                        break;
                        case 'Intermediacin financiera':
                            empleoData[i].children[j].itemStyle.normal.color = '#9888b9';
                        break;
                        case 'Seguros':
                            empleoData[i].children[j].itemStyle.normal.color = '#51a0d8';
                        break;
                        case 'Ss. auxiliares a la act. financiera':
                            empleoData[i].children[j].itemStyle.normal.color = '#dda06f';
                        break;
                        case 'Inmobiliarios':
                            empleoData[i].children[j].itemStyle.normal.color = '#d87a80';
                        break;
                        case 'Alquiler de transporte y de maquinaria':
                            empleoData[i].children[j].itemStyle.normal.color = '#8d98b3';
                        break;
                        case 'Informatica':
                            empleoData[i].children[j].itemStyle.normal.color = '#ccb80c';
                        break;
                        case 'I + D':
                            empleoData[i].children[j].itemStyle.normal.color = '#97b552';
                        break;
                        case 'Ss. jurídicos y contables':
                            empleoData[i].children[j].itemStyle.normal.color = '#29afb1';
                        break;
                        case 'Agencias de empleo':
                            empleoData[i].children[j].itemStyle.normal.color = '#83759f';
                        break;
                        case 'Enseanza':
                            empleoData[i].children[j].itemStyle.normal.color = '#417fac';
                        break;
                        case 'Servicios sociales y de salud':
                            empleoData[i].children[j].itemStyle.normal.color = '#b5845c';
                        break;
                        case 'Eliminacin de desperdicios':
                            empleoData[i].children[j].itemStyle.normal.color = '#767f95';
                        break;
                        case 'Ss. de organizaciones empresariales':
                            empleoData[i].children[j].itemStyle.normal.color = '#ae9d0b';
                        break;
                        case 'Ss culturales, deportivos':
                            empleoData[i].children[j].itemStyle.normal.color = '#7f9846';
                        break;
                        case 'Ss. n.c.p.':
                            empleoData[i].children[j].itemStyle.normal.color = '#208a8b';
                        break;
                        default:
                            empleoData[i].children[j].itemStyle.normal.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                             break;
                    };
                }
            }
        }
        var exportName;
        if (exportacionData) {
            for (var i = 0; i < exportacionData.length; i++) {
                for (var j = 0; j < exportacionData[i].children.length; j++) {
                    exportName = exportacionData[i].children[j].name.replace(/[^a-zA-Z. ]/g, "");
                    switch (exportName) {
                        case "Buenos Aires":
                            exportacionData[i].children[j].itemStyle.normal.color = '#34e3e5'
                             break;
                        case 'CABA':
                             exportacionData[i].children[j].itemStyle.normal.color = '#b6a2de';
                             break;
                        case 'Catamarca':
                             exportacionData[i].children[j].itemStyle.normal.color = '#5ab1ef';
                             break;
                        case 'Chaco':
                             exportacionData[i].children[j].itemStyle.normal.color = '#ffb980';
                             break;
                        case 'Chubut':
                            exportacionData[i].children[j].itemStyle.normal.color = '#f28c93';
                                     break;
                        case 'Crdoba':                     
                             exportacionData[i].children[j].itemStyle.normal.color = '#b6c2e1';
                             break;
                        case 'Corrientes':
                             exportacionData[i].children[j].itemStyle.normal.color = '#e5cf0d';
                             break;
                        case 'Entre Ros':
                             exportacionData[i].children[j].itemStyle.normal.color = '#b2d563';
                             break;
                        case 'Formosa':
                             exportacionData[i].children[j].itemStyle.normal.color = '#2ec7c9';
                             break;
                        case 'Jujuy':
                             exportacionData[i].children[j].itemStyle.normal.color = '#51a0d8';
                             break;
                        case 'La Pampa':
                             exportacionData[i].children[j].itemStyle.normal.color = '#dda06f';
                             break;
                        case 'La Rioja':
                             exportacionData[i].children[j].itemStyle.normal.color = '#d87a80';
                             break;
                        case 'Mendoza':
                             exportacionData[i].children[j].itemStyle.normal.color = '#8d98b3';
                             break;
                        case 'Misiones':
                             exportacionData[i].children[j].itemStyle.normal.color = '#ccb80c';
                             break;
                        case 'Neuquen':
                            exportacionData[i].children[j].itemStyle.normal.color = '#97b552'
                            break;
                        case 'Ro Negro':
                             exportacionData[i].children[j].itemStyle.normal.color = '#29afb1';
                             break;
                        case 'Salta':
                             exportacionData[i].children[j].itemStyle.normal.color = '#83759f';
                             break;
                        case 'San Juan':
                             exportacionData[i].children[j].itemStyle.normal.color = '#417fac';
                             break;
                        case 'San Luis':
                             exportacionData[i].children[j].itemStyle.normal.color = '#b5845c';
                             break;
                        case 'Santa Cruz':
                             exportacionData[i].children[j].itemStyle.normal.color = '#b5676c';
                             break;
                        case 'Santa Fe':
                             exportacionData[i].children[j].itemStyle.normal.color = '#767f95';
                             break;
                        case 'Santiago del Estero':
                             exportacionData[i].children[j].itemStyle.normal.color = '#ae9d0b';
                             break;
                        case 'Tierra del Fuego':
                             exportacionData[i].children[j].itemStyle.normal.color = '#7f9846';
                             break;
                        case 'Tucumn':
                             exportacionData[i].children[j].itemStyle.normal.color = '#208a8b';
                             break;
                        case 'Agricultura y ganaderia':
                            exportacionData[i].children[j].itemStyle.normal.color = '#34e3e5';
                        break;
                        case 'Silvicultura, extraccin de madera':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b6a2de';
                        break;
                        case 'Pesca':
                            exportacionData[i].children[j].itemStyle.normal.color = '#5ab1ef';
                        break;
                        case 'Carbn y lignito':
                            exportacionData[i].children[j].itemStyle.normal.color = '#ffb980';
                        break;
                        case 'Petrleo crudo y gas':
                            exportacionData[i].children[j].itemStyle.normal.color = '#f28c93';
                        break;
                        case 'Minerales metaliferos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b6c2e1';
                        break;
                        case 'Explotacin de otras minas y canteras':
                            exportacionData[i].children[j].itemStyle.normal.color = '#e5cf0d';
                        break;
                        case 'Alimentos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b2d563';
                        break;
                        case 'Tabaco':
                            exportacionData[i].children[j].itemStyle.normal.color = '#2ec7c9';
                        break;
                        case 'Textiles':
                            exportacionData[i].children[j].itemStyle.normal.color = '#9888b9';
                        break;
                        case 'Confeccin':
                            exportacionData[i].children[j].itemStyle.normal.color = '#51a0d8';
                        break;
                        case 'Calzado y cuero':
                            exportacionData[i].children[j].itemStyle.normal.color = '#dda06f';
                        break;
                        case 'Madera':
                            exportacionData[i].children[j].itemStyle.normal.color = '#d87a80';
                        break;
                        case 'Papel':
                            exportacionData[i].children[j].itemStyle.normal.color = '#8d98b3';
                        break;
                        case 'Edicin e impresin':
                            exportacionData[i].children[j].itemStyle.normal.color = '#ccb80c';
                        break;
                        case 'Productos de petrleo':
                            exportacionData[i].children[j].itemStyle.normal.color = '#97b552';
                        break;
                        case 'Quimicos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#29afb1';
                        break;
                        case 'Caucho y plstico':
                            exportacionData[i].children[j].itemStyle.normal.color = '#83759f';
                        break;
                        case 'Otros minerales no metlicos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#417fac';
                        break;
                        case 'Metales comunes':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b5845c';
                        break;
                        case 'Otros productos de metal':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b5676c';
                        break;
                        case 'Maquinaria y equipo':
                            exportacionData[i].children[j].itemStyle.normal.color = '#767f95';
                        break;
                        case 'Maquinaria de oficina':
                            exportacionData[i].children[j].itemStyle.normal.color = '#ae9d0b';
                        break;
                        case 'Aparatos elctricos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#7f9846';
                        break;
                        case 'Radio y televisin':
                            
                            exportacionData[i].children[j].itemStyle.normal.color = '#208a8b';
                        break;
                        case 'Instrumentos mdicos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#615775';
                        break;
                        case 'Automotores':
                            exportacionData[i].children[j].itemStyle.normal.color = '#316082';
                        break;
                        case 'Otros equipos de transporte':
                            exportacionData[i].children[j].itemStyle.normal.color = '#876243';
                        break;
                        case 'Muebles':
                            exportacionData[i].children[j].itemStyle.normal.color = '#925357';
                        break;
                        case 'Reciclamiento':
                            exportacionData[i].children[j].itemStyle.normal.color = '#596071';
                        break;
                        case 'Electricidad gas y agua':
                            exportacionData[i].children[j].itemStyle.normal.color = '#867909';
                        break;
                        case 'Distribucion de agua':
                            exportacionData[i].children[j].itemStyle.normal.color = '#627536';
                        break;
                        case 'Construccin':
                            exportacionData[i].children[j].itemStyle.normal.color = '#34e3e5';
                        break;
                        case 'Vta. y reparación de vehículos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#34e3e5';
                        break;
                        case 'Comercio al por mayor':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b6a2de';
                        break;
                        case 'Comercio al por menor':
                            exportacionData[i].children[j].itemStyle.normal.color = '#5ab1ef';
                        break;
                        case 'Hoteleria y restaurantes':
                            exportacionData[i].children[j].itemStyle.normal.color = '#ffb980';
                        break;
                        case 'Transporte ferroviario y automotor':
                            exportacionData[i].children[j].itemStyle.normal.color = '#f28c93';
                        break;
                        case 'Transporte maritimo y fluvial':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b6c2e1';
                        break;
                        case 'Transporte aereo':
                            exportacionData[i].children[j].itemStyle.normal.color = '#e5cf0d';
                        break;
                        case 'Manipulacin de carga':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b2d563';
                        break;
                        case 'Telecomunicaciones y correos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#2ec7c9';
                        break;
                        case 'Intermediacin financiera':
                            exportacionData[i].children[j].itemStyle.normal.color = '#9888b9';
                        break;
                        case 'Seguros':
                            exportacionData[i].children[j].itemStyle.normal.color = '#51a0d8';
                        break;
                        case 'Ss. auxiliares a la act. financiera':
                            exportacionData[i].children[j].itemStyle.normal.color = '#dda06f';
                        break;
                        case 'Inmobiliarios':
                            exportacionData[i].children[j].itemStyle.normal.color = '#d87a80';
                        break;
                        case 'Alquiler de transporte y de maquinaria':
                            exportacionData[i].children[j].itemStyle.normal.color = '#8d98b3';
                        break;
                        case 'Informatica':
                            exportacionData[i].children[j].itemStyle.normal.color = '#ccb80c';
                        break;
                        case 'I + D':
                            exportacionData[i].children[j].itemStyle.normal.color = '#97b552';
                        break;
                        case 'Ss. jurídicos y contables':
                            exportacionData[i].children[j].itemStyle.normal.color = '#29afb1';
                        break;
                        case 'Agencias de empleo':
                            exportacionData[i].children[j].itemStyle.normal.color = '#83759f';
                        break;
                        case 'Enseanza':
                            exportacionData[i].children[j].itemStyle.normal.color = '#417fac';
                        break;
                        case 'Servicios sociales y de salud':
                            exportacionData[i].children[j].itemStyle.normal.color = '#b5845c';
                        break;
                        case 'Eliminacin de desperdicios':
                            exportacionData[i].children[j].itemStyle.normal.color = '#767f95';
                        break;
                        case 'Ss. de organizaciones empresariales':
                            exportacionData[i].children[j].itemStyle.normal.color = '#ae9d0b';
                        break;
                        case 'Ss culturales, deportivos':
                            exportacionData[i].children[j].itemStyle.normal.color = '#7f9846';
                        break;
                        case 'Ss. n.c.p.':
                            exportacionData[i].children[j].itemStyle.normal.color = '#208a8b';
                        break;
                        default:
                            exportacionData[i].children[j].itemStyle.normal.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                             break;
                    };
                }
            }
        }
        

    //CONFIGURACION DE OPCIONES

        //Provincia EMPLEO
        //treemap
        $scope.treemap.options = {
            title: {
                show: true,
                text: 'Participación sectorial en empleo provincial (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            tooltip : {
                trigger: 'item',
                position: [0,0],
                formatter: "{b}: {c}%",
                enterable: true
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : false,
            series : [
                {   
                    name: 'Treemap Empleo',
                    type:'treemap',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                                position:'outer',
                                formatter: "{b}"
                            },
                            borderWidth: 1
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data:empleoData
                }
            ]
        };
        //scatter
        /*$scope.scatter1.options = {
            title : {
                text: 'GRAFICO DE DISPERSIÓN',
                
            },
            tooltip : {
                trigger: 'axis',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName + ' :<br/>'
                           + params.value[0] + '%' 
                           + params.value[1] + '%';
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : '
                           + params.value + '%';
                    }
                },  
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            series : scatterEmpleoData
        };*/

        //Provincia EXPORTACION
        //treemap    
        $scope.funnel1.options = {
            title: {
                show: true,
                text: 'Participación sectorial en exportaciones provinciales (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            tooltip : {
                trigger: 'item',
                position: [0,0],
                zlevel: 8,
                formatter: "{b}: {c}%",
                enterable: true
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : false,
            series : [
                {   
                    name: 'Treemap Empleo',
                    type:'treemap',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                                position:'outer',
                                formatter: "{b}"
                            },
                            borderWidth: 1
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: exportacionData
                }
            ]
        };
        //scatter
        /*$scope.line4.options ={
            xAxis:{
                show: true,
                name: 'Part. Exp. Prov.'
            },
            title : {
                text: 'GRAFICO DE DISPERSIÓN',
            },
            tooltip : {
                trigger: 'axis',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName + ' :<br/>'
                           + params.value[0] + '%' 
                           + params.value[1] + '%';
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : '
                           + params.value + '%';
                    }
                },  
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            series : scatterExportData
        }; */
        
        //Sector EMPLEO
        //treemap
        $scope.line2.options = {
            title: {
                show: true,
                text: 'Participación provincial en empleo sectorial (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            tooltip : {
                trigger: 'item',
                position: [0,0],
                zlevel: 8,
                formatter: "{b}: {c}%",
                enterable: true
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : false,
            series : [
                {   
                    name: 'Treemap Empleo',
                    type:'treemap',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                                position:'outer',
                                formatter: "{b}"
                            },
                            borderWidth: 1
                        },
                        emphasis: {
                            
                            label: {
                                show: true
                            }
                        }
                    },
                    data:empleoSectorData
                }
            ]
        };
        //scatter
        /*$scope.line1.options = {
            title : {
                text: 'GRAFICO DE DISPERSIÓN',
            },
            tooltip : {
                trigger: 'axis',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName + ' :<br/>'
                           + params.value[0] + '% ' 
                           + params.value[1]+'%';
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : '
                           + params.value + '%';
                    }
                },  
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value}%'
                    }
                }
            ],
            series : scatterEmpleoSectorData
        };*/

        //Sector EXPORTACION
        //treemap    
        $scope.line3.options = {
            title: {
                show: true,
                text: 'Participación provincial en las exportaciones sectoriales (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            tooltip : {
                trigger: 'item',
                position: [0,0],
                zlevel: 8,
                formatter: "{b}: {c}%",
                enterable: true
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : false,
            series : [
                {   
                    name: 'Treemap Exportación',
                    type:'treemap',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                                position:'outer',
                                formatter: "{b}"
                            },
                            borderWidth: 0.5
                        },
                        emphasis: {
                            label: {
                                show: false
                            }
                        }
                    },
                    data: exportacionSectorData
                }
            ]
        };
        //scatter    
        /*$scope.bar1.options = {
            title : {
                text: 'GRAFICO DE DISPERSIÓN',
            },
            tooltip : {
                trigger: 'axis',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName + ' :<br/>'
                           + params.value[0] + '% ' 
                           + params.value[1]+'%';
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : '
                           + params.value + '%';
                    }
                },  
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value}%'
                    }
                }
            ],
            series : scatterExportSectorData
        };*/
        

        /* FIX-29/08/2016 para adaptar datos ficticios en los scatter */

        var scatterExportSectorDataFake = JSON.parse(localStorage.getItem('exportScatterSectFake'));
        var scatterEmpleoSectorDataFake = JSON.parse(localStorage.getItem('empleoScatterSectFake'));
        var scatterExportProvDataFake = JSON.parse(localStorage.getItem('exportScatterProvFake'));
        var scatterEmpleoProvDataFake = JSON.parse(localStorage.getItem('empleoScatterProvFake'));
//////////////////////////////SCATTER SECTOR EXPORTACION

        //var scatterExportSectorDataFake = JSON.parse(localStorage.getItem('exportScatterSectFake'));
        var scatterCoefEspLine = {
            name: 'Coef Esp', type:'scatter', symbolSize: 0, data: [[0,0]],
            markLine: {
                symbol: ['arrow','arrow'],
                symbolSize: [2,2],
                tooltip: {
                    show: true,
                    formatter: 'Coeficiente<br>de especialización<br>{c}'
                },
                itemStyle: {
                    normal: {
                        lineStyle: { type: 'dotted', width: 2 },
                        label: { show: true, position: 'top', formatter: '{c}' }                               
                    },
                    emphasis: {
                        lineStyle: { width: 2 }
                    }
                },
                data : [[
                        {name: 'Coef Esp 1', value: 1, xAxis: 1, yAxis: 5000},
                        {name: 'Coef Esp 1', xAxis: 1, yAxis: -5000}
                ]]
            }
        }          
        scatterExportSectorDataFake.push(scatterCoefEspLine);
        $scope.bar1.options = {
            title: {
                show: true,
                text: 'Matriz de clasificación de sectores según exportaciones (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            axisPointer:{
                show: false
            },            
            tooltip : {
                trigger: 'item',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName;
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : ' + params.value + '%';
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "recargar"},
                    saveAsImage : {show: true, title: "guardar imagen"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale: true,
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series : scatterExportSectorDataFake
        };
//////////////////////////////END SCATTER SECTOR EXPORTACION

//////////////////////////////SCATTER SECTOR EMPLEO

        //var scatterEmpleoSectorDataFake = JSON.parse(localStorage.getItem('empleoScatterSectFake'));
        var scatterCoefEspLineB = {
            name: 'Coef Esp', type:'scatter', symbolSize: 0, data: [[0,0]],
            markLine: {
                symbol: ['arrow','arrow'],
                symbolSize: [2,2],
                tooltip: {
                    show: true,
                    formatter: 'Coeficiente<br>de especialización<br>{c}'
                },
                itemStyle: {
                    normal: {
                        lineStyle: { type: 'dotted', width: 2 },
                        label: { show: true, position: 'top', formatter: '{c}' }                               
                    },
                    emphasis: {
                        lineStyle: { width: 2 }
                    }
                },
                data : [[
                        {name: 'Coef Esp 1', value: 1, xAxis: 1, yAxis: 5000},
                        {name: 'Coef Esp 1', xAxis: 1, yAxis: -5000}
                ]]
            }
        }          
        scatterEmpleoSectorDataFake.push(scatterCoefEspLineB);
        $scope.line1.options = {
            title: {
                show: true,
                text: 'Matriz de clasificación de sectores según empleo (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            axisPointer:{
                show: false
            },            
            tooltip : {
                trigger: 'item',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName;
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : ' + params.value + '%';
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "recargar"},
                    saveAsImage : {show: true, title: "guardar imagen"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale: true,
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series : scatterEmpleoSectorDataFake
        };
//////////////////////////////END SCATTER SECTOR EMPLEO

//////////////////////////////SCATTER Prov EXPORTACION

        //var scatterExportProvDataFake = JSON.parse(localStorage.getItem('exportScatterProvFake'));
        var scatterCoefEspLineC = {
            name: 'Coef Esp', type:'scatter', symbolSize: 0, data: [[0,0]],
            markLine: {
                symbol: ['arrow','arrow'],
                symbolSize: [2,2],
                tooltip: {
                    show: true,
                    formatter: 'Coeficiente<br>de especialización<br>{c}'
                },
                itemStyle: {
                    normal: {
                        lineStyle: { type: 'dotted', width: 2 },
                        label: { show: true, position: 'top', formatter: '{c}' }                               
                    },
                    emphasis: {
                        lineStyle: { width: 2 }
                    }
                },
                data : [[
                        {name: 'Coef Esp 1', value: 1, xAxis: 1, yAxis: 50000},
                        {name: 'Coef Esp 1', xAxis: 1, yAxis: -50000}
                ]]
            }
        }          
        scatterExportProvDataFake.push(scatterCoefEspLineC);
        $scope.line4.options = {
            title: {
                show: true,
                text: 'Matriz de clasificación de provincias según exportaciones (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            axisPointer:{
                show: false
            },            
            tooltip : {
                trigger: 'item',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName;
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : ' + params.value + '%';
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "recargar"},
                    saveAsImage : {show: true, title: "guardar imagen"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale: true,
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series : scatterExportProvDataFake
        };
//////////////////////////////END SCATTER Prov EXPORTACION

//////////////////////////////SCATTER Prov EMPLEO

        //var scatterEmpleoProvDataFake = JSON.parse(localStorage.getItem('empleoScatterProvFake'));
        var scatterCoefEspLineD = {
            name: 'Coef Esp', type:'scatter', symbolSize: 0, data: [[0,0]],
            markLine: {
                symbol: ['arrow','arrow'],
                symbolSize: [2,2],
                tooltip: {
                    show: true,
                    formatter: 'Coeficiente<br>de especialización<br>{c}'
                },
                itemStyle: {
                    normal: {
                        lineStyle: { type: 'dotted', width: 2 },
                        label: { show: true, position: 'top', formatter: '{c}' }                               
                    },
                    emphasis: {
                        lineStyle: { width: 2 }
                    }
                },
                data : [[
                        {name: 'Coef Esp 1', value: 1, xAxis: 1, yAxis: 50000},
                        {name: 'Coef Esp 1', xAxis: 1, yAxis: -50000}
                ]]
            }
        }          
        scatterEmpleoProvDataFake.push(scatterCoefEspLineD);
        $scope.scatter1.options = {
            title: {
                show: true,
                text: 'Matriz de clasificación de provincias según empleo (2015)',
                textStyle: {
                    fontFamily: 'Gotham',
                    fontSize: 15
                }
            },
            axisPointer:{
                show: false
            },            
            tooltip : {
                trigger: 'item',
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName;
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : ' + params.value + '%';
                    }
                }
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "recargar"},
                    saveAsImage : {show: true, title: "guardar imagen"}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    scale: true,
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series : scatterEmpleoProvDataFake
        };
//////////////////////////////END SCATTER Prov EMPLEO
        /* END FIX-29/08/2016 para adaptar datos ficticios en los scatter */

    }    
})(); 