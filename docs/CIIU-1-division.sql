DROP TABLE IF EXISTS CIIU_1_division;
CREATE TABLE IF NOT EXISTS CIIU_1_division(
   cod1dig VARCHAR(3) NOT NULL PRIMARY KEY
  ,CIIU      VARCHAR(66) NOT NULL
);
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('A','Agricultura, ganadería, caza y silvicultura');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('B','Pesca');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('C','Explotación de minas y canteras');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('D','Industrias manufactureras');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('E','Suministro de electricidad, gas y agua');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('K','Actividades inmobiliarias, empresariales y de alquiler');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('O','Otras actividades de servicios comunitarios, sociales y personales');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('S/C','SIN CLASIFICAR');
INSERT INTO CIIU_1_division(cod1dig,CIIU) VALUES ('IND','Indeterminado');
