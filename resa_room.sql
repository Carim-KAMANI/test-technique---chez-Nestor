-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 15 sep. 2021 à 13:56
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `resa_room`
--

-- --------------------------------------------------------

--
-- Structure de la table `apartment`
--

CREATE TABLE `apartment` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `street` varchar(100) NOT NULL,
  `zipCode` varchar(20) NOT NULL,
  `city` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `apartment`
--

INSERT INTO `apartment` (`id`, `name`, `street`, `zipCode`, `city`) VALUES
('apt_one', 'classic apartment one', 'first street apartment example', '0001, zipcode', 'aprtment town one'),
('apt_two', 'classic apartment two', 'second street apartment example', '0002, zipcode', 'aprtment town two');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` varchar(10) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(28) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `birthDate` varchar(16) NOT NULL,
  `nationality` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `firstName`, `lastName`, `email`, `phone`, `birthDate`, `nationality`) VALUES
('one_client', 'calos', 'sanchez', 'carlos.sanchez@vv.com', '00109670', '15/90/2021', 'Espagnol'),
('two_client', 'Alicia', 'Grau', 'alicia.grau@vv.com', '01067931', '28/O2/2010', 'Francaise');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `motif` varchar(50) NOT NULL,
  `id_client` varchar(10) NOT NULL,
  `id_room` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`motif`, `id_client`, `id_room`) VALUES
('holidays', 'one_client', 'two_room');

-- --------------------------------------------------------

--
-- Structure de la table `room`
--

CREATE TABLE `room` (
  `id_room` varchar(10) NOT NULL,
  `number` int(4) NOT NULL,
  `area` float NOT NULL,
  `price` int(15) NOT NULL,
  `id_apartment` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `room`
--

INSERT INTO `room` (`id_room`, `number`, `area`, `price`, `id_apartment`) VALUES
('one_room', 111, 30, 45, 'apt_one'),
('three_room', 111, 27, 40, 'apt_two'),
('two_room', 112, 32, 50, 'apt_one');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `apartment`
--
ALTER TABLE `apartment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD UNIQUE KEY `45` (`email`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_room` (`id_room`);

--
-- Index pour la table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id_room`),
  ADD KEY `id_apartment` (`id_apartment`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`);

--
-- Contraintes pour la table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`id_apartment`) REFERENCES `apartment` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
