CREATE DATABASE IF NOT EXISTS `afihub` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `afihub`;

DROP TABLE IF EXISTS `resultados_afi_estudiante`;
DROP TABLE IF EXISTS `resultados_afi_encuesta`;
DROP TABLE IF EXISTS `tests`;
DROP TABLE IF EXISTS `afis_materia`;
DROP TABLE IF EXISTS `afis`;
DROP TABLE IF EXISTS `materias`;
DROP TABLE IF EXISTS `semestres`;
DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(20) NOT NULL,
  `apellidop` varchar(50) NOT NULL,
  `apellidom` varchar(50) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `institutional_email` varchar(100) NOT NULL,
  `personal_email` varchar(100) DEFAULT NULL,
  `cell` varchar(10) NOT NULL,
  `semestre` int(2) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula` (`matricula`),
  UNIQUE KEY `institutional_email` (`institutional_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `semestres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semestre` int(2) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `materias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semestre_id` int(11) NOT NULL,
  `clave` varchar(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `creditos` int(11) NOT NULL DEFAULT 0,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `semestre_id` (`semestre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `afis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `afis_materia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `afi_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `afi_id` (`afi_id`),
  KEY `materia_id` (`materia_id`),
  KEY `semestre_id` (`semestre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `materia_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `duracion_minutos` int(11) NOT NULL DEFAULT 0,
  `num_preguntas` int(11) NOT NULL DEFAULT 0,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `materia_id` (`materia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `resultados_afi_encuesta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `afi_materia_id` int(11) DEFAULT NULL,
  `calificacion` decimal(5,2) DEFAULT NULL,
  `respuestas` longtext DEFAULT NULL,
  `intento` int(11) NOT NULL DEFAULT 1,
  `fecha_realizacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `test_id` (`test_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `afi_materia_id` (`afi_materia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `resultados_afi_estudiante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `promedio` decimal(5,2) DEFAULT NULL,
  `estatus` enum('cursando','aprobado','reprobado') NOT NULL DEFAULT 'cursando',
  `observaciones` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `materia_id` (`materia_id`),
  KEY `semestre_id` (`semestre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `materias` ADD CONSTRAINT `materias_semestre_fk` FOREIGN KEY (`semestre_id`) REFERENCES `semestres` (`id`);
ALTER TABLE `afis_materia` ADD CONSTRAINT `afm_afi_fk` FOREIGN KEY (`afi_id`) REFERENCES `afis` (`id`);
ALTER TABLE `afis_materia` ADD CONSTRAINT `afm_materia_fk` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
ALTER TABLE `afis_materia` ADD CONSTRAINT `afm_semestre_fk` FOREIGN KEY (`semestre_id`) REFERENCES `semestres` (`id`);
ALTER TABLE `tests` ADD CONSTRAINT `tests_materia_fk` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
ALTER TABLE `resultados_afi_encuesta` ADD CONSTRAINT `rae_test_fk` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`);
ALTER TABLE `resultados_afi_encuesta` ADD CONSTRAINT `rae_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
ALTER TABLE `resultados_afi_encuesta` ADD CONSTRAINT `rae_afi_materia_fk` FOREIGN KEY (`afi_materia_id`) REFERENCES `afis_materia` (`id`);
ALTER TABLE `resultados_afi_estudiante` ADD CONSTRAINT `raest_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
ALTER TABLE `resultados_afi_estudiante` ADD CONSTRAINT `raest_materia_fk` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
ALTER TABLE `resultados_afi_estudiante` ADD CONSTRAINT `raest_semestre_fk` FOREIGN KEY (`semestre_id`) REFERENCES `semestres` (`id`);
COMMIT;
