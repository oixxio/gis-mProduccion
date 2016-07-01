-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 29, 2016 at 08:03 PM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `estadisticas_provincias_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `provincia`
--

CREATE TABLE IF NOT EXISTS `provincia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(450) NOT NULL,
  `abv` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `provincia`
--

INSERT INTO `provincia` (`id`, `nombre`, `abv`) VALUES
(0, 'Total Sectorial', ''),
(1, 'Buenos Aires', 'BSAS'),
(2, 'CABA\r', 'CABA'),
(3, 'Catamarca\r', 'CT'),
(4, 'Chaco\r', 'CC'),
(5, 'Chubut\r', 'CH'),
(6, 'Córdoba', 'CB'),
(7, 'Corrientes\r', 'CR'),
(8, 'Entre Ríos', 'ER'),
(9, 'Formosa\r', 'FO'),
(10, 'Jujuy\r', 'JY'),
(11, 'La Pampa\r', 'LP'),
(12, 'La Rioja\r', 'LR'),
(13, 'Mendoza\r', 'MZ'),
(14, 'Misiones\r', 'MN'),
(15, 'Neuquen\r', 'NQ'),
(16, 'Río Negro', 'RN'),
(17, 'Salta\r', 'SA'),
(18, 'San Juan\r', 'SJ'),
(19, 'San Luis\r', 'SL'),
(20, 'Santa Cruz\r', 'SC'),
(21, 'Santa Fe\r', 'SF'),
(22, 'Santiago del Estero\r', 'SE'),
(23, 'Tierra del Fuego\r', 'TF'),
(24, 'Tucumán', 'TM');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
