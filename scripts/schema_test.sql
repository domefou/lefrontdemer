-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 22 nov. 2025 à 17:24
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET
    sql_mode = 'STRICT_ALL_TABLES,STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE';

START TRANSACTION;

SET time_zone = "+00:00";

-- On utilise la base créée par test.sql
USE `restaurant_test`;

-- ------------------------------------------------------
-- Table des catégories
DROP TABLE IF EXISTS categorie;

CREATE TABLE categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table des articles
DROP TABLE IF EXISTS article;

CREATE TABLE article (
    id_article INT AUTO_INCREMENT PRIMARY KEY,
    id_categorie INT NOT NULL,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    detail VARCHAR(255) NOT NULL,
    photo1 TEXT NOT NULL,
    photo2 TEXT DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_article_categorie FOREIGN KEY (id_categorie) REFERENCES categorie (id_categorie) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table des utilisateurs
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) DEFAULT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table menu du jour
DROP TABLE IF EXISTS menu;

CREATE TABLE menu (
    id_menu INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    entree VARCHAR(255) NOT NULL,
    plat VARCHAR(255) NOT NULL,
    dessert VARCHAR(255) NOT NULL,
    boisson VARCHAR(255) NOT NULL,
    photo1 TEXT DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table des réservations
DROP TABLE IF EXISTS reservation;

CREATE TABLE reservation (
    id_reservation INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT DEFAULT NULL,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    nbr_couvert INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    etat VARCHAR(255) NOT NULL DEFAULT 'en attente',
    CONSTRAINT fk_reservation_user FOREIGN KEY (id_user) REFERENCES user (id_user) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

COMMIT;