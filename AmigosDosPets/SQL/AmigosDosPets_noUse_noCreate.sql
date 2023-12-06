/*
SQLyog Community v13.1.1 (64 bit)
MySQL - 5.7.36 : Database - amigosdospets
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `petencontrado` */

DROP TABLE IF EXISTS `petencontrado`;

CREATE TABLE `petencontrado` (
  `id_pet` int(11) NOT NULL AUTO_INCREMENT,
  `especie_encontrado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `data_encontrado` date NOT NULL,
  `cidade_encontrado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `local_encontrado` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `detalhes_encontrado` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_encontrado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `situacao_encontrado` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_pet`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `petencontrado` */

insert  into `petencontrado`(`id_pet`,`especie_encontrado`,`user_id`,`data_encontrado`,`cidade_encontrado`,`local_encontrado`,`detalhes_encontrado`,`foto_encontrado`,`situacao_encontrado`) values 
(1,'Cachorro',8,'2023-11-05','Cascavel','Centro','Encontrado na rua Souza Naves','image/1699236544852.jpg','S'),
(2,'Gato',8,'2023-12-04','Cascavel','Floresta','Encontrado em frente ao IFPR','image/1701743810140.jpg','S');

/*Table structure for table `pets` */

DROP TABLE IF EXISTS `pets`;

CREATE TABLE `pets` (
  `id_pet` int(11) NOT NULL AUTO_INCREMENT,
  `nome_pet` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `especie_pet` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexo_pet` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idade_pet` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `porte_pet` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_pet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sobre_pet` text COLLATE utf8mb4_unicode_ci,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `disponivel_doacao` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `perdido` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_pet`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `pets` */

insert  into `pets`(`id_pet`,`nome_pet`,`user_id`,`especie_pet`,`sexo_pet`,`idade_pet`,`porte_pet`,`foto_pet`,`sobre_pet`,`data_criacao`,`data_atualizacao`,`disponivel_doacao`,`perdido`) values 
(2,'Bob',8,'Cachorro','Macho','Filhote','Pequeno','image/cachorro.jpg','teste','2023-09-24 00:17:53','2023-12-05 18:47:06','S','N'),
(3,'Mel',8,'Gato','Femea','Filhote','Pequeno','image/gato2.jpg','Teste cadastro cat','2023-09-24 23:39:11','2023-12-05 18:47:09','S','N'),
(4,'gatinho',8,'Gato','Macho','Filhote','Pequeno','image/gato.jpg','Teste cadastro cat2','2023-09-24 23:49:04','2023-12-05 18:47:09','S','N'),
(17,'Marley',8,'Cachorro','Macho','Filhote','Pequeno','image/cachorro2.jpg','Marley','2023-09-26 00:11:05','2023-12-05 18:47:10','S','N'),
(18,'Stalone',8,'Cachorro','Macho','Adulto','Grande','image/stalone.jpg','Stalone','2023-09-26 00:11:48','2023-12-05 20:07:43','S','N'),
(19,'Caramelo',8,'Cachorro','Macho','Adulto','Medio','image/caramelo.jpg','Caramelo','2023-09-26 00:13:32','2023-12-05 20:08:32','S','N'),
(21,'Salsicha',8,'Cachorro','Macho','Adulto','Pequeno','image/salsicha.jpg','Salsicha','2023-09-26 23:41:09','2023-12-05 20:09:10','S','N'),
(22,'Spike',8,'Cachorro','Macho','Filhote','Pequeno','image/dog.jpg','Perdido dia 01/12/2023','2023-09-26 23:42:41','2023-12-05 20:05:05','N','S'),
(23,'Sol',8,'Gato','Femea','Adulto','Pequeno','image/cat.jpg','Perdido na rua ABC, bairro XYZ, por volta das 19:00 horas do dia 27-09-2023.','2023-09-27 18:03:12','2023-12-05 18:47:11','N','S'),
(24,'Pipoca',8,'Gato','Femea','Idoso','Pequeno','image/1698722920957.jpg','dfsdfs','2023-10-31 00:28:40','2023-12-05 18:47:12','S','N');

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `cpf` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `sessions` */

insert  into `sessions`(`session_id`,`expires`,`data`,`cpf`) values 
('DdqvD3CTqYaTpr0mzwF6b9pTe1be-mjG',1701916495,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":8}',NULL),
('e5Ieuj9ylwZqDBQRsMXZo8CyYc8jyATC',1701830227,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":8,\"successMessage\":\"Cadastro do pet encontrado realizado com sucesso!\"}',NULL),
('j8UVPllnRkz8x1Q01d6AuoUQ9NmX05Vp',1701904185,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":8}',NULL);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpf` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone_secundario` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endereco` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cidade` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sessao_ativa` enum('S','N') COLLATE utf8mb4_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`nome`,`cpf`,`email`,`whatsapp`,`telefone_secundario`,`endereco`,`estado`,`cidade`,`senha`,`genero`,`createdAt`,`updatedAt`,`sessao_ativa`) values 
(1,'Usuário Master','66254544008','usermaster@mail.com.br','45999991010','4532232030','Rua Paraná, 1090','PR','Cascavel','123','masculino','2023-09-17 20:10:18','2023-09-17 20:10:18','N'),
(8,'Rafael','13129884955','rafael@email.com.br','45999991010','4532232030','Avenida das Pombas, 2530','PR','Cascavel','1111','masculino','2023-09-21 12:03:55','2023-09-21 12:03:55','N');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
