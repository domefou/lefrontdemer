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

-- Création de la base
/* CREATE DATABASE IF NOT EXISTS `le_front_de_mer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci; */

-- Création de l’utilisateur
/* CREATE USER 'frontmer_user' @'%' IDENTIFIED BY 'LFDM2025'; */

-- Attribution des privilèges
/* GRANT ALL PRIVILEGES ON le_front_de_mer.* TO 'frontmer_user' @'%'; */

/* FLUSH PRIVILEGES; */

-- Utilisation de la base de données
/* USE `le_front_de_mer`; */

-- Utilisation de la base de données railway
USE `railway`;

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

-- ------------------------------------------------------------------------------------
-- Insertion des données
-- ------------------------------------------------------------------------------------

-- Insertion des utilisateurs
INSERT INTO
    `user` (
        `id_user`,
        `nom`,
        `password`,
        `mail`,
        `telephone`,
        `role`,
        `created_at`,
        `updated_at`
    )
VALUES (
        0,
        'Utilisateur supprimé',
        '',
        'deleted@system.local',
        NULL,
        'user',
        NOW(),
        NOW()
    ),
    (
        1,
        'admin',
        '$2b$10$O1ETN.EejhYMyzwrod8V9.gNBwmVZjjdiDnkL6Eg0CW9J8OWU62cW',
        'lefrontdemer.NoReply@gmail.com',
        NULL,
        'admin',
        '2025-09-11 14:14:14',
        '2025-11-04 20:13:16'
    );
-- ---------------------------------------------------------
-- Insertion des catégories
INSERT INTO
    `categorie` (
        `id_categorie`,
        `nom`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        'entrée',
        '2025-08-28 17:01:32',
        '2025-08-28 17:01:32'
    ),
    (
        2,
        'plat',
        '2025-08-28 17:01:45',
        '2025-08-28 17:01:45'
    ),
    (
        3,
        'dessert',
        '2025-08-28 17:01:55',
        '2025-08-28 17:01:55'
    ),
    (
        4,
        'boisson',
        '2025-08-28 17:02:04',
        '2025-08-28 17:02:04'
    );
-- --------------------------------------------------------
-- Insertion des articles
INSERT INTO
    `article` (
        `id_article`,
        `id_categorie`,
        `nom`,
        `prix`,
        `detail`,
        `photo1`,
        `photo2`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        1,
        'Potage aux saveurs de printemps',
        19.90,
        'Bouillon de légumes, carotte des sables, pomme de terre de Noirmoutier, navet blond, cidre brut.',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465550/asopado-3419629_640_zihtfm.jpg',
        NULL,
        '2025-08-28 17:20:40',
        '2025-11-04 16:22:33'
    ),
    (
        2,
        2,
        'Assiette de fruit de mer.',
        17.60,
        'Langoustine, crevette, bulot, bigorneaux (criée des Sables d\'Olonne).',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465567/seafood-soup-4505211_640_xsg80u.jpg',
        NULL,
        '2025-08-28 17:20:40',
        '2025-08-29 13:10:56'
    ),
    (
        3,
        1,
        'Assiette d\'huitres (6)',
        13.00,
        'Huitre origine (Talmont st hilaire).',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465566/oysters-1958668_640_yoe4pj.jpg',
        NULL,
        '2025-08-28 17:23:03',
        '2025-09-21 15:16:45'
    ),
    (
        4,
        2,
        'Bavette de boeuf.',
        14.60,
        'Viande origine France, garniture au choix.',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465551/food-2456100_640_lnk2us.jpg',
        NULL,
        '2025-08-28 17:30:22',
        '2025-08-29 13:11:18'
    ),
    (
        5,
        2,
        'Foie gras poêlé, et légumes d\'antan.',
        16.80,
        'Foie gras label rouge (origine France), crosnes, salsifis, topinambour et betterave blanche.',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465552/foie-gras-1762238_640_djobly.jpg',
        NULL,
        '2025-08-28 17:30:22',
        '2025-08-29 13:11:38'
    ),
    (
        6,
        1,
        'Aumonière de volaille et légumes d\'antan.',
        16.40,
        'Pintade de Challans label rouge, Betterave, Butternut, Carotte jaunes. ',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465549/appetizer-plate-941284_640_qlnvlw.jpg',
        NULL,
        '2025-08-28 17:59:11',
        '2025-10-08 14:17:28'
    ),
    (
        7,
        3,
        'Moelleux fèves de tonka, vanille bourbon et crème d\'amande.',
        12.20,
        'Fèves de tonka, Vanille bourbon ,Amande douce et Crème.',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465552/desert-813924_640_qwmsko.jpg',
        NULL,
        '2025-08-28 18:11:06',
        '2025-08-29 13:11:57'
    ),
    (
        8,
        3,
        'Entremet passion',
        10.20,
        'Biscuit cacao, mousse fruit de la passion, gelée de mangue et crémeux coco',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1758206611/cake-1284548_640_x0jcod.jpg',
        NULL,
        '2025-08-28 18:11:06',
        '2025-09-18 14:46:42'
    ),
    (
        9,
        3,
        'Mille feuille pancake.',
        12.20,
        'Pancake a la farine d\'épeautre, sauce chocolat noir (équateur), noix de pécan, crème d\'Isigny (AOP).',
        'https://res.cloudinary.com/dtai1ysvg/image/upload/v1756465569/pancakes-5989136_640_rylmzu.jpg',
        NULL,
        '2025-08-28 18:13:38',
        '2025-08-29 13:12:41'
    );

-- -------------------------------------------------------
-- Insertion des menus

INSERT INTO
    `menu` (
        `id_menu`,
        `nom`,
        `prix`,
        `entree`,
        `plat`,
        `dessert`,
        `boisson`,
        `photo1`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        'Terre et mer.',
        17.00,
        'Terrine de cabillaud, farandole de pickles.',
        'Filet de pintade accompagné de légumes estivaux.',
        'crème brulé banane',
        'Verre de vin blanc ou cocktail du jour.',
        NULL,
        '2025-08-28 17:12:50',
        '2025-11-04 16:22:23'
    );

-- ----------------------------------------------------------------------
-- Insertion des réservations
INSERT INTO
    `reservation` (
        `id_reservation`,
        `id_user`,
        `date`,
        `heure`,
        `nbr_couvert`,
        `created_at`,
        `updated_at`,
        `etat`
    )
VALUES (
        1,
        1,
        '2025-09-20',
        '18:00:00',
        2,
        '2025-09-17 18:13:50',
        '2025-10-01 16:13:53',
        'acceptée'
    ),
    (
        2,
        1,
        '2025-10-24',
        '13:30:00',
        3,
        '2025-09-28 17:06:32',
        '2025-10-01 14:26:14',
        'refusée'
    ),
    (
        3,
        1,
        '2025-10-01',
        '19:00:00',
        3,
        '2025-10-01 14:32:09',
        '2025-10-01 14:34:45',
        'acceptée'
    ),
    (
        4,
        1,
        '2025-10-17',
        '13:15:00',
        5,
        '2025-10-04 16:23:30',
        '2025-10-04 17:27:24',
        'acceptée'
    ),
    (
        5,
        1,
        '2025-11-01',
        '19:45:00',
        6,
        '2025-10-04 16:23:39',
        '2025-10-04 17:27:23',
        'acceptée'
    ),
    (
        6,
        1,
        '2025-10-29',
        '12:00:00',
        2,
        '2025-10-04 16:23:48',
        '2025-10-04 17:27:23',
        'acceptée'
    ),
    (
        7,
        1,
        '2025-11-20',
        '13:45:00',
        1,
        '2025-10-04 16:23:56',
        '2025-10-04 17:27:22',
        'acceptée'
    ),
    (
        8,
        1,
        '2025-12-18',
        '13:30:00',
        5,
        '2025-10-04 16:24:07',
        '2025-10-04 17:27:20',
        'acceptée'
    ),
    (
        9,
        1,
        '2025-11-20',
        '19:15:00',
        5,
        '2025-10-04 17:28:16',
        '2025-10-04 17:28:19',
        'refusée'
    ),
    (
        10,
        1,
        '2025-10-17',
        '13:45:00',
        6,
        '2025-10-04 17:30:50',
        '2025-10-08 13:37:37',
        'acceptée'
    ),
    (
        11,
        1,
        '2025-10-16',
        '19:30:00',
        4,
        '2025-10-11 20:46:33',
        '2025-10-15 19:37:52',
        'refusée'
    ),
    (
        12,
        1,
        '2025-10-16',
        '19:30:00',
        6,
        '2025-10-11 20:49:51',
        '2025-10-15 19:37:53',
        'refusée'
    ),
    (
        13,
        1,
        '2025-10-16',
        '19:00:00',
        4,
        '2025-10-15 19:38:45',
        '2025-10-15 19:46:04',
        'acceptée'
    ),
    (
        14,
        1,
        '2025-11-27',
        '13:30:00',
        6,
        '2025-10-15 19:47:06',
        '2025-10-15 19:47:49',
        'refusée'
    ),
    (
        15,
        1,
        '2025-11-29',
        '19:15:00',
        4,
        '2025-10-15 19:47:22',
        '2025-10-15 19:47:48',
        'refusée'
    );

/* 40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/* 40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/* 40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;