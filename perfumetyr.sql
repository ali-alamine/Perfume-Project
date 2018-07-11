-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 25, 2018 at 12:08 PM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perfumetyr`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `CID` int(11) NOT NULL AUTO_INCREMENT,
  `client_fullName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_phone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_debit` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `component`
--

DROP TABLE IF EXISTS `component`;
CREATE TABLE IF NOT EXISTS `component` (
  `IID` int(11) NOT NULL,
  `com_type` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `com_quan` int(11) DEFAULT NULL,
  `com_date_exp` date DEFAULT NULL,
  `com_capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `definition_perfume`
--

DROP TABLE IF EXISTS `definition_perfume`;
CREATE TABLE IF NOT EXISTS `definition_perfume` (
  `item_IID` int(11) NOT NULL,
  `item_b_IID` int(11) NOT NULL,
  `item_e1_IID` int(11) NOT NULL,
  `item_e2_IID` int(11) NOT NULL,
  `item_quan_e1` int(11) NOT NULL,
  `item_quan_e2` int(11) NOT NULL,
  `item_quan_a` int(11) NOT NULL,
  PRIMARY KEY (`item_IID`),
  KEY `item_IID` (`item_IID`),
  KEY `item_b_IID` (`item_b_IID`),
  KEY `item_e1_IID` (`item_e1_IID`),
  KEY `item_e2_IID` (`item_e2_IID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drawer`
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
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `IID` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `item_cost` decimal(11,2) DEFAULT NULL,
  `item_selling` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE IF NOT EXISTS `order_details` (
  `ODID` int(11) NOT NULL AUTO_INCREMENT,
  `ord_det_CID` int(11) DEFAULT NULL,
  `ord_det_code` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ord_det_total_price` decimal(11,2) DEFAULT NULL,
  `ord_det_rem_amount` decimal(11,2) DEFAULT NULL,
  `ord_det_date` date DEFAULT NULL,
  PRIMARY KEY (`ODID`),
  KEY `ord_det_CID` (`ord_det_CID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_s`
--

DROP TABLE IF EXISTS `order_s`;
CREATE TABLE IF NOT EXISTS `order_s` (
  `OID` int(11) NOT NULL AUTO_INCREMENT,
  `ord_ODID` int(11) NOT NULL,
  `ord_IID` int(11) DEFAULT NULL,
  `ord_k_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ord_quantity` int(11) NOT NULL,
  `ord_price` decimal(11,2) NOT NULL,
  `ord_profit` decimal(11,2) NOT NULL,
  PRIMARY KEY (`OID`),
  KEY `ord_IID` (`ord_IID`,`ord_ODID`),
  KEY `ord_ODID` (`ord_ODID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE IF NOT EXISTS `supplier` (
  `SRID` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_phone` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `supplier_debit` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`SRID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supply`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supply_detail`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `component`
--
ALTER TABLE `component`
  ADD CONSTRAINT `component_ibfk_1` FOREIGN KEY (`IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `definition_perfume`
--
ALTER TABLE `definition_perfume`
  ADD CONSTRAINT `definition_perfume_ibfk_1` FOREIGN KEY (`item_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `definition_perfume_ibfk_2` FOREIGN KEY (`item_b_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `definition_perfume_ibfk_3` FOREIGN KEY (`item_e1_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `definition_perfume_ibfk_4` FOREIGN KEY (`item_e2_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`ord_det_CID`) REFERENCES `client` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_s`
--
ALTER TABLE `order_s`
  ADD CONSTRAINT `order_s_ibfk_1` FOREIGN KEY (`ord_ODID`) REFERENCES `order_details` (`ODID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_s_ibfk_2` FOREIGN KEY (`ord_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supply`
--
ALTER TABLE `supply`
  ADD CONSTRAINT `supply_ibfk_1` FOREIGN KEY (`sup_SDID`) REFERENCES `supply_detail` (`SDID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supply_ibfk_2` FOREIGN KEY (`sup_IID`) REFERENCES `item` (`IID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supply_detail`
--
ALTER TABLE `supply_detail`
  ADD CONSTRAINT `supply_detail_ibfk_1` FOREIGN KEY (`sup_det_SRID`) REFERENCES `supplier` (`SRID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
