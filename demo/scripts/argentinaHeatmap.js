
var Provincia = [
    {"name":"Santa Cruz", "coefesp": 0.2},
    {"name":"La Rioja", "coefesp": 1.3},
    {"name":"Tucuman", "coefesp": 2.4},
    {"name":"Santiago del Estero", "coefesp": 3.4},
    {"name":"Mendoza", "coefesp": 4.4},
    {"name":"Formosa", "coefesp": 5.4}
];


var i;
for (i = 0; i < 6; i++) {

    coefesp = Provincia[i].coefesp;
     //Falta modificar colores
    coefesp<=1 && coefesp>0 ? color = '#ffffff':""
    coefesp<=2 && coefesp>1 ? color = '#E0E0F8':""
    coefesp<=3 && coefesp>2 ? color = '#A9A9F5':""
    coefesp<=4 && coefesp>3 ? color = '#8181F7':""
    coefesp<=5 && coefesp>4 ? color = '#2E2EFE':""
    coefesp>5 ? color = '#0404B4':""

    var id_prov = "#" + Provincia[i].name.toLowerCase().replace(" ", "").replace(" ", "");

    s = Snap(id_prov)
    s.attr({
        fill: color,
        stroke: "#000",
        strokeWidth: 2
    });

}