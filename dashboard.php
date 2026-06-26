<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard - AFIHub</title>
<link rel="stylesheet" href="assets/css/style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>
<body>
<div class="container" style="justify-content:center;align-items:center;flex-direction:column;gap:2vh;text-align:center;padding:2vw;">
    <h1 style="color:#2f1e50;">Bienvenido, <?= htmlspecialchars($_SESSION['nombre'] . ' ' . $_SESSION['apellidop']) ?></h1>
    <p style="color:#2e2e2e;">Has iniciado sesión correctamente.</p>
    <p style="color:#7c4293;">Semestre: <?= (int)$_SESSION['semestre'] ?></p>
    <a href="controllers/logout.php" style="color:#7c4293;text-decoration:underline;">Cerrar sesión</a>
</div>
</body>
</html>
