-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 21 avril 2026 à 15:21
-- Version du serveur : 9.1.0
-- Version de PHP : 8.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `divertissements`
--
CREATE DATABASE IF NOT EXISTS `divertissements` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `divertissements`;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UserAnime`;
DROP TABLE IF EXISTS `UserGame`;
DROP TABLE IF EXISTS `UserManga`;
DROP TABLE IF EXISTS `Animes`;
DROP TABLE IF EXISTS `Games`;
DROP TABLE IF EXISTS `Mangas`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Genders`;
DROP TABLE IF EXISTS `Categories`;

-- --------------------------------------------------------

--
-- Structure de la table `Categories`
--

CREATE TABLE IF NOT EXISTS `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Anime', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(2, 'Manga', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(3, 'Jeu video', '2026-04-21 15:21:00', '2026-04-21 15:21:00');

-- --------------------------------------------------------

--
-- Structure de la table `Genders`
--

CREATE TABLE IF NOT EXISTS `Genders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Genders`
--

INSERT INTO `Genders` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Shonen', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(2, 'Seinen', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(3, 'Shojo', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(4, 'Josei', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(5, 'Fantasy', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(6, 'Science-fiction', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(7, 'Action', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(8, 'Horreur', '2026-04-21 15:21:00', '2026-04-21 15:21:00');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `firstName`, `lastName`, `email`, `password`, `userName`, `createdAt`, `updatedAt`) VALUES
(1, 'Lucas', 'Martin', 'lucas.martin@example.com', '$2b$10$ExempleHashPassword001', 'lucasm', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(2, 'Emma', 'Bernard', 'emma.bernard@example.com', '$2b$10$ExempleHashPassword002', 'emmab', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(3, 'Nathan', 'Petit', 'nathan.petit@example.com', '$2b$10$ExempleHashPassword003', 'nathanp', '2026-04-21 15:21:00', '2026-04-21 15:21:00'),
(4, 'Chloe', 'Robert', 'chloe.robert@example.com', '$2b$10$ExempleHashPassword004', 'chloer', '2026-04-21 15:21:00', '2026-04-21 15:21:00');

-- --------------------------------------------------------

--
-- Structure de la table `Animes`
--

CREATE TABLE IF NOT EXISTS `Animes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_year` int NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `nbEpisodes` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` int DEFAULT NULL,
  `GenderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `CategoryId` (`CategoryId`),
  KEY `GenderId` (`GenderId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Animes`
--

INSERT INTO `Animes` (`id`, `title`, `release_year`, `author`, `description`, `nbEpisodes`, `createdAt`, `updatedAt`, `CategoryId`, `GenderId`) VALUES
(1, 'Attack on Titan', 2013, 'Hajime Isayama', 'Un anime sombre ou l humanite lutte pour survivre face a des titans geants.', 89, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 1, 7),
(2, 'Death Note', 2006, 'Tsugumi Ohba', 'Un lyceen trouve un carnet capable de tuer toute personne dont le nom y est ecrit.', 37, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 1, 2),
(3, 'Fullmetal Alchemist Brotherhood', 2009, 'Hiromu Arakawa', 'Deux freres alchimistes cherchent la pierre philosophale apres une experience interdite.', 64, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 1, 5),
(4, 'Demon Slayer', 2019, 'Koyoharu Gotouge', 'Un jeune pourfendeur de demons combat pour sauver sa soeur transformee.', 55, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Mangas`
--

CREATE TABLE IF NOT EXISTS `Mangas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_year` int NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `nbVolumes` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` int DEFAULT NULL,
  `GenderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `CategoryId` (`CategoryId`),
  KEY `GenderId` (`GenderId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Mangas`
--

INSERT INTO `Mangas` (`id`, `title`, `release_year`, `author`, `description`, `nbVolumes`, `createdAt`, `updatedAt`, `CategoryId`, `GenderId`) VALUES
(1, 'One Piece', 1997, 'Eiichiro Oda', 'Les aventures de Luffy et de son equipage a la recherche du tresor ultime.', 108, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 2, 1),
(2, 'Naruto', 1999, 'Masashi Kishimoto', 'Un jeune ninja reve de devenir Hokage et de gagner la reconnaissance de tous.', 72, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 2, 1),
(3, 'Berserk', 1989, 'Kentaro Miura', 'Un manga de dark fantasy suivant le destin tragique du guerrier Guts.', 42, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 2, 2),
(4, 'Tokyo Ghoul', 2011, 'Sui Ishida', 'Un etudiant devient mi humain mi goule apres une transplantation qui change sa vie.', 14, '2026-04-21 15:21:00', '2026-04-21 15:21:00', 2, 8);

-- --------------------------------------------------------

--
-- Structure de la table `Games`
--

CREATE TABLE IF NOT EXISTS `Games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_year` int NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` int DEFAULT NULL,
  `GenderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `CategoryId` (`CategoryId`),
  KEY `GenderId` (`GenderId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Games`
--

INSERT INTO `Games` (`id`, `title`, `release_year`, `author`, `description`, `createdAt`, `updatedAt`, `CategoryId`, `GenderId`) VALUES
(1, 'The Legend of Zelda Breath of the Wild', 2017, 'Nintendo', 'Un jeu d aventure en monde ouvert ou Link explore Hyrule librement.', '2026-04-21 15:21:00', '2026-04-21 15:21:00', 3, 5),
(2, 'Elden Ring', 2022, 'FromSoftware', 'Un action RPG exigeant dans un univers de dark fantasy vaste et mysterieux.', '2026-04-21 15:21:00', '2026-04-21 15:21:00', 3, 5),
(3, 'Minecraft', 2011, 'Mojang', 'Un jeu bac a sable base sur la construction l exploration et la survie.', '2026-04-21 15:21:00', '2026-04-21 15:21:00', 3, 6),
(4, 'Hades', 2020, 'Supergiant Games', 'Un rogue lite nerveux inspire de la mythologie grecque.', '2026-04-21 15:21:00', '2026-04-21 15:21:00', 3, 7);

-- --------------------------------------------------------

--
-- Structure de la table `UserAnime`
--

CREATE TABLE IF NOT EXISTS `UserAnime` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `AnimeId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`AnimeId`, `UserId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `UserAnime` (`createdAt`, `updatedAt`, `AnimeId`, `UserId`) VALUES
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 1, 1),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 2, 1),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 3, 2),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `UserManga`
--

CREATE TABLE IF NOT EXISTS `UserManga` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `MangaId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`MangaId`, `UserId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `UserManga` (`createdAt`, `updatedAt`, `MangaId`, `UserId`) VALUES
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 1, 1),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 2, 2),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 3, 3),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 4, 4);

-- --------------------------------------------------------

--
-- Structure de la table `UserGame`
--

CREATE TABLE IF NOT EXISTS `UserGame` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `GameId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`GameId`, `UserId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `UserGame` (`createdAt`, `updatedAt`, `GameId`, `UserId`) VALUES
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 1, 1),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 2, 2),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 3, 3),
('2026-04-21 15:21:00', '2026-04-21 15:21:00', 4, 4);

-- --------------------------------------------------------

--
-- Contraintes pour les tables déchargées
--

ALTER TABLE `Animes`
  ADD CONSTRAINT `Animes_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Animes_ibfk_2` FOREIGN KEY (`GenderId`) REFERENCES `Genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Mangas`
  ADD CONSTRAINT `Mangas_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Mangas_ibfk_2` FOREIGN KEY (`GenderId`) REFERENCES `Genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Games`
  ADD CONSTRAINT `Games_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Games_ibfk_2` FOREIGN KEY (`GenderId`) REFERENCES `Genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `UserAnime`
  ADD CONSTRAINT `UserAnime_ibfk_1` FOREIGN KEY (`AnimeId`) REFERENCES `Animes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserAnime_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `UserManga`
  ADD CONSTRAINT `UserManga_ibfk_1` FOREIGN KEY (`MangaId`) REFERENCES `Mangas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserManga_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `UserGame`
  ADD CONSTRAINT `UserGame_ibfk_1` FOREIGN KEY (`GameId`) REFERENCES `Games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserGame_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;