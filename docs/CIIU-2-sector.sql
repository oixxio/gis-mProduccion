DROP TABLE IF EXISTS CIIU_2_sector;
CREATE TABLE IF NOT EXISTS CIIU_2_sector(
   cod1dig VARCHAR(3) NOT NULL
  ,cod2dig VARCHAR(3) NOT NULL PRIMARY KEY
  ,CIIU      VARCHAR(100) NOT NULL
);
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('A','1','Agricultura, ganadería, caza y actividades de servicios conexas');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('A','2','Silvicultura, extracción de madera y actividades de servicios conexas');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('B','5','Pesca, explotación de criaderos de peces y granjas piscícolas; actividades de servicios relacionadas');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('C','10','Extracción de carbón y lignito, extracción de turba');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('C','11','Extracción de petróleo crudo y gas natural, actividades de servicios relacionadas con la extracción');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('C','12','Extracción de minerales de uranio y torio');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('C','13','Extracción de minerales metalíferos');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('C','14','Explotación de otras minas y canteras');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','15','Elaboración de productos alimenticios y bebidas');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','16','Elaboración de productos de tabaco');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','17','Fabricación de productos textiles');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','18','Fabricación de prendas de vestir, adobo y teñido de pieles');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','19','Curtido y adobo de cueros; fabricación de maletas, bolsos de mano, artículos de talabartería y guarn');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','20','Producción de madera y fabricación de productos de madera y corcho, excepto muebles; fabricación de');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','21','Fabricación de papel y de productos de papel');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','22','Actividades de edición e impresión y de reproducción de grabaciones');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','23','Fabricación de coque, productos de la refinación del petróleo y combustible nuclear');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','24','Fabricación de sustancias y productos químicos');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','25','Fabricación de productos de caucho y plástico');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','26','Fabricación de otros productos minerales no metálicos');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','27','Fabricación de metales comunes');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','28','Fabricación de productos elaborados de metal, excepto maquinaria y equipo');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','29','Fabricación de maquinaria y equipo ncp');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','30','Fabricación de maquinaria de oficina, contabilidad e informática');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','31','Fabricación de maquinaria y aparatos eléctricos ncp');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','32','Fabricación de equipo y aparatos de radio, televisión y comunicaciones');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','33','Fabricación de instrumentos médicos, ópticos y de precisión y fabricación de relojes');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','34','Fabricación de vehículos automotores, remolques y semirremolques');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','35','Fabricación de otros tipos de equipo de transporte');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('D','36','Fabricación de muebles,  industrias manufactureras ncp');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('E','40','Suministro de electricidad, gas, vapor y agua caliente');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('K','72','Informática y actividades conexas');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('K','74','Otras actividades empresariales');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('O','92','Actividades de esparcimiento y actividades culturales y deportivas');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('O','93','Otras actividades de servicios');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('S/C','S/C','SIN CLASIFICAR');
INSERT INTO CIIU_2_sector(cod1dig,cod2dig,CIIU) VALUES ('IND','IND','Indeterminado');
