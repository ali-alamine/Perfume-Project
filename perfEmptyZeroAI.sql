-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2018 at 08:22 AM
-- Server version: 10.1.25-MariaDB
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
CREATE DATABASE IF NOT EXISTS `perfumetyr` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `perfumetyr`;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `CID` int(11) NOT NULL,
  `client_fullName` varchar(50) DEFAULT NULL,
  `client_phone` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_debit` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `component`
--

CREATE TABLE `component` (
  `IID` int(11) NOT NULL,
  `com_type` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `com_quan` decimal(11,3) DEFAULT NULL,
  `com_date_exp` date DEFAULT NULL,
  `com_capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `definition_perfume`
--

CREATE TABLE `definition_perfume` (
  `item_IID` int(11) NOT NULL,
  `item_b_IID` int(11) NOT NULL,
  `item_e1_IID` int(11) NOT NULL,
  `item_e2_IID` int(11) DEFAULT NULL,
  `item_quan_e1` decimal(11,3) NOT NULL,
  `item_quan_e2` decimal(11,3) DEFAULT NULL,
  `item_quan_a` decimal(11,3) NOT NULL,
  `item_isDeleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drawer`
--

CREATE TABLE `drawer` (
  `DID` int(11) NOT NULL,
  `drawer_day` date DEFAULT NULL,
  `drawer_type` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drawer_amount` decimal(11,2) DEFAULT NULL,
  `drawer_reason` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drawer_profit` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `IID` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `item_cost` decimal(11,2) DEFAULT NULL,
  `item_selling` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `ODID` int(11) NOT NULL,
  `ord_det_CID` int(11) DEFAULT NULL,
  `ord_det_code` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ord_det_total_price` decimal(11,2) DEFAULT NULL,
  `ord_det_rem_amount` decimal(11,2) DEFAULT NULL,
  `ord_det_date` date DEFAULT NULL,
  `ord_det_profit` decimal(11,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_s`
--

CREATE TABLE `order_s` (
  `OID` int(11) NOT NULL,
  `ord_ODID` int(11) NOT NULL,
  `ord_IID` int(11) DEFAULT NULL,
  `ord_k_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ord_quantity` int(11) NOT NULL,
  `ord_price` decimal(11,2) NOT NULL,
  `ord_profit` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `SRID` int(11) NOT NULL,
  `supplier_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_phone` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `supplier_debit` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

CREATE TABLE `supply` (
  `SID` int(11) NOT NULL,
  `sup_SDID` int(11) DEFAULT NULL,
  `sup_IID` int(11) DEFAULT NULL,
  `sup_quan` int(11) DEFAULT NULL,
  `sup_cost` decimal(11,2) DEFAULT NULL,
  `sup_selling_price` decimal(11,2) DEFAULT NULL,
  `sup_total_cost` decimal(11,2) DEFAULT NULL,
  `sup_date_exp` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supply_detail`
--

CREATE TABLE `supply_detail` (
  `SDID` int(11) NOT NULL,
  `sup_det_SRID` int(11) DEFAULT NULL,
  `sup_det_code` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sup_det_total_price` decimal(11,2) DEFAULT NULL,
  `sup_det_rem_amount` decimal(11,2) DEFAULT NULL,
  `sup_det_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`CID`);

--
-- Indexes for table `component`
--
ALTER TABLE `component`
  ADD PRIMARY KEY (`IID`);

--
-- Indexes for table `definition_perfume`
--
ALTER TABLE `definition_perfume`
  ADD PRIMARY KEY (`item_IID`),
  ADD KEY `item_IID` (`item_IID`),
  ADD KEY `item_b_IID` (`item_b_IID`),
  ADD KEY `item_e1_IID` (`item_e1_IID`),
  ADD KEY `item_e2_IID` (`item_e2_IID`);

--
-- Indexes for table `drawer`
--
ALTER TABLE `drawer`
  ADD PRIMARY KEY (`DID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`IID`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`ODID`),
  ADD KEY `ord_det_CID` (`ord_det_CID`);

--
-- Indexes for table `order_s`
--
ALTER TABLE `order_s`
  ADD PRIMARY KEY (`OID`),
  ADD KEY `ord_IID` (`ord_IID`,`ord_ODID`),
  ADD KEY `ord_ODID` (`ord_ODID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`SRID`);

--
-- Indexes for table `supply`
--
ALTER TABLE `supply`
  ADD PRIMARY KEY (`SID`),
  ADD KEY `sup_SDID` (`sup_SDID`,`sup_IID`),
  ADD KEY `sup_IID` (`sup_IID`);

--
-- Indexes for table `supply_detail`
--
ALTER TABLE `supply_detail`
  ADD PRIMARY KEY (`SDID`),
  ADD KEY `sup_det_SRID` (`sup_det_SRID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `drawer`
--
ALTER TABLE `drawer`
  MODIFY `DID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `IID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `ODID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_s`
--
ALTER TABLE `order_s`
  MODIFY `OID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `SRID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `supply`
--
ALTER TABLE `supply`
  MODIFY `SID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `supply_detail`
--
ALTER TABLE `supply_detail`
  MODIFY `SDID` int(11) NOT NULL AUTO_INCREMENT;
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
  ADD CONSTRAINT `definition_perfume_ibfk_9` FOREIGN KEY (`item_e2_IID`) REFERENCES `item` (`IID`) ON DELETE SET NULL ON UPDATE SET NULL;

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
