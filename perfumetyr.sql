-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 11 juil. 2018 à 11:00
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `perfumetyr`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `CID` int(11) NOT NULL AUTO_INCREMENT,
  `client_fullName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_phone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_debit` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`CID`, `client_fullName`, `client_phone`, `client_address`, `client_debit`) VALUES
(1, 'Haifaa Youssef', '111', 'chaqraa', '100.00'),
(2, 'ساليا حكيم', '6666', 'kw', '0.00'),
(4, 'qwerty', '123', NULL, '0.00');

-- --------------------------------------------------------

--
-- Structure de la table `component`
--

DROP TABLE IF EXISTS `component`;
CREATE TABLE IF NOT EXISTS `component` (
  `IID` int(11) NOT NULL,
  `com_type` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `com_quan` decimal(11,3) DEFAULT NULL,
  `com_date_exp` date DEFAULT NULL,
  `com_capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `component`
--

INSERT INTO `component` (`IID`, `com_type`, `com_quan`, `com_date_exp`, `com_capacity`) VALUES
(1, 'alc', '99.800', NULL, NULL),
(2, 'ess', '99.550', NULL, NULL),
(3, 'ess', '99.750', NULL, NULL),
(4, 'bot', '997.000', NULL, 250),
(5, 'bot', '999.000', NULL, 500),
(6, 'bot', '0.000', NULL, 700),
(7, 'acc', '1983.000', '2020-06-06', NULL),
(8, 'acc', '3000.000', '2020-06-06', NULL),
(9, 'acc', '4000.000', '2020-01-01', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `definition_perfume`
--

DROP TABLE IF EXISTS `definition_perfume`;
CREATE TABLE IF NOT EXISTS `definition_perfume` (
  `item_IID` int(11) NOT NULL,
  `item_b_IID` int(11) DEFAULT NULL,
  `item_e1_IID` int(11) DEFAULT NULL,
  `item_e2_IID` int(11) DEFAULT NULL,
  `item_quan_e1` decimal(11,3) DEFAULT NULL,
  `item_quan_e2` decimal(11,3) DEFAULT NULL,
  `item_quan_a` decimal(11,3) DEFAULT NULL,
  PRIMARY KEY (`item_IID`),
  KEY `item_IID` (`item_IID`),
  KEY `item_b_IID` (`item_b_IID`),
  KEY `item_e1_IID` (`item_e1_IID`),
  KEY `item_e2_IID` (`item_e2_IID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `definition_perfume`
--

INSERT INTO `definition_perfume` (`item_IID`, `item_b_IID`, `item_e1_IID`, `item_e2_IID`, `item_quan_e1`, `item_quan_e2`, `item_quan_a`) VALUES
(12, 4, 2, NULL, '200.000', NULL, '50.000'),
(13, 5, 2, 3, '200.000', '200.000', '100.000');

-- --------------------------------------------------------

--
-- Structure de la table `drawer`
--

DROP TABLE IF EXISTS `drawer`;
CREATE TABLE IF NOT EXISTS `drawer` (
  `DID` int(11) NOT NULL AUTO_INCREMENT,
  `drawer_day` date DEFAULT NULL,
  `drawer_type` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drawer_amount` decimal(11,2) DEFAULT NULL,
  `drawer_reason` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drawer_profit` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`DID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `IID` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `item_cost` decimal(11,3) DEFAULT NULL,
  `item_selling` decimal(11,3) DEFAULT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `item`
--

INSERT INTO `item` (`IID`, `item_name`, `item_cost`, `item_selling`) VALUES
(1, 'alcohol', '30.000', '60.000'),
(2, 'essence 1', '50.000', '100.000'),
(3, 'essence 2', '0.000', '0.000'),
(4, 'plastic', '50.000', '100.000'),
(5, 'plastic', '60.000', '80.000'),
(6, 'plastic', '0.000', '0.000'),
(7, 'acc 1', '50.000', '100.000'),
(8, 'acc 2', '40.000', '80.000'),
(9, 'acc 3', '100.000', '150.000'),
(12, 'essence 1  | 250', '66.900', '150.000'),
(13, 'essence 1 essence 2 | 500', '78.400', '200.000');

-- --------------------------------------------------------

--
-- Structure de la table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE IF NOT EXISTS `order_details` (
  `ODID` int(11) NOT NULL AUTO_INCREMENT,
  `ord_det_CID` int(11) DEFAULT NULL,
  `ord_det_code` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ord_det_total_price` decimal(11,2) DEFAULT NULL,
  `ord_det_rem_amount` decimal(11,2) DEFAULT NULL,
  `ord_det_date` date DEFAULT NULL,
  `ord_det_profit` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`ODID`),
  KEY `ord_det_CID` (`ord_det_CID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `order_details`
--

INSERT INTO `order_details` (`ODID`, `ord_det_CID`, `ord_det_code`, `ord_det_total_price`, `ord_det_rem_amount`, `ord_det_date`, `ord_det_profit`) VALUES
(1, 1, 'SS-1', '900.00', '0.00', '2018-07-11', '850.00'),
(4, NULL, '', '400.00', '0.00', '2018-07-11', '50.00'),
(5, 1, '', '600.00', '0.00', '2018-07-11', '50.00'),
(6, 4, 'SL-3', '50.00', '0.00', '2018-07-11', '46.00'),
(7, 1, 'SL-4', '150.00', '100.00', '2018-07-11', '83.10'),
(8, NULL, 'SL-5', '650.00', '0.00', '2018-07-11', '96.00'),
(9, NULL, 'SL-6', '200.00', '0.00', '2018-07-11', '121.60');

-- --------------------------------------------------------

--
-- Structure de la table `order_s`
--

DROP TABLE IF EXISTS `order_s`;
CREATE TABLE IF NOT EXISTS `order_s` (
  `OID` int(11) NOT NULL AUTO_INCREMENT,
  `ord_ODID` int(11) NOT NULL,
  `ord_IID` int(11) DEFAULT NULL,
  `ord_k_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ord_quantity` int(11) NOT NULL,
  `ord_price` decimal(11,2) NOT NULL,
  `ord_profit` decimal(11,2) NOT NULL,
  PRIMARY KEY (`OID`),
  KEY `ord_IID` (`ord_IID`,`ord_ODID`),
  KEY `ord_ODID` (`ord_ODID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `order_s`
--

INSERT INTO `order_s` (`OID`, `ord_ODID`, `ord_IID`, `ord_k_name`, `ord_quantity`, `ord_price`, `ord_profit`) VALUES
(1, 1, 2, NULL, 10, '90.00', '850.00'),
(5, 4, 7, 'acc 1', 4, '100.00', '50.00'),
(6, 5, 7, 'acc 1', 6, '100.00', '50.00'),
(7, 6, NULL, 'essence 1  | كبس', 1, '50.00', '46.00'),
(8, 7, NULL, 'essence 1  | 250', 1, '150.00', '83.10'),
(9, 8, 7, 'acc 1', 6, '100.00', '50.00'),
(10, 8, NULL, 'essence 1 essence 2 | كبس', 1, '50.00', '46.00'),
(11, 9, NULL, 'essence 1 essence 2 | 500', 1, '200.00', '121.60');

-- --------------------------------------------------------

--
-- Structure de la table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE IF NOT EXISTS `supplier` (
  `SRID` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_phone` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `supplier_debit` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`SRID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `supplier`
--

INSERT INTO `supplier` (`SRID`, `supplier_name`, `supplier_phone`, `supplier_address`, `supplier_debit`) VALUES
(1, 'شركة اكسسوارات', '8888', 'tyr', '0.00'),
(2, 'perfume essence', '333', 'beirut', '0.00');

-- --------------------------------------------------------

--
-- Structure de la table `supply`
--

DROP TABLE IF EXISTS `supply`;
CREATE TABLE IF NOT EXISTS `supply` (
  `SID` int(11) NOT NULL AUTO_INCREMENT,
  `sup_SDID` int(11) DEFAULT NULL,
  `sup_IID` int(11) DEFAULT NULL,
  `sup_quan` int(11) DEFAULT NULL,
  `sup_cost` decimal(11,2) DEFAULT NULL,
  `sup_selling_price` decimal(11,2) DEFAULT NULL,
  `sup_total_cost` decimal(11,2) DEFAULT NULL,
  `sup_date_exp` date DEFAULT NULL,
  PRIMARY KEY (`SID`),
  KEY `sup_SDID` (`sup_SDID`,`sup_IID`),
  KEY `sup_IID` (`sup_IID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `supply`
--

INSERT INTO `supply` (`SID`, `sup_SDID`, `sup_IID`, `sup_quan`, `sup_cost`, `sup_selling_price`, `sup_total_cost`, `sup_date_exp`) VALUES
(1, 1, 2, 50, '50.00', '100.00', '2500.00', NULL),
(2, 1, 1, 50, '30.00', '60.00', '1500.00', NULL),
(3, 2, 4, 1000, '50.00', '100.00', '50000.00', NULL),
(4, 2, 5, 1000, '60.00', '80.00', '60000.00', NULL),
(5, 3, 7, 2000, '50.00', '100.00', '100000.00', '2020-06-06'),
(6, 3, 8, 3000, '40.00', '80.00', '120000.00', '2020-06-06'),
(7, 3, 9, 4000, '100.00', '150.00', '400000.00', '2020-01-01');

-- --------------------------------------------------------

--
-- Structure de la table `supply_detail`
--

DROP TABLE IF EXISTS `supply_detail`;
CREATE TABLE IF NOT EXISTS `supply_detail` (
  `SDID` int(11) NOT NULL AUTO_INCREMENT,
  `sup_det_SRID` int(11) DEFAULT NULL,
  `sup_det_code` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sup_det_total_price` decimal(11,2) DEFAULT NULL,
  `sup_det_rem_amount` decimal(11,2) DEFAULT NULL,
  `sup_det_date` date DEFAULT NULL,
  PRIMARY KEY (`SDID`),
  KEY `sup_det_SRID` (`sup_det_SRID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `supply_detail`
--

INSERT INTO `supply_detail` (`SDID`, `sup_det_SRID`, `sup_det_code`, `sup_det_total_price`, `sup_det_rem_amount`, `sup_det_date`) VALUES
(1, 2, 'BI-1', '4000.00', '0.00', '2018-07-11'),
(2, 2, 'BI-2', '110000.00', '0.00', '2018-07-11'),
(3, 1, 'BA-1', '620000.00', '0.00', '2018-07-11');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `component`
--
ALTER TABLE `component`
  ADD CONSTRAINT `component_ibfk_1` FOREIGN KEY (`IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `definition_perfume`
--
ALTER TABLE `definition_perfume`
  ADD CONSTRAINT `definition_perfume_ibfk_1` FOREIGN KEY (`item_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `definition_perfume_ibfk_2` FOREIGN KEY (`item_b_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `definition_perfume_ibfk_3` FOREIGN KEY (`item_e1_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `definition_perfume_ibfk_4` FOREIGN KEY (`item_e2_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`ord_det_CID`) REFERENCES `client` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `order_s`
--
ALTER TABLE `order_s`
  ADD CONSTRAINT `order_s_ibfk_1` FOREIGN KEY (`ord_ODID`) REFERENCES `order_details` (`ODID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_s_ibfk_2` FOREIGN KEY (`ord_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `supply`
--
ALTER TABLE `supply`
  ADD CONSTRAINT `supply_ibfk_1` FOREIGN KEY (`sup_SDID`) REFERENCES `supply_detail` (`SDID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supply_ibfk_2` FOREIGN KEY (`sup_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `supply_detail`
--
ALTER TABLE `supply_detail`
  ADD CONSTRAINT `supply_detail_ibfk_1` FOREIGN KEY (`sup_det_SRID`) REFERENCES `supplier` (`SRID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
