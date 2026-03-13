-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 22 nov. 2025 à 17:24
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*  LOCAL */
-- Création de la base
CREATE DATABASE IF NOT EXISTS `le_front_de_mer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Création de l’utilisateur
CREATE USER 'frontmer_user' @'%' IDENTIFIED BY 'LFDM2025';

-- Attribution des privilèges
GRANT ALL PRIVILEGES ON le_front_de_mer.* TO 'frontmer_user' @'%';

FLUSH PRIVILEGES;

-- Utilisation de la base de données local
USE `le_front_de_mer`;

/* TEST
USE `restaurant_test`;
*/

/* EN LIGNE

-- Utilisation de la base de données railway
-- USE `railway`;

*/

/* base de données test */

-- ------------------------------------------------------

-- Table des catégories
CREATE TABLE `categorie` (
    `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
    `nom` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id_categorie`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ------------------------------------------------------

-- Table des articles
CREATE TABLE `article` (
    `id_article` INT(11) NOT NULL AUTO_INCREMENT,
    `id_categorie` INT(11) NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `prix` DECIMAL(10, 2) NOT NULL,
    `detail` VARCHAR(255) NOT NULL,
    `photo1` TEXT NOT NULL,
    `photo2` TEXT DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_article`),
    KEY `id_categorie` (`id_categorie`),
    CONSTRAINT `article_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ------------------------------------------------------

-- Table des utilisateurs
CREATE TABLE `user` (
    `id_user` INT(11) NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `mail` VARCHAR(255) NOT NULL,
    `telephone` VARCHAR(20) DEFAULT NULL,
    `role` VARCHAR(255) NOT NULL DEFAULT 'user',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_user`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `menu du jour`
--

CREATE TABLE `menu` (
    `id_menu` int(11) NOT NULL AUTO_INCREMENT,
    `nom` varchar(255) NOT NULL,
    `prix` decimal(10, 2) NOT NULL,
    `entree` varchar(255) NOT NULL,
    `plat` varchar(255) NOT NULL,
    `dessert` varchar(255) NOT NULL,
    `boisson` varchar(255) NOT NULL,
    `photo1` text DEFAULT NULL,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id_menu`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ------------------------------------------------------

-- Table des réservations
CREATE TABLE `reservation` (
    `id_reservation` INT(11) NOT NULL AUTO_INCREMENT,
    `id_user` INT(11) DEFAULT NULL,
    `date` DATE NOT NULL,
    `heure` TIME NOT NULL,
    `nbr_couvert` INT(11) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `etat` VARCHAR(255) NOT NULL DEFAULT 'en attente',
    PRIMARY KEY (`id_reservation`),
    KEY `id_user` (`id_user`),
    CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;