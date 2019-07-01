-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: moneymaster
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `isCore` tinyint(1) DEFAULT '0',
  `isReal` tinyint(1) DEFAULT '0',
  `color` varchar(7) DEFAULT '#000000',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Mein Konto',0,'Dieses Konto repräsentiert ein real vorkommendes Konto.',0,1,'#FF0000');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderAccount` varchar(100) NOT NULL,
  `bookingDate` datetime NOT NULL,
  `validDate` datetime DEFAULT NULL,
  `bookingType` varchar(100) NOT NULL,
  `purpose` varchar(1000) NOT NULL,
  `believerId` varchar(100) DEFAULT NULL,
  `mandateReference` varchar(300) DEFAULT NULL,
  `customerReference` varchar(300) DEFAULT NULL,
  `payPartner` varchar(150) DEFAULT NULL,
  `iban` varchar(50) NOT NULL,
  `bic` varchar(25) NOT NULL,
  `value` varchar(20) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `info` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5837 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (5758,'DE14800530004011078986','1970-01-01 01:00:00','1970-01-01 01:00:00','BASISZAHLUNG','Enthaltenes Geld seit der Erstellung des Kontos','','','','QUENTIN WEBER','DE14800530004011078986','NOLADE21BLK','724.07','EUR','Umsatz gebucht');

/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `accountUpdate_Insert` AFTER INSERT ON `bookings` FOR EACH ROW BEGIN
	SET SQL_SAFE_UPDATES = 0;
    UPDATE  moneymaster.accounts a SET a.value= (SELECT SUM(value) FROM moneymaster.bookings)
    WHERE a.isReal = 1;
    INSERT INTO moneymaster.virtual_bookings (booking_id, category_id, value, name) VALUES (new.id, 1, new.value, new.payPartner);
	UPDATE moneymaster.accounts as a,
	(SELECT SUM(value) as v FROM moneymaster.bookings) as b,
	(SELECT SUM(value) as v from moneymaster.accounts WHERE isCore = 0 AND isReal = 0) as c
	SET value = b.v - c.v WHERE a.isCore = 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `accountUpdate_Update` AFTER UPDATE ON `bookings` FOR EACH ROW BEGIN
	SET SQL_SAFE_UPDATES = 0;
    UPDATE  accounts a SET a.value= (SELECT SUM(value) FROM moneymaster.bookings)
    WHERE a.isReal = 1;
	UPDATE moneymaster.accounts as a,
	(SELECT SUM(value) as v FROM moneymaster.bookings) as b,
	(SELECT SUM(value) as v from moneymaster.accounts WHERE isCore = 0 AND isReal = 0) as c
	SET value = b.v - c.v WHERE a.isCore = 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `accountUpdate_Delete` AFTER DELETE ON `bookings` FOR EACH ROW BEGIN
	SET SQL_SAFE_UPDATES = 0;
	UPDATE  accounts a SET a.value= (SELECT SUM(value) FROM moneymaster.bookings)
    WHERE a.isReal = 1;
    DELETE FROM moneymaster.virtual_bookings WHERE booking_id = old.id AND category_id = 1 AND value= old.value AND name=old.payPartner;
	UPDATE moneymaster.accounts as a,
	(SELECT SUM(value) as v FROM moneymaster.bookings) as b,
	(SELECT SUM(value) as v from moneymaster.accounts WHERE isCore = 0 AND isReal = 0) as c
	SET value = b.v - c.v WHERE a.isCore = 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `color` varchar(7) DEFAULT '#000000',
  `isStandard` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sonstige','Alle nicht zugeordneten Buchungen.','#00ff00',1);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `short_description`
--

DROP TABLE IF EXISTS `short_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `short_description` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `originalContent` varchar(300) DEFAULT NULL,
  `replaceContent` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `short_description`
--

LOCK TABLES `short_description` WRITE;
/*!40000 ALTER TABLE `short_description` DISABLE KEYS */;
/*!40000 ALTER TABLE `short_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `virtual_bookings`
--

DROP TABLE IF EXISTS `virtual_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `virtual_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `account_id_idx` (`account_id`),
  KEY `booking_id_idx` (`booking_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `booking_id` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=712 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `virtual_bookings`
--

LOCK TABLES `virtual_bookings` WRITE;
/*!40000 ALTER TABLE `virtual_bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `virtual_bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-29 12:16:11
