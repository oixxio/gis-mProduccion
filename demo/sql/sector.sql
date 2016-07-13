-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 04, 2016 at 03:05 PM
-- Server version: 5.5.50
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `m6000296_min_i`
--

-- --------------------------------------------------------

--
-- Table structure for table `sector`
--

CREATE TABLE IF NOT EXISTS `sector` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(450) NOT NULL,
  `abv` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `rubro_sector_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sector_rubro_sector1_idx` (`rubro_sector_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=94 ;

--
-- Dumping data for table `sector`
--

INSERT INTO `sector` (`id`, `nombre`, `abv`, `rubro_sector_id`) VALUES
(0, 'Total Provincia', '', 0),
(1, 'Agricultura y ganaderia caza y servicios conexos', 'Agricultura y ganaderia', 1),
(2, 'Silvicultura extracción de madera y servicios conexos', 'Silvicultura, extracción de madera', 1),
(5, 'Pesca y actividades relacionadas con la pesca', 'Pesca', 2),
(10, 'Extracción de carbon y de lignito   extracción de turba', 'Carbón y lignito', 3),
(11, 'Extracción de petroleo crudo y gas natural', 'Petróleo crudo y gas', 3),
(13, 'Extracción de minerales metaliferos', 'Minerales metaliferos', 3),
(14, 'Explotación de otras minas y canteras n.c.p.', 'Explotación de otras minas y canteras', 3),
(15, 'Elaboración de productos alimenticios y bebidas', 'Alimentos', 4),
(16, 'Elaboración de productos de tabaco', 'Tabaco', 4),
(17, 'Fabricación de productos textiles', 'Textiles', 4),
(18, 'Confección de prendas de vestir terminación y teñido de pieles', 'Confección', 4),
(19, 'Curtido y terminación de cueros fabricación calzado y de sus partes', 'Calzado y cuero', 4),
(20, 'Producción de madera y fabricación de productos de madera y corcho excepto muebles', 'Madera', 4),
(21, 'Fabricación de papel y de productos de papel', 'Papel', 4),
(22, 'Edición e impresión  reproducción de grabaciones', 'Edición e impresión', 4),
(23, 'Fabricación de coque productos de la refinacion del petroleo y combustible nuclear', 'Productos de petróleo', 4),
(24, 'Fabricación de sustancias y productos quimicos', 'Químicos', 4),
(25, 'Fabricación de productos de caucho y plastico', 'Caucho y plástico', 4),
(26, 'Fabricación de productos minerales no metalicos', 'Otros minerales no metálicos', 4),
(27, 'Fabricación de metales comunes', 'Metales comunes', 4),
(28, 'Fabricación de productos elaborados de metal  excepto maquinaria y equipo', 'Otros productos de metal', 4),
(29, 'Fabricación de maquinaria y equipo n.c.p.', 'Maquinaria y equipo', 4),
(30, 'Fabricación de maquinaria de oficina contabilidad e informatica', 'Maquinaria de oficina', 4),
(31, 'Fabricación de maquinaria y aparatos electricos  n.c.p.', 'Aparatos eléctricos', 4),
(32, 'Fabricación de equipos y aparatos de radio television y comunicaciones', 'Radio y televisión', 4),
(33, 'Fabricación de instrumentos medicos opticos y de precision fabricacion de relojes', 'Instrumentos médicos', 4),
(34, 'Fabricación de vehiculos automotores remolques y semirremolques', 'Automotores', 4),
(35, 'Fabricación de equipo de transporte n.c.p.', 'Otros equipos de transporte', 4),
(36, 'Fabricación de muebles y colchones industrias manufactureras n.c.p.', 'Muebles', 4),
(37, 'Reciclamiento', 'Reciclamiento', 4),
(40, 'Electricidad gas vapor y agua caliente', 'Electricidad, gas y agua', 5),
(41, 'Captacion depuracion y distribucion de agua', 'Distribución de agua', 5),
(45, 'Construcción', 'Construcción', 6),
(50, 'Venta y reparacion de vehiculos. venta por menor de combustible', 'Vta. y reparación de vehículos', 7),
(51, 'Comercio al por mayor', 'Comercio al por mayor', 7),
(52, 'Comercio al por menor', 'Comercio al por menor', 7),
(55, 'Servicios de hoteleria y restaurantes', 'Hoteleria y restaurantes', 8),
(60, 'Transporte ferroviario y automotor y por tuberias', 'Transporte ferroviario y automotor', 9),
(61, 'Transporte maritimo y fluvial', 'Transporte marítimo y fluvial', 9),
(62, 'Transporte aéreo de cargas y de pasajeros', 'Transporte aéreo', 9),
(63, 'Manipulación de carga  almacenamiento y deposito. Servicios de agencias de viaje', 'Manipulación de carga', 9),
(64, 'Telecomunicaciones y correos', 'Telecomunicaciones y correos', 9),
(65, 'Intermediación financiera y otros servicios financieros', 'Intermediación financiera', 10),
(66, 'Seguros', 'Seguros', 10),
(67, 'Servicios auxiliares a la actividad financiera', 'Ss. auxiliares a la act. financiera', 10),
(70, 'Servicios inmobiliarios', 'Inmobiliarios', 11),
(71, 'Alquiler de equipo de transporte y de maquinaria', 'Alquiler de transporte y maquinaria', 11),
(72, 'Actividades de informática', 'Informática', 11),
(73, 'Investigación y desarrollo', ' I + D', 11),
(74, 'Servicios jurídicos  contables y otros servicios a empresas', 'Ss. jurídicos y contables', 11),
(75, 'Agencias de empleo temporario', 'Agencias de empleo', 12),
(80, 'Enseñanza', 'Enseñanza', 13),
(85, 'Servicios sociales y de salud', 'Servicios sociales y de salud', 14),
(90, 'Eliminación de desperdicios', 'Eliminación de desperdicios', 15),
(91, 'Servicios de organizaciones empresariales', 'Ss. de organizaciones empresariales', 15),
(92, 'Servicios culturales deportivos y de esparcimiento', 'Ss culturales, deportivos', 15),
(93, 'Servicios n.c.p.', 'Ss. n.c.p.', 15);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
