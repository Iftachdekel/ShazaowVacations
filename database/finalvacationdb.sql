-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2023 at 01:25 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finalvacationdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
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
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `role`) VALUES
(13, 'iftachdekel', 'Iftach', 'Dekel', 'iftachdekel@gmail.com', 'Aba1234!', 'admin'),
(14, 'inbal dekel', 'inbal', 'dekel', 'inbaldekel84@gmail.com', 'Aba1234!', 'user'),
(15, 'abaganuv', 'aba', 'ganuv', 'abaganuv@gmail.com', 'Aba1234!', 'user'),
(16, 'baba', 'ganesh', 'gein', 'baba@gmail.com', 'Aba1234!', 'user'),
(17, 'yair', 'yair', 'avraham', 'yair@gmail.com', 'Aba1234!', 'user'),
(18, 'YALAL', 'nimass', 'meod', 'yalla@gmail.com', 'Aba1234!', 'user'),
(19, 'ejlkj', 'weljf', 'lkjf', 'said@gmail.com', 'Aba1234!', 'user'),
(20, 'asfafa', 'dfasf', 'dsfdf', 'ASi@gmail.com', 'Aba1234!', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `uservacations`
--

CREATE TABLE `uservacations` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `vacationid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uservacations`
--

INSERT INTO `uservacations` (`id`, `userid`, `vacationid`) VALUES
(28, 14, 4),
(29, 14, 4),
(31, 14, 22),
(32, 14, 21),
(33, 14, 20),
(34, 14, 3);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `destination` text NOT NULL,
  `description` text NOT NULL,
  `startOn` date NOT NULL,
  `endOn` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageFile` varchar(16300) NOT NULL,
  `imageName` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `startOn`, `endOn`, `price`, `imageFile`, `imageName`) VALUES
(2, 'lkjljlkj', 'jkhkj', '2023-08-01', '2023-08-10', 120, 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'undefined'),
(3, 'Pizza', 'olaaalala', '2023-08-23', '2023-08-24', 399, 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'undefined'),
(4, 'Maui', 'Whether you\'re driving along the Road to Hana, enjoying a bird\'s-eye view of Maui\'s lush coastline from a helicopter, snorkeling with sea turtles or simply relaxing on white or black sand beaches, you\'ll find that this Hawaiian island is unlike any other tropical destination.', '2023-09-03', '2023-09-07', 2699, 'https://images.pexels.com/photos/17490351/pexels-photo-17490351/free-photo-of-mer-paysage-plage-eau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ''),
(6, 'Maldives', 'It is not cheap or easy to reach, but this isolated Indian Ocean vacation spot located southwest of India is the personification of a dreamy tropical retreat. In this remote destination, which is made up of more than 1,000 islands, thatched-roof overwater bungalows sit above the bright aquamarine sea, providing easy water access and a romantic atmosphere.', '2023-10-02', '2023-10-09', 2999, 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ''),
(7, 'Tokyo', 'Simply setting foot in Japan\'s frenetic capital city is an experience. Known for its bustling streets and flashing neon signs, Tokyo has an electric energy and ample top attractions to discover. ', '2023-12-03', '2023-12-12', 3299, 'https://media.cntraveler.com/photos/63482b255e7943ad4006df0b/4:3/w_5332,h_3999,c_limit/tokyoGettyImages-1031467664.jpeg', ''),
(19, 'Machu Picchu', 'Hike the Inca Trail to the historic sanctuary.', '2024-03-05', '2024-03-15', 1300, 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/06/1.-Intrepid-Travel-peru_machupicchu.jpg', ''),
(20, 'Istanbul', 'Experience the blend of Europe and Asia in one city.', '2024-04-01', '2024-04-10', 900, 'https://a.cdn-hotels.com/gdcs/production6/d781/3bae040b-2afb-4b11-9542-859eeb8ebaf1.jpg', ''),
(21, 'Dubai', 'Visit the tallest building and experience luxury.', '2024-05-01', '2024-05-10', 2200, 'https://media.cnn.com/api/v1/images/stellar/prod/200310023921-dubai-buildings-skyline.jpg?q=x_3,y_0,h_1684,w_2993,c_crop/h_720,w_1280/f_webp', ''),
(22, 'Venice', 'Romance in the city of canals and gondolas.', '2024-06-01', '2024-06-10', 1100, 'https://cdn.britannica.com/62/153462-050-3D4F41AF/Grand-Canal-Venice.jpg', ''),
(23, 'Rio de Janeiro', 'Experience the Carnival and visit Christ the Redeemer.', '2024-07-01', '2024-07-10', 1400, 'https://www.costacruises.eu/content/dam/costa/inventory-assets/ports/RIO/c035_rio_de_janeiro.jpg.image.2048.1536.medium.jpg', ''),
(24, 'Auckland', 'Explore the City of Sails and nearby islands.', '2024-08-01', '2024-08-10', 1900, 'https://www.newzealand.com/assets/Tourism-NZ/Auckland/98618569ff/img-1536065871-6217-4403-p-10D1D0BD-B88E-AAB3-AE3F2E903EF65717-2544003__aWxvdmVrZWxseQo_CropResizeWzEyMDAsNjMwLDc1LCJqcGciXQ.jpg', ''),
(25, 'Prague', 'Experience the City of a Hundred Spires.', '2024-09-01', '2024-09-10', 1000, 'https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium', ''),
(26, 'Bali', 'Relax on beautiful beaches and explore Indonesian culture.', '2024-10-01', '2024-10-10', 1000, 'https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg', ''),
(27, 'Cairo', 'Visit the ancient pyramids and Sphinx.', '2024-11-01', '2024-11-10', 1100, 'https://ychef.files.bbci.co.uk/1280x720/p07zy3y6.jpg', ''),
(28, 'Athens', 'Discover the ancient Acropolis and Parthenon.', '2024-12-01', '2024-12-10', 1000, 'https://cdn.britannica.com/61/179661-138-6F13E02A/Overview-Athens.jpg?w=800&h=450&c=crop', ''),
(29, 'Reykjavik', 'Witness the Northern Lights and geothermal springs.', '2025-01-01', '2025-01-10', 1800, 'https://cdn.britannica.com/71/73371-050-9DFAEC1E/Reykjavik-Iceland.jpg', ''),
(31, 'Marrakech', 'Explore the bustling medinas and historic palaces.', '2025-03-01', '2025-03-10', 900, 'https://www.barcelo.com/guia-turismo/wp-content/uploads/2020/05/medina-marrakech-horizontal.jpg', ''),
(32, 'Banff', 'Enjoy the Canadian Rockies and pristine wilderness.', '2025-04-01', '2025-04-10', 1400, 'https://cdn.britannica.com/71/94371-050-293AE931/Mountains-region-Ten-Peaks-Moraine-Lake-Alberta.jpg', ''),
(33, 'Petra', 'Visit the historic rose-red city in Jordan.', '2025-05-01', '2025-05-10', 1200, 'https://cdn.britannica.com/88/189788-050-9B5DB3A4/Al-Dayr-Petra-Jordan.jpg', ''),
(35, 'AMinadav', 'sjhakjdhldfhladhsl', '2024-12-23', '2024-12-24', 120, 'f4c23da1-5b5e-4e48-9bc4-61b98a204ea3.png', ''),
(36, 'ORA', 'sadasda', '2025-05-05', '2026-05-05', 100, 'b21ad8ce-89b0-4962-84c1-a0201a8eea27.png', 'b21ad8ce-89b0-4962-84c1-a0201a8eea27.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `uservacations`
--
ALTER TABLE `uservacations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `vacationid` (`vacationid`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `uservacations`
--
ALTER TABLE `uservacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `uservacations`
--
ALTER TABLE `uservacations`
  ADD CONSTRAINT `uservacations_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `uservacations_ibfk_2` FOREIGN KEY (`vacationid`) REFERENCES `vacations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
