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
-- Table structure for table `rubro_sector`
--

CREATE TABLE IF NOT EXISTS `rubro_sector` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `abv` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `rubro_sector`
--

INSERT INTO `rubro_sector` (`id`, `codigo`, `descripcion`, `abv`) VALUES
(0, '0', 'Total Provincia', ''),
(1, 'A', 'Agricultura, ganaderia, caza y silvicultura\n', 'Agricultura, ganaderia, caza y silvicultura'),
(2, 'B', 'Pesca y servicios conexos\n', 'Pesca'),
(3, 'C', 'Explotacion de minas y canteras\n', 'Explotación de minas'),
(4, 'D', 'Industria manufacturera', 'Industria manufacturera'),
(5, 'E', 'Electricidad, gas y agua\n', 'Electricidad, gas y agua'),
(6, 'F', 'Construcción', 'Construcción'),
(7, 'G', 'Comercio al por mayor y al por menor , reparación de vehículos automotores', 'Comercio'),
(8, 'H', 'Servicios de hoteleria y restaurantes', 'Hoteleria y restaurantes'),
(9, 'I', 'Servicios de transporte, almacenamiento y comunicaciones\n', 'Transporte, alm. y comunicaciones'),
(10, 'J', 'Intermediación financiera y otros servicios fiancieros\n', 'Intermediación financiera'),
(11, 'K', 'Servicios inmobiliarios, empresariales y de alquiler\n', 'Ss. Inmobiliarios y empresariales'),
(12, 'L', 'Administracion publica, defensa y seguridad social obligatoria', 'Adm. publ., defensa y seg. social obl.'),
(13, 'M', 'Enseñanza', 'Enseñanza'),
(14, 'N', 'Servicios sociales y de salud\n', 'Ss. sociales y de salud'),
(15, 'O', 'Servicios comunitarios, sociales y personales n.c.p', 'Ss. comun, sociales y pers. n.c.p');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
