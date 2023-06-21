-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 21, 2023 at 09:57 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `firstname`, `lastname`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Admin', 'Consult', 'consulting@siit.tu.ac.th', 'admin12345', 'admin', '2022-06-14 15:02:55', '2023-06-21 02:59:47'),
(2, 'nonpawiz', 'Nonpawit', 'Thonthong', 'nonpawit.dev@gmail.com', '12345', 'user', NULL, NULL),
(3, 'sumet', 'Sumet', 'Kesornkaew', 'sumet.k@gmail.com', '12345', 'user', NULL, NULL),
(4, 'wow', 'dasds', 'adsadsa', 'dsadsa', 'dsdsadsad', 'user', NULL, NULL),
(5, 'dsadsad', 'sadsa', 'dsadsa', 'dsads', 'adsadsad', 'user', NULL, NULL),
(6, 'dsadsad', 'sadsad', 'sadsad', 'sadsad', 'sadsadsad', 'user', NULL, NULL),
(7, 'sdsad', 'dsadsa', 'dsadsa', 'adsadsad', 'dsadsad', 'user', '2023-06-20 08:26:09', '2023-06-20 08:26:09'),
(8, 'dsadsa', 'dsads', 'adsad', 'sadsadds', 'sadsadsa', 'user', NULL, '2023-06-20 08:27:17'),
(9, 'dsadsad', 'sadsad', 'sadsa', 'dsadsa', 'dsadsad', 'user', NULL, NULL),
(10, 'dsadsa', 'dsadsa', 'dsadsa', 'dsadsa', 'dsadsadsa', 'user', NULL, NULL),
(11, 'dsadsa', 'dsadsa', 'dsad', 'sadsads', 'adsadsadsa', 'user', NULL, NULL),
(12, 'dsads', 'dsadsad', 'sadsad', 'sadsad', 'sadsadsad', 'user', NULL, NULL),
(13, 'dsadsad', 'sadsa', 'dsad', 'sadsad', 'sadsadsad', 'user', NULL, NULL),
(14, 'dsadsad', 'sadsa', 'dsad', 'sadsad', 'sadsadsad', 'user', '2023-06-20 08:37:32', '2023-06-20 08:37:32'),
(15, 'dsadsad', 'sadsa', 'dsad', 'sadsad', 'sadsadsad', 'user', '2023-06-20 08:37:54', '2023-06-20 08:37:54'),
(16, 'dsadsad', 'sadsa', 'dsad', 'sadsad', 'sadsadsad', 'user', '2023-06-20 08:37:56', '2023-06-20 08:37:56'),
(17, 'sdsad', 'dsadsa', 'sdasdasd', 'dsadsa', 'dsadsad', 'user', '2023-06-20 08:38:06', '2023-06-20 08:38:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
