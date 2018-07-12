-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2018 at 08:54 AM
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

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`CID`, `client_fullName`, `client_phone`, `client_address`, `client_debit`) VALUES
(2, 'علي ماجد', '03258852', 'شقرا', '-15000.00'),
(3, 'عبدالله', '', '', '-15000.00'),
(4, 'abdallah fo3ani', '', '', '14.00'),
(5, 'علي هادي', '', '', '-17000.00'),
(6, 'علي عباس', '', '', '-19012.00'),
(7, 'علي الخطيب', '', '', '-158044000.00'),
(8, 'علي هاشم', '', '', '-148000.00'),
(9, 'علي كمال', '', '', '0.00'),
(10, 'عباس هاشم', '', '', '-15000.00'),
(11, 'عباس علي', '', '', '0.00');

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

--
-- Dumping data for table `component`
--

INSERT INTO `component` (`IID`, `com_type`, `com_quan`, `com_date_exp`, `com_capacity`) VALUES
(1, 'alc', '4.988', NULL, NULL),
(2, 'ess', '2.000', NULL, NULL),
(3, 'bot', '42.000', NULL, 500),
(5, 'ess', '23.000', NULL, NULL);

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

--
-- Dumping data for table `definition_perfume`
--

INSERT INTO `definition_perfume` (`item_IID`, `item_b_IID`, `item_e1_IID`, `item_e2_IID`, `item_quan_e1`, `item_quan_e2`, `item_quan_a`, `item_isDeleted`) VALUES
(4, 3, 2, NULL, '200.000', NULL, '300.000', b'0'),
(6, 3, 5, 2, '250.000', '100.000', '150.000', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `drawer`
--

CREATE TABLE `drawer` (
  `drawer_Date` date NOT NULL,
  `drawer_sell_total` decimal(11,3) NOT NULL DEFAULT '0.000',
  `drawer_profit_total` decimal(11,3) NOT NULL DEFAULT '0.000',
  `drawer_total_withdraw` decimal(11,3) NOT NULL DEFAULT '0.000',
  `drawer_total_return` decimal(11,3) NOT NULL DEFAULT '0.000',
  `drawer_total` decimal(11,3) NOT NULL DEFAULT '0.000',
  `drawer_isWD` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drawer`
--

INSERT INTO `drawer` (`drawer_Date`, `drawer_sell_total`, `drawer_profit_total`, `drawer_total_withdraw`, `drawer_total_return`, `drawer_total`, `drawer_isWD`) VALUES
('2018-07-08', '0.000', '0.000', '0.000', '0.000', '15000.000', b'1'),
('2018-07-09', '0.000', '0.000', '0.000', '0.000', '-2023500.000', b'0'),
('2018-07-10', '0.000', '0.000', '3115001.000', '99999999.999', '96984998.999', b'1'),
('2018-07-11', '0.000', '0.000', '0.000', '0.000', '0.000', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `drawer_operation`
--

CREATE TABLE `drawer_operation` (
  `DOID` int(11) NOT NULL,
  `drawer_op_day` date DEFAULT NULL,
  `drawer_op_type` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drawer_op_amount` decimal(11,2) DEFAULT NULL,
  `drawer_op_reason` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `drawer_operation`
--

INSERT INTO `drawer_operation` (`DOID`, `drawer_op_day`, `drawer_op_type`, `drawer_op_amount`, `drawer_op_reason`) VALUES
(93, '2018-07-09', 'return', '15000.00', 'دين'),
(94, '2018-07-09', 'return', '18000.00', 'دين'),
(95, '2018-07-09', 'withdrawal', '25000.00', 'سحب '),
(96, '2018-07-08', 'return', '36000.00', 'دين '),
(97, '2018-07-08', 'withdrawal', '96000.00', 'سحب مبلغ'),
(98, '2018-07-09', 'return', '500.00', 'ي'),
(99, '2018-07-09', '150000', '0.00', 'بلا بلا'),
(100, '2018-07-09', 'withdrawal', '1800000.00', 'بلابلا'),
(101, '2018-07-09', 'withdrawal', '18000.00', 'سيشسي'),
(102, '2018-07-09', 'withdrawal', '14500.00', 'يسيشسي'),
(103, '2018-07-09', 'withdrawal', '41000.00', 'يشسي'),
(104, '2018-07-10', 'withdrawal', '3000.00', ''),
(105, '2018-07-10', 'withdrawal', '15000.00', 'sadds'),
(106, '2018-07-10', 'withdrawal', '15000.00', 'sadasd'),
(107, '2018-07-10', 'withdrawal', '30000.00', ''),
(108, '2018-07-10', 'return', '182000.00', 'asdsd'),
(109, '2018-07-10', 'withdrawal', '2000.00', ''),
(110, '2018-07-10', 'withdrawal', '2000.00', ''),
(111, '2018-07-10', 'withdrawal', '1000.00', 'sdsad'),
(112, '2018-07-10', 'return', '3000.00', ''),
(113, '2018-07-10', 'return', '5000.00', ''),
(114, '2018-07-10', 'return', '180000.00', ''),
(115, '2018-07-10', 'return', '15000.00', ''),
(116, '2018-07-10', 'return', '12.00', ''),
(117, '2018-07-10', 'return', '12.00', ''),
(118, '2018-07-10', 'return', '15000.00', 'دين'),
(119, '2018-07-10', 'withdrawal', '50000.00', 'سشبسيب'),
(120, '2018-07-10', 'return', '60000.00', ''),
(121, '2018-07-10', 'return', '15000.00', ''),
(122, '2018-07-10', 'return', '15000.00', ''),
(123, '2018-07-10', 'return', '88000.00', ''),
(124, '2018-07-10', 'return', '44000.00', ''),
(125, '2018-07-10', 'return', '17000.00', ''),
(126, '2018-07-10', 'return', '158000000.00', ''),
(127, '2018-07-10', 'return', '19000.00', ''),
(128, '2018-07-10', 'withdrawal', '15000.00', ''),
(129, '2018-07-10', 'withdrawal', '3000000.00', ''),
(130, '2018-07-10', 'withdrawal', '1.00', '');

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

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`IID`, `item_name`, `item_cost`, `item_selling`) VALUES
(1, 'alcohol', '10.00', '12.00'),
(2, 'essence', '15.00', '20.00'),
(3, 'bottle', '8.00', '12.00'),
(4, 'essence  | 500', '3.60', '15.00'),
(5, 'essence2', '13.00', '15.00'),
(6, 'essence2 essence | 500', '14.25', '29.00');

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

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`ODID`, `ord_det_CID`, `ord_det_code`, `ord_det_total_price`, `ord_det_rem_amount`, `ord_det_date`, `ord_det_profit`) VALUES
(1, NULL, 'SS-1', '399.00', '0.00', '2018-07-05', '387.000'),
(2, 2, 'SS-2', '38.00', '0.00', '2018-07-05', '26.000'),
(3, 2, 'SS-3', '24.00', '0.00', '2018-07-09', '14.000'),
(4, 4, 'SS-4', '64.00', '14.00', '2018-07-10', '39.000');

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

--
-- Dumping data for table `order_s`
--

INSERT INTO `order_s` (`OID`, `ord_ODID`, `ord_IID`, `ord_k_name`, `ord_quantity`, `ord_price`, `ord_profit`) VALUES
(1, 1, 1, '', 21, '19.00', '387.00'),
(2, 2, 1, '', 2, '19.00', '26.00'),
(3, 3, 1, '', 2, '12.00', '14.00'),
(4, 4, 2, '', 2, '20.00', '25.00'),
(5, 4, 1, '', 2, '12.00', '14.00');

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

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`SRID`, `supplier_name`, `supplier_phone`, `supplier_address`, `supplier_debit`) VALUES
(1, 'عبدالله ويزاني', '03125521', 'تبنين', '140000.00');

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

--
-- Dumping data for table `supply`
--

INSERT INTO `supply` (`SID`, `sup_SDID`, `sup_IID`, `sup_quan`, `sup_cost`, `sup_selling_price`, `sup_total_cost`, `sup_date_exp`) VALUES
(1, 1, 1, 15, '12.00', '19.00', '180.00', NULL),
(2, 2, 1, 15, '12.00', '13.00', '180.00', NULL),
(3, 3, 2, 2, '5.00', '10.00', '10.00', NULL),
(4, 3, 3, 2, '4.00', '6.00', '8.00', NULL),
(5, 4, 2, 2, '15.00', '20.00', '30.00', NULL),
(6, 4, 5, 23, '13.00', '15.00', '299.00', NULL),
(7, 4, 1, 2, '10.00', '12.00', '20.00', NULL),
(8, 4, 3, 25, '8.00', '12.00', '200.00', NULL);

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
-- Dumping data for table `supply_detail`
--

INSERT INTO `supply_detail` (`SDID`, `sup_det_SRID`, `sup_det_code`, `sup_det_total_price`, `sup_det_rem_amount`, `sup_det_date`) VALUES
(1, 1, 'BI-1', '180.00', '0.00', '2018-07-05'),
(2, 1, 'BI-2', '180.00', '0.00', '2018-07-05'),
(3, 1, 'BI-3', '18.00', '0.00', '2018-07-06'),
(4, 1, 'BI-4', '549.00', '0.00', '2018-07-06');

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
  ADD PRIMARY KEY (`drawer_Date`);

--
-- Indexes for table `drawer_operation`
--
ALTER TABLE `drawer_operation`
  ADD PRIMARY KEY (`DOID`),
  ADD KEY `drawer_op_day` (`drawer_op_day`);

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
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `drawer_operation`
--
ALTER TABLE `drawer_operation`
  MODIFY `DOID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `IID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `ODID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `order_s`
--
ALTER TABLE `order_s`
  MODIFY `OID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `SRID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `supply`
--
ALTER TABLE `supply`
  MODIFY `SID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `supply_detail`
--
ALTER TABLE `supply_detail`
  MODIFY `SDID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
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
-- Constraints for table `drawer_operation`
--
ALTER TABLE `drawer_operation`
  ADD CONSTRAINT `drawer_operation_ibfk_1` FOREIGN KEY (`drawer_op_day`) REFERENCES `drawer` (`drawer_Date`) ON DELETE CASCADE ON UPDATE CASCADE;

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
