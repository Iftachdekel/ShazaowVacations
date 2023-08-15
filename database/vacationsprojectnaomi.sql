-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 16 juil. 2023 à 18:03
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vacationsproject`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `role`) VALUES
(1, 'johnwick', 'john', 'wick', 'johnwick@hitman.com', 'johnwick', 'admin'),
(4, 'neo', 'neo', 'unknown', 'neo@Matrix.com', 'neo', 'user'),
(5, 'undefined', 'Neta', 'Abergel', 'neta@gmail.com', 'Netatest123!', 'user'),
(7, 'netaTheKing', 'Neta', 'Abergel', 'netatest2@gmail.com', 'Netatest123!', 'user'),
(8, 'cewferf', 'jknlkn', 'lknhli', 'lik@rgrtge5.com', 'ASDrfrgt123!!', 'user'),
(9, 'FinalTest', 'NetaTestFinal', 'TheKing', 'fireneth@gmail.com', 'Fireneth123!', 'user'),
(10, 'NewTest', 'ForThe', 'KingOfTheQueen', 'kingofdev@gmail.com', 'Fireneth123!', 'user'),
(11, 'efwef', 'oiii', 'oihjpoj', 'iopi@efrf.com', 'defer23234DWE@', 'user'),
(12, 'FireNeth', 'LastOne', 'ForTheKing', 'netinfire@gmail.com', 'Terrify123@', 'user');

-- --------------------------------------------------------

--
-- Structure de la table `uservacations`
--

CREATE TABLE `uservacations` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `vacationid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `uservacations`
--

INSERT INTO `uservacations` (`id`, `userid`, `vacationid`) VALUES
(1, 4, 1),
(3, 4, 2),
(18, 5, 3),
(17, 7, 2),
(15, 7, 3),
(16, 7, 4),
(21, 7, 5),
(13, 7, 6),
(14, 7, 7);

-- --------------------------------------------------------

--
-- Structure de la table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `destination` text NOT NULL,
  `description` text NOT NULL,
  `startOn` date NOT NULL,
  `endOn` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageFile` varchar(16300) NOT NULL,
  `imageName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `startOn`, `endOn`, `price`, `imageFile`, `imageName`) VALUES
(1, 'Paris', 'France\'s magnetic City of Light is a perennial tourist destination, drawing visitors with its iconic attractions, like the Eiffel Tower and the Louvre.', '2023-08-01', '2023-08-08', 1399, 'https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'paris_image'),
(2, 'Bora Bora', 'What this 12-square-mile French Polynesian island may lack in size it makes up for in sheer tropical beauty. Here, you\'ll find picturesque beaches, lush jungles and luxurious resorts set on surrounding islets.', '2023-09-01', '2023-09-06', 2399, 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'borabora_image'),
(3, 'Rome', 'When you visit Italy\'s capital city, prepare to cross a few must-see landmarks – including the Colosseum, the Trevi Fountain and the Pantheon – off of your bucket list. Travelers can also see some of Italy\'s greatest treasures, including St. Peter\'s Basilica and the Sistine Chapel, in Vatican City.', '2023-08-14', '2023-08-18', 799, 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'rome_image'),
(4, 'Maui', 'Whether you\'re driving along the Road to Hana, enjoying a bird\'s-eye view of Maui\'s lush coastline from a helicopter, snorkeling with sea turtles or simply relaxing on white or black sand beaches, you\'ll find that this Hawaiian island is unlike any other tropical destination.', '2023-09-03', '2023-09-07', 2699, 'https://images.pexels.com/photos/17490351/pexels-photo-17490351/free-photo-of-mer-paysage-plage-eau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'maui_image'),
(5, 'London', 'London is a world unto itself. The eclectic neighborhoods, which are home to a blend of historical landmarks and modern-day attractions, can keep you occupied for days.', '2023-08-20', '2023-08-23', 1199, 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'London_image'),
(6, 'Maldives', 'It is not cheap or easy to reach, but this isolated Indian Ocean vacation spot located southwest of India is the personification of a dreamy tropical retreat. In this remote destination, which is made up of more than 1,000 islands, thatched-roof overwater bungalows sit above the bright aquamarine sea, providing easy water access and a romantic atmosphere.', '2023-10-02', '2023-10-09', 2999, 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'maldives_image'),
(7, 'Tokyo', 'Simply setting foot in Japan\'s frenetic capital city is an experience. Known for its bustling streets and flashing neon signs, Tokyo has an electric energy and ample top attractions to discover. ', '2023-12-03', '2023-12-12', 3299, 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'tokyo_image'),
(8, 'AAA', 'BBBB', '2023-07-16', '2023-07-24', 2, '', '1_v14.png'),
(9, 'AAA', 'BBBB', '2023-07-16', '2023-07-24', 2, '', '1_v14.png'),
(10, 'adsfdscdsc', 'sdsafdsf', '2023-07-22', '2023-07-27', 1, '', '2_v14.png'),
(11, 'adsfdscdsc', 'sdsafdsf', '2023-07-22', '2023-07-27', 1, '', '2_v14.png'),
(12, 'adsfdscdsc', 'sdsafdsf', '2023-07-22', '2023-07-27', 1, '', '2_v14.png'),
(13, 'adsfdscdsc', 'sdsafdsf', '2023-07-22', '2023-07-27', 1, '', '2_v14.png'),
(14, 'ssss', 'dsdsdsds', '2023-07-19', '2023-07-29', 1, '', 'ToTO.png'),
(15, 'ssss', 'dsdsdsds', '2023-07-19', '2023-07-29', 1, '', 'ToTO.png'),
(16, 'ssss', 'dsdsdsds', '2023-07-19', '2023-07-29', 1, '', 'ToTO.png'),
(17, 'ssss', 'dsdsdsds', '2023-07-19', '2023-07-29', 1, '', 'ToTO.png'),
(18, 'ssss', 'dsdsdsds', '2023-07-19', '2023-07-29', 1, '', '111.png');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `uservacations`
--
ALTER TABLE `uservacations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userid_2` (`userid`,`vacationid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `vacationid` (`vacationid`);

--
-- Index pour la table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `uservacations`
--
ALTER TABLE `uservacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `uservacations`
--
ALTER TABLE `uservacations`
  ADD CONSTRAINT `uservacations_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `uservacations_ibfk_2` FOREIGN KEY (`vacationid`) REFERENCES `vacations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
