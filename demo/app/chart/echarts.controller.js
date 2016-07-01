(function () {
    'use strict';

    angular.module('app.chart')
        .controller('EChartsCtrl', ['$scope', '$timeout', 'dashboardFactory','sectorFactory','$window', EChartsCtrl])

    function EChartsCtrl($scope, $timeout,dashboardFactory,sectorFactory,$window) {
        // Build ECharts with Bar, Line, Pie, Radar, Scatter, Chord, Gauge, Funnel
        //line 1,2,3 estan modificados parafuncionar como scatters y treemaps

        $scope.line1 = {};
        $scope.line2 = {};
        $scope.line3 = {};
        $scope.line4 = {};

        $scope.bar1 = {};
        $scope.bar2 = {};
        $scope.bar3 = {};
        $scope.bar4 = {};
        $scope.bar5 = {};

        $scope.pie1 = {};
        $scope.pie2 = {};
        $scope.pie4 = {};

        $scope.scatter1 = {};
        $scope.scatter2 = {};
        $scope.scatter3 = {};
        $scope.scatter4 = {};

        $scope.radar1 = {};
        $scope.radar2 = {};

        $scope.gauge1 = {};

        $scope.chord1 = {};

        $scope.funnel1 = {};
        $scope.treemap = {};

        var scatterEmpleoData = JSON.parse(localStorage.getItem('empleoScatter'))
        var scatterExportData = JSON.parse(localStorage.getItem('exportScatter'))
        var empleoData = JSON.parse(localStorage.getItem('empleoData'))
        var exportacionData = JSON.parse(localStorage.getItem('exportData'))
        var  scatterEmpleoSectorData = JSON.parse(localStorage.getItem('empleoScatterSect'))
        var scatterExportSectorData = JSON.parse(localStorage.getItem('exportScatterSect')) 
        var  empleoSectorData = JSON.parse(localStorage.getItem('empleoDataSect'))
        var exportacionSectorData = JSON.parse(localStorage.getItem('exportDataSect'))
        var empleoLegend = dashboardFactory.getEmpleoLegend();     
        var colorVar;
      var empleoSectorName  
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
      var exportSectorName
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
    var exportName
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
    

        $scope.line1.options = {
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
        };
        $scope.line2.options = {
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
        $scope.line3.options = {
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
        $scope.line4.options ={
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
        };

        $scope.bar1.options = {
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
                        formatter: '{value} %'
                    }
                }
            ],
            series : scatterExportSectorData
        };
        $scope.bar2.options = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            legend: {
                data:['Direct','Email','Affiliate','Video Ads','Search','Baidu','Google','Bing','Others']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon.','Tue.','Wed.','Thu.','Fri.','Sat.','Sun.']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Direct',
                    type:'bar',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'Email',
                    type:'bar',
                    stack: 'Ads',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'Affiliate',
                    type:'bar',
                    stack: 'Ads',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'Video Ads',
                    type:'bar',
                    stack: 'Ads',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'Search',
                    type:'bar',
                    data:[862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine : {
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    type: 'dashed'
                                }
                            }
                        },
                        data : [
                            [{type : 'min'}, {type : 'max'}]
                        ]
                    }
                },
                {
                    name:'Baidu',
                    type:'bar',
                    barWidth : 5,
                    stack: 'Search',
                    data:[620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name:'Google',
                    type:'bar',
                    stack: 'Search',
                    data:[120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name:'Bing',
                    type:'bar',
                    stack: 'Search',
                    data:[60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name:'Others',
                    type:'bar',
                    stack: 'Search',
                    data:[62, 82, 91, 84, 109, 110, 120]
                }
            ]
        };
        $scope.bar3.options = {
            title : {
                text: 'World Population',
                subtext: 'From the Internet'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['2011', '2012']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'value',
                    boundaryGap : [0, 0.01]
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : ['Brazil','Indonesia','USA','India','China','World Population (10k)']
                }
            ],
            series : [
                {
                    name:'2011',
                    type:'bar',
                    data:[18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name:'2012',
                    type:'bar',
                    data:[19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        };
        $scope.bar4.options = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'
                }
            },
            legend: {
                data:['Direct', 'Email','Affiliate','Video Ads','Search']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'value'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : ['Mon.','Tue.','Wed.','Thu.','Fri.','Sat.','Sun.']
                }
            ],
            series : [
                {
                    name:'Direct',
                    type:'bar',
                    stack: 'Sum',
                    itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                    data:[320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name:'Email',
                    type:'bar',
                    stack: 'Sum',
                    itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'Affiliate',
                    type:'bar',
                    stack: 'Sum',
                    itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'Video Ads',
                    type:'bar',
                    stack: 'Sum',
                    itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                    data:[150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name:'Search',
                    type:'bar',
                    stack: 'Sum',
                    itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                    data:[820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        $scope.bar5.options = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {         
                    type : 'shadow'
                }
            },
            legend: {
                data:['Profit', 'Cost', 'Income']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'value'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : ['Mon.','Tue.','Wed.','Thu.','Fri.','Sat.','Sun.']
                }
            ],
            series : [
                {
                    name:'Profit',
                    type:'bar',
                    itemStyle : { normal: {label : {show: true, position: 'inside'}}},
                    data:[200, 170, 240, 244, 200, 220, 210]
                },
                {
                    name:'Income',
                    type:'bar',
                    stack: 'Sum',
                    barWidth : 5,
                    itemStyle: {normal: {
                        label : {show: true}
                    }},
                    data:[320, 302, 341, 374, 390, 450, 420]
                },
                {
                    name:'Cost',
                    type:'bar',
                    stack: 'Sum',
                    itemStyle: {normal: {
                        label : {show: true, position: 'left'}
                    }},
                    data:[-120, -132, -101, -134, -190, -230, -210]
                }
            ]
        };

        $scope.pie1.options = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data: empleoLegend
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            series : [
                {
                    name:'Sector',
                    type:'pie',
                    radius : '100%',
                    center: ['50%', '60%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '30',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data: empleoData
                }
            ]
        };
        $scope.pie2.options = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:['Direct','Email','Affiliate','Video Ads','Search']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            series : [
                {
                    name:'Traffic source',
                    type:'pie',
                    radius : ['50%', '70%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '30',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {value:335, name:'Direct'},
                        {value:310, name:'Email'},
                        {value:234, name:'Affiliate'},
                        {value:135, name:'Video Ads'},
                        {value:1548, name:'Search'}
                    ]
                }
            ]
        };
        $scope.pie4.options = {
            title : {
                text: 'Nightingale rose diagram',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            series : [
                {
                    name:'Radius model',
                    type:'pie',
                    radius : [20, 110],
                    center : ['25%', 200],
                    roseType : 'radius',
                    width: '40%',       // for funnel
                    max: 40,            // for funnel
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        }
                    },
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                },
                {
                    name:'Area model',
                    type:'pie',
                    radius : [30, 110],
                    center : ['75%', 200],
                    roseType : 'area',
                    x: '50%',               // for funnel
                    max: 40,                // for funnel
                    sort : 'ascending',     // for funnel
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                }
            ]

        };

        $scope.scatter1.options = {
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
        };
        function random(){
            var r = Math.round(Math.random() * 100);
            return (r * (r % 2 == 0 ? 1 : -1));
        }
        function randomDataArray() {
            var d = [];
            var len = 100;
            while (len--) {
                d.push([
                    random(),
                    random(),
                    Math.abs(random()),
                ]);
            }
            return d;
        }        
        $scope.scatter2.options = {
            tooltip : {
                trigger: 'axis',
                showDelay : 0,
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            legend: {
                data:['scatter1','scatter2']
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
                    splitNumber: 4,
                    scale: true
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitNumber: 4,
                    scale: true
                }
            ],
            series : scatterEmpleoData
        };

        $scope.radar1.options = {
            title : {
                text: 'Budget vs spending'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                orient : 'vertical',
                x : 'right',
                y : 'bottom',
                data:['Allocated Budget','Actual Spending']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            polar : [
               {
                   indicator : [
                       { text: 'sales', max: 6000},
                       { text: 'dministration', max: 16000},
                       { text: 'Information Techology', max: 30000},
                       { text: 'Customer Support', max: 38000},
                       { text: 'Development', max: 52000},
                       { text: 'Marketing', max: 25000}
                    ]
                }
            ],
            calculable : true,
            series : [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data : [
                        {
                            value : [4300, 10000, 28000, 35000, 50000, 19000],
                            name : 'Allocated Budget'
                        },
                         {
                            value : [5000, 14000, 28000, 31000, 42000, 21000],
                            name : 'Actual Spending'
                        }
                    ]
                }
            ]
        };
        $scope.radar2.options = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                x : 'center',
                data:['Ronaldo','Andriy Shevchenko']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            polar : [
                {
                    indicator : [
                        {text : 'Attack', max  : 100},
                        {text : 'Guard', max  : 100},
                        {text : 'Physical', max  : 100},
                        {text : 'Speed', max  : 100},
                        {text : 'Strength', max  : 100},
                        {text : 'Skill', max  : 100}
                    ],
                    radius : 130
                }
            ],
            series : [
                {
                    name: 'Full of live data',
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data : [
                        {
                            value : [97, 42, 88, 94, 90, 86],
                            name : 'Andriy Shevchenko'
                        },
                        {
                            value : [97, 32, 74, 95, 88, 92],
                            name : 'Ronaldo'
                        }
                    ]
                }
            ]
        };

        $scope.gauge1.options = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            series : [
                {
                    name:'Business metric',
                    type:'gauge',
                    detail : {formatter:'{value}%'},
                    data:[{value: 50, name: 'Completion'}]
                }
            ]
        };



        $scope.chord1.options = {
            title : {
                text: 'Test Data',
                subtext: 'From d3.js',
                x:'right',
                y:'bottom'
            },
            tooltip : {
                trigger: 'item',
                formatter: function (params) {
                    if (params.indicator2) { // is edge
                        return params.value.weight;
                    } else {// is node
                        return params.name
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
            legend: {
                x: 'left',
                data:['group1','group2', 'group3', 'group4']
            },
            series : [
                {
                    type:'chord',
                    sort : 'ascending',
                    sortSub : 'descending',
                    showScale : true,
                    showScaleText : true,
                    data : [
                        {name : 'group1'},
                        {name : 'group2'},
                        {name : 'group3'},
                        {name : 'group4'}
                    ],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            }
                        }
                    },
                    matrix : [
                        [11975,  5871, 8916, 2868],
                        [ 1951, 10048, 2060, 6171],
                        [ 8010, 16145, 8090, 8045],
                        [ 1013,   990,  940, 6907]
                    ]
                }
            ]
        };

        $scope.funnel1.options = {
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
        $scope.treemap.options = {
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
    }    
})(); 
