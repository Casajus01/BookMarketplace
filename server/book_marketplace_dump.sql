-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: book_marketplace
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isbn` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year_published` smallint unsigned DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'The Great Gatsby','F. Scott Fitzgerald','9780141182636',NULL,NULL),(2,'To Kill a Mockingbird','Harper Lee','9780061120084',NULL,NULL),(3,'1984','George Orwell','9780451524935',NULL,NULL),(5,'The Great Gatsby','F. Scott Fitzgerald','9780743273565',NULL,NULL),(6,'Brave New World','Aldous Huxley','9780060850524',NULL,NULL),(7,'Pride and Prejudice','Jane Austen','9780141439518',NULL,NULL),(8,'The Catcher in the Rye','J.D. Salinger','9780316769488',NULL,NULL),(9,'Fahrenheit 451','Ray Bradbury','9781451673319',NULL,NULL),(10,'The Hobbit','J.R.R. Tolkien','9780547928227',NULL,NULL),(11,'Moby-Dick','Herman Melville','9780142437247',NULL,NULL),(62,'Norwegian Wood','Haruki Murakami','9780375704024',NULL,NULL),(63,'Kafka on the Shore','Haruki Murakami','9781400079278',NULL,NULL),(64,'The Wind-Up Bird Chronicle','Haruki Murakami','9780679775430',NULL,NULL),(65,'A Man Called Ove','Fredrik Backman','9781476738024',NULL,NULL),(66,'Eleanor Oliphant Is Completely Fine','Gail Honeyman','9780735220683',NULL,NULL),(67,'Where the Crawdads Sing','Delia Owens','9780735219106',NULL,NULL),(68,'The Midnight Library','Matt Haig','9780525559474',NULL,NULL),(69,'Verity','Colleen Hoover','9781791392796',NULL,NULL),(70,'It Ends with Us','Colleen Hoover','9781501110368',NULL,NULL),(71,'It Starts with Us','Colleen Hoover','9781668001226',NULL,NULL),(72,'Ugly Love','Colleen Hoover','9781476753188',NULL,NULL),(73,'November 9','Colleen Hoover','9781501110344',NULL,NULL),(74,'Reminders of Him','Colleen Hoover','9781542025607',NULL,NULL),(75,'The Seven Husbands of Evelyn Hugo','Taylor Jenkins Reid','9781501161933',NULL,NULL),(76,'Daisy Jones & The Six','Taylor Jenkins Reid','9781524798628',NULL,NULL),(77,'Malibu Rising','Taylor Jenkins Reid','9781524798659',NULL,NULL),(78,'Carrie Soto Is Back','Taylor Jenkins Reid','9780593158437',NULL,NULL),(79,'Before We Were Strangers','Renée Carlino','9781501105777',NULL,NULL),(80,'Swear on This Life','Renée Carlino','9781501105791',NULL,NULL),(81,'The Invisible Life of Addie LaRue','V.E. Schwab','9780765387561',NULL,NULL),(82,'A Court of Thorns and Roses','Sarah J. Maas','9781635575569',NULL,NULL),(83,'A Court of Mist and Fury','Sarah J. Maas','9781619634466',NULL,NULL),(84,'A Court of Wings and Ruin','Sarah J. Maas','9781619634480',NULL,NULL),(85,'A Court of Frost and Starlight','Sarah J. Maas','9781681196312',NULL,NULL),(86,'A Court of Silver Flames','Sarah J. Maas','9781681196282',NULL,NULL),(87,'Throne of Glass','Sarah J. Maas','9781619630345',NULL,NULL),(88,'Crescent City','Sarah J. Maas','9781635574043',NULL,NULL),(89,'Fourth Wing','Rebecca Yarros','9781649374042',NULL,NULL),(90,'Iron Flame','Rebecca Yarros','9781649374172',NULL,NULL),(91,'The House in the Cerulean Sea','TJ Klune','9781250217318',NULL,NULL),(92,'Under the Whispering Door','TJ Klune','9781250217349',NULL,NULL),(93,'Legends & Lattes','Travis Baldree','9781250886088',NULL,NULL),(94,'Book Lovers','Emily Henry','9780593334831',NULL,NULL),(95,'People We Meet on Vacation','Emily Henry','9781984806758',NULL,NULL),(96,'Beach Read','Emily Henry','9781984806734',NULL,NULL),(97,'Happy Place','Emily Henry','9780593441270',NULL,NULL),(98,'Things We Never Got Over','Lucy Score','9781945631832',NULL,NULL),(99,'Things We Hide from the Light','Lucy Score','9781945631900',NULL,NULL),(100,'The Love Hypothesis','Ali Hazelwood','9780593336828',NULL,NULL),(101,'Love on the Brain','Ali Hazelwood','9780593336842',NULL,NULL),(102,'The Spanish Love Deception','Elena Armas','9781668002520',NULL,NULL),(103,'The American Roommate Experiment','Elena Armas','9781668002773',NULL,NULL),(104,'Twisted Love','Ana Huang','9781728274869',NULL,NULL),(105,'Twisted Games','Ana Huang','9781728274876',NULL,NULL),(106,'Twisted Hate','Ana Huang','9781728274883',NULL,NULL),(107,'Twisted Lies','Ana Huang','9781728274890',NULL,NULL),(108,'King of Wrath','Ana Huang','9781957464056',NULL,NULL),(109,'King of Pride','Ana Huang','9781957464070',NULL,NULL),(110,'Test Book','Geronimo Meneses Casajus',NULL,NULL,NULL),(111,'Test Book 2','Geronimo Meneses Casajus',NULL,NULL,NULL),(112,'new test','Nick Meneses',NULL,NULL,NULL);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing` (
  `listing_id` int unsigned NOT NULL AUTO_INCREMENT,
  `poster_id` int unsigned NOT NULL,
  `date_posted` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','verified') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `type` enum('purchase','trade') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`listing_id`),
  KEY `poster_id` (`poster_id`),
  CONSTRAINT `listing_ibfk_1` FOREIGN KEY (`poster_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (1,1,'2025-04-22 19:14:57','pending','purchase'),(3,1,'2025-04-22 19:15:39','pending','purchase'),(4,1,'2025-04-22 19:16:38','pending','trade'),(6,1,'2025-04-22 19:24:26','pending','trade'),(9,1,'2025-04-22 20:17:32','pending','purchase'),(10,1,'2025-04-23 00:11:18','pending','purchase'),(11,1,'2025-04-23 00:11:19','pending','purchase'),(12,1,'2025-04-23 00:14:57','pending','purchase'),(13,1,'2025-04-23 00:52:12','pending','purchase'),(14,1,'2025-04-23 01:01:51','pending','purchase'),(15,2,'2025-04-23 01:15:55','pending','trade'),(16,2,'2025-04-23 01:22:36','pending','trade'),(17,2,'2025-04-23 01:32:20','pending','trade'),(34,2,'2025-04-23 02:36:23','pending','trade'),(35,2,'2025-04-23 02:42:28','pending','purchase');
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order` (
  `listing_id` int unsigned NOT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` decimal(10,2) NOT NULL,
  `seller_id` int unsigned NOT NULL,
  `buyer_id` int unsigned DEFAULT NULL,
  `book_id` int unsigned NOT NULL,
  `book_condition` enum('New','Used - Like New','Good','Fair','Poor') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`listing_id`),
  KEY `seller_id` (`seller_id`),
  KEY `book_id` (`book_id`),
  KEY `purchase_order_ibfk_3` (`buyer_id`),
  CONSTRAINT `purchase_order_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`) ON DELETE CASCADE,
  CONSTRAINT `purchase_order_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `purchase_order_ibfk_3` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `purchase_order_ibfk_4` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
INSERT INTO `purchase_order` VALUES (9,'2025-04-22 20:17:32',12.99,1,2,1,'Good'),(10,'2025-04-23 00:11:18',25.00,1,2,1,'Good'),(11,'2025-04-23 00:11:19',25.00,1,2,1,'Good'),(12,'2025-04-23 00:14:57',20.00,1,2,1,'Good'),(13,'2025-04-23 00:52:13',4.00,1,2,110,'Good'),(14,'2025-04-23 01:01:51',51.50,1,2,1,'Good'),(35,'2025-04-23 02:42:28',22.00,2,NULL,5,'Good');
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_item`
--

DROP TABLE IF EXISTS `trade_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trade_item` (
  `trade_item_id` int unsigned NOT NULL AUTO_INCREMENT,
  `listing_id` int unsigned NOT NULL,
  `owner_id` int unsigned NOT NULL,
  `book_id` int unsigned NOT NULL,
  `book_condition` enum('New','Used - Like New','Good','Fair','Poor') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`trade_item_id`),
  KEY `listing_id` (`listing_id`),
  KEY `owner_id` (`owner_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `trade_item_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `trade_order` (`listing_id`) ON DELETE CASCADE,
  CONSTRAINT `trade_item_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `trade_item_ibfk_3` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_item`
--

LOCK TABLES `trade_item` WRITE;
/*!40000 ALTER TABLE `trade_item` DISABLE KEYS */;
INSERT INTO `trade_item` VALUES (3,17,2,3,'Good'),(4,34,2,3,'Good');
/*!40000 ALTER TABLE `trade_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_order`
--

DROP TABLE IF EXISTS `trade_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trade_order` (
  `listing_id` int unsigned NOT NULL,
  `trade_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`listing_id`),
  CONSTRAINT `trade_order_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_order`
--

LOCK TABLES `trade_order` WRITE;
/*!40000 ALTER TABLE `trade_order` DISABLE KEYS */;
INSERT INTO `trade_order` VALUES (15,'2025-04-23 01:15:55'),(16,'2025-04-23 01:22:36'),(17,'2025-04-23 01:32:20'),(34,'2025-04-23 02:36:23');
/*!40000 ALTER TABLE `trade_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','regular') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'regular',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'geronimo','geronimo@example.com','$2b$10$FOUOZQduMU0tHEG6quCRWuzPgMn/q.rK4DHWvmk6TqjUsJe5u1R6K','regular'),(2,'alice','alice@example.com','$2b$10$80COyGpLKjAbv8K2O/PLtecwFyNG6p266S0dNxXh7eTKJqVLh5hWK','regular'),(3,'bob','bob@example.com','$2b$10$7gb0ApXWhHvgn0lqWsSGieWM0ZU6WAiShKJCii.Qk.OQjhT5PlLd.','regular'),(4,'charlie','charlie@example.com','$2b$10$ptUCirUVS93GRc8TrXrVMuVcgsjVuRCNq1W3M/6e2AX95RcrjA2au','regular'),(5,'Larry Bird','Larry.Bird@gmail.com','$2b$10$M9DMZfsSVhRRRVfpORKx0.sj54WsweO2/lVQ2xVe0gCpGwGzEeVHO','regular'),(6,'test123 test456','testemail@example.com','$2b$10$tFDH9FA8f/DijUVHoAw70OsSZqQkJzGuyYMZDEqeBnyBr.BlJGOJ2','regular'),(8,'Usain Bolt','usainbolt@gmail.com','$2b$10$W1IK4GC/eU8PyBk8vK7d6eegH5epLbnZJ8W61RmbifKrZCsxlmlvC','regular'),(9,'Lebron James','bron@gmail.com','$2b$10$Jm0piTKpWtpMPSoIGsHDNOH9t2KnEkPBRPkRHqNzuQ.b.SkuOalh.','regular');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_review`
--

DROP TABLE IF EXISTS `user_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_review` (
  `review_id` int unsigned NOT NULL AUTO_INCREMENT,
  `reviewer_id` int unsigned NOT NULL,
  `reviewee_id` int unsigned NOT NULL,
  `rating` tinyint unsigned DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `review_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `reviewer_id` (`reviewer_id`),
  KEY `reviewee_id` (`reviewee_id`),
  CONSTRAINT `user_review_ibfk_1` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_review_ibfk_2` FOREIGN KEY (`reviewee_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_review`
--

LOCK TABLES `user_review` WRITE;
/*!40000 ALTER TABLE `user_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wishlist_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_item`
--

DROP TABLE IF EXISTS `wishlist_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_item` (
  `wishlist_id` int unsigned NOT NULL,
  `book_id` int unsigned NOT NULL,
  PRIMARY KEY (`wishlist_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `wishlist_item_ibfk_1` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlist` (`wishlist_id`) ON DELETE CASCADE,
  CONSTRAINT `wishlist_item_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_item`
--

LOCK TABLES `wishlist_item` WRITE;
/*!40000 ALTER TABLE `wishlist_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23  2:46:52
