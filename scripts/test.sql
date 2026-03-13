-- SCRIPT DE TEST

-- 1. Recréation d'une base propre
DROP DATABASE IF EXISTS restaurant_test;

CREATE DATABASE restaurant_test;

USE restaurant_test;

-- 2. Import du schéma principal
SOURCE ./scripts/schema_test.sql;

-- ============================
-- 3. TESTS DES TABLES
-- ============================

-- --- Test catégories ---
INSERT INTO
    categorie (nom)
VALUES ('Entrées'),
    ('Plats'),
    ('Desserts');

-- Test : insertion invalide (nom NULL)
-- Doit échouer
INSERT INTO categorie (nom) VALUES (NULL);

-- --- Test articles ---
INSERT INTO
    article (
        id_categorie,
        nom,
        prix,
        detail,
        photo1
    )
VALUES (
        1,
        'Salade César',
        12.50,
        'Poulet, parmesan',
        'image1.jpg'
    ),
    (
        2,
        'Soupe de poisson',
        14.50,
        'poisson, crustacés',
        'image1.jpg'
    );

-- Test : catégorie inexistante (FK)
-- Doit échouer
INSERT INTO
    article (
        id_categorie,
        nom,
        prix,
        detail,
        photo1
    )
VALUES (
        999,
        'Plat fantôme',
        9.90,
        'Test',
        'image.jpg'
    );

-- Test : nom manquant
-- Doit échouer
INSERT INTO
    article (
        id_categorie,
        prix,
        detail,
        photo1
    )
VALUES (
        1,
        10.00,
        'Sans nom',
        'image.jpg'
    );

-- --- Test utilisateurs ---
INSERT INTO
    user (
        nom,
        password,
        mail,
        telephone,
        role
    )
VALUES (
        'Admin',
        'hash',
        'admin@mail.com',
        '0600000000',
        'admin'
    );

-- Test : mail manquant
-- Doit échouer
INSERT INTO user (nom, password) VALUES ('Test', 'hash');

-- --- Test menu du jour ---
INSERT INTO
    menu (
        nom,
        prix,
        entree,
        plat,
        dessert,
        boisson,
        photo1
    )
VALUES (
        'Menu du midi',
        19.90,
        'Salade',
        'Poulet rôti',
        'Tarte',
        'Eau',
        'menu.jpg'
    );

-- Test : prix manquant
-- Doit échouer
INSERT INTO
    menu (
        nom,
        entree,
        plat,
        dessert,
        boisson
    )
VALUES (
        'Menu invalide',
        'X',
        'Y',
        'Z',
        'Eau'
    );

-- --- Test réservations ---
INSERT INTO
    reservation (
        id_user,
        date,
        heure,
        nbr_couvert
    )
VALUES (
        1,
        '2025-11-22',
        '12:30:00',
        4
    );

-- Test : user inexistant (FK SET NULL)
INSERT INTO
    reservation (
        id_user,
        date,
        heure,
        nbr_couvert
    )
VALUES (
        999,
        '2025-11-22',
        '13:00:00',
        2
    );

-- Test : date manquante
-- Doit échouer
INSERT INTO
    reservation (id_user, heure, nbr_couvert)
VALUES (1, '14:00:00', 2);

-- ============================
-- 4. TEST DES RELATIONS
-- ============================

-- Articles liés à leur catégorie
SELECT a.nom AS article, c.nom AS categorie
FROM article a
    JOIN categorie c ON a.id_categorie = c.id_categorie;

-- Réservations liées à un utilisateur
SELECT r.id_reservation, u.nom AS utilisateur
FROM reservation r
    LEFT JOIN user u ON r.id_user = u.id_user;

-- ============================
-- 5. TEST DES COMPORTEMENTS ON DELETE
-- ============================

-- Suppression d'une catégorie doit supprimer les articles liés (CASCADE)
DELETE FROM categorie WHERE id_categorie = 1;

SELECT * FROM article;

-- Suppression d'un user doit mettre id_user à NULL (SET NULL)
DELETE FROM user WHERE id_user = 1;

SELECT * FROM reservation;

-- FIN DES TESTS
SELECT 'Tests terminés avec succès.' AS message;
/*  command qui permet de forcer la réalisation des test complets sans interruption */
--  CMD : mysql --force -u root -p < ./scripts/test.sql