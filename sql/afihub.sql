--El nombre de la base de datos es afihub 

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `matricula` int(7) NOT NULL,
  `apellidop` varchar(50) NOT NULL,
  `apellidom` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `institutional_email` varchar(100) NOT NULL,
  `personal_email` varchar(100) NOT NULL,
  `cell` varchar(10) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `semestres` (
  `id` int(11) NOT NULL,
  `semestre` int(12) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `clave` varchar(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `creditos` int(11) NOT NULL DEFAULT 0,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `afis` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `afis_materia` (
  `id` int(11) NOT NULL,
  `afi_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `duracion_minutos` int(11) NOT NULL DEFAULT 0,
  `num_preguntas` int(11) NOT NULL DEFAULT 0,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `resultados_afi_encuesta` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `afi_materia_id` int(11) DEFAULT NULL,
  `calificacion` decimal(5,2) DEFAULT NULL,
  `respuestas` longtext DEFAULT NULL,
  `intento` int(11) NOT NULL DEFAULT 1,
  `fecha_realizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `resultados_afi_estudiante` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `promedio` decimal(5,2) DEFAULT NULL,
  `estatus` enum('cursando','aprobado','reprobado') NOT NULL DEFAULT 'cursando',
  `observaciones` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `semestres` ADD PRIMARY KEY (`id`);
ALTER TABLE `materias` ADD PRIMARY KEY (`id`), ADD KEY `semestre_id` (`semestre_id`);
ALTER TABLE `afis` ADD PRIMARY KEY (`id`);
ALTER TABLE `afis_materia` ADD PRIMARY KEY (`id`), ADD KEY `afi_id` (`afi_id`), ADD KEY `materia_id` (`materia_id`), ADD KEY `semestre_id` (`semestre_id`);
ALTER TABLE `tests` ADD PRIMARY KEY (`id`), ADD KEY `materia_id` (`materia_id`);
ALTER TABLE `resultados_afi_encuesta` ADD PRIMARY KEY (`id`), ADD KEY `test_id` (`test_id`), ADD KEY `usuario_id` (`usuario_id`), ADD KEY `afi_materia_id` (`afi_materia_id`);
ALTER TABLE `resultados_afi_estudiante` ADD PRIMARY KEY (`id`), ADD KEY `usuario_id` (`usuario_id`), ADD KEY `materia_id` (`materia_id`), ADD KEY `semestre_id` (`semestre_id`);

ALTER TABLE `semestres` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `materias` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `afis` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `afis_materia` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `tests` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `resultados_afi_encuesta` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `resultados_afi_estudiante` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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