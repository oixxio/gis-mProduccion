-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 04, 2016 at 05:05 PM
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
-- Table structure for table `datos_generales`
--

CREATE TABLE IF NOT EXISTS `datos_generales` (
  `provincia_id` int(11) NOT NULL,
  `poblacion` int(11) NOT NULL,
  `prop_pobl_total_nac` float NOT NULL,
  `ano_dato_pbg` int(11) NOT NULL,
  `pbg` int(11) NOT NULL,
  `emp_publ_prov` int(11) NOT NULL,
  `prop_emp_publ_total_nac` float NOT NULL,
  `part_pbg_pbi` float NOT NULL,
  `exp_mill_usd` int(11) NOT NULL,
  `prop_exp_mill_usd_total_nac` float NOT NULL,
  `dest_exp` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `prod_exp` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`provincia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `datos_generales`
--

INSERT INTO `datos_generales` (`provincia_id`, `poblacion`, `prop_pobl_total_nac`, `ano_dato_pbg`, `pbg`, `emp_publ_prov`, `prop_emp_publ_total_nac`, `part_pbg_pbi`, `exp_mill_usd`, `prop_exp_mill_usd_total_nac`, `dest_exp`, `prod_exp`) VALUES
(1, 16841135, 0.38635, 2013, 867849, 651272, 0.178, 0.306055, 20459, 0.326379, ' Brasil, Chile y Uruguay ', ' Automóviles, Soja y Maíz '),
(2, 3059122, 0.0701789, 2013, 646980, 193468, 0.176788, 0.228164, 325, 0.00560265, ' Alemania, Uruguay y Paraguay ', ' Hormonas naturales o reproducidas por sí­ntesis, cueros de bovinos o equinos, y medicamentos'),
(3, 400678, 0.00919189, 2006, 6776, 40391, 0.37246, 0.00950001, 1539, 0.0101657, ' Alemania, Japón y España ', ' Minerales de cobre, carbonatos y aceite  de oliva '),
(4, 1155723, 0.0265133, 2008, 12220, 75041, 0.351823, 0.0109581, 287, 0.00372449, ' Italia, Brasil y México ', ' Extractos curtientes de origen vegetal, maíz y algodón  '),
(5, 577466, 0.0132476, 2013, 45790, 41239, 0.241303, 0.0161482, 1659, 0.0291042, ' Estados Unidos, Brasil y China ', ' Aceites de petróleo, aluminio y lana '),
(6, 3606540, 0.0827371, 2014, 248323, 119155, 0.138602, 0.0664882, 7253, 0.138539, ' Brasil, Chile y Paises Bajos ', ' Tortas de semillas de oleaginosas, maíz y auto-partes '),
(7, 1080655, 0.0247911, 2013, 31382, 58656, 0.265538, 0.0110673, 136, 0.00285803, ' Estados Unidos, Cuba y Brasil ', ' Arroz, limón, madera de coní­feras '),
(8, 1334489, 0.0306143, 2013, 63814, 73224, 0.273387, 0.0225048, 1233, 0.0229873, ' Chile, China y Estados Unidos ', ' Soja, maíz y gallinas '),
(9, 584614, 0.0134115, 2007, 4019, 38191, 0.290402, 0.00445313, 29, 0.000440979, ' Brasil, India e Italia ', ' Extracto de quebracho, arroz y aceites crudos de petróleo '),
(10, 736542, 0.0168969, 2011, 14262, 59602, 0.349409, 0.00718444, 293, 0.00567049, ' Bélgica, Brasil y Canadá ', ' Minerales de plata, poroto y tabaco '),
(11, 346191, 0.00794191, 2009, 5108, 23029, 0.280378, 0.00458058, 571, 0.00462704, ' Paises Bajos, Brasil y Chile ', ' Soja, trigo y maíz '),
(12, 372879, 0.00855416, 2012, 8492, 35370, 0.385197, 0.00361157, 169, 0.00407582, ' Chile, Brasil y Estados Unidos ', ' Papel y cartón, aceitunas y aceite  de oliva '),
(13, 1907045, 0.0437492, 2013, 107745, 91040, 0.197356, 0.0379972, 1355, 0.0229282, ' Estados Unidos, Brasil y Chile ', ' Vino, jugo de uva y ciruelas '),
(14, 1204182, 0.027625, 2007, 17092, 55457, 0.266024, 0.0189385, 439, 0.00712178, ' Brasil, Estados Unidos y Siria ', ' Pasta celulósica, yerba mate y té'),
(15, 628897, 0.0144274, 2013, 55868, 56254, 0.279825, 0.0197024, 667, 0.00274752, ' Brasil, Chile y Estados Unidos ', ' Metanol, peras y gas natural  '),
(16, 708799, 0.0162605, 2013, 43349, 52331, 0.388253, 0.0152875, 472, 0.00810947, ' Brasil, Estados Unidos y Rusia ', ' Peras, manzanas y cloruro de vinilo '),
(17, 1351878, 0.0310132, 2012, 30613, 64298, 0.182882, 0.0130199, 1018, 0.0113309, ' Estados Unidos, China y Brasil ', ' Porotos, tabaco y productos químicos '),
(18, 747488, 0.017148, 2008, 9285, 36547, 0.192437, 0.00832612, 730, 0.0254189, ' Canadá, Brasil y Estados Unidos ', ' Oro, plata y vinos '),
(19, 482796, 0.0110757, 2007, 6875, 23248, 0.251444, 0.00761721, 520, 0.00944864, ' Chile, Paraguay y Uruguay ', ' Maíz, soja y productos de higiene '),
(20, 329499, 0.00755899, 2005, 8275, 31698, 0.463551, 0.0145133, 803, 0.0366137, ' Suiza, Estados Unidos, España', ' Oro, langostinos congelados y plata '),
(21, 3425656, 0.0785875, 2013, 250269, 123685, 0.133322, 0.0882595, 12359, 0.22243, ' Brasil, India y Estados Unidos ', ' Aceite de soja, soja y maiz '),
(22, 938109, 0.021521, 2007, 6855, 49936, 0.257796, 0.00759543, 268, 0.00885162, ' Chile, Vietman y Birmania', ' Maiz, soja y alimentos preparados para animales '),
(23, 156509, 0.00359045, 2007, 5289, 17563, 0.328657, 0.00586077, 460, 0.00285058, ' Uruguay, Brasil y China ', ' Merluza, moluscos y tubos de plástico'),
(24, 1613476, 0.0370145, 2013, 49400, 77422, 0.190258, 0.0174213, 747, 0.0152718, ' Estados Unidos, Brasil y Paises Bajos ', ' Aceite escenciales de limón, jugo de limón y limones  ');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
