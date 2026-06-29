<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
$nombre = $_SESSION['nombre'];
$apellidop = $_SESSION['apellidop'];
$semestre = (int)$_SESSION['semestre'];
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
<body class="dashboard-body">

<div class="dash-container">

  <header class="dash-topbar">
    <div class="dash-brand">
      <i class="fas fa-graduation-cap"></i>
      <span>AFI<span>Hub</span></span>
    </div>

    <nav class="dash-nav" id="dashNav">
      <button class="tab-btn active" data-tab="areas">
        <i class="fa-solid fa-layer-group"></i> <span>Áreas</span>
      </button>
      <button class="tab-btn" data-tab="progreso">
        <i class="fa-solid fa-chart-simple"></i> <span>Progreso</span>
      </button>
      <button class="tab-btn" data-tab="perfil">
        <i class="fa-solid fa-user"></i> <span>Perfil</span>
      </button>
    </nav>

    <div class="dash-user">
      <i class="fa-solid fa-circle-user"></i>
      <span class="dash-user-name"><?= htmlspecialchars($nombre . ' ' . $apellidop) ?></span>
      <span class="dash-semestre">Semestre <?= $semestre ?></span>
      <button class="support-btn" id="supportBtn" title="Soporte"><i class="fa-solid fa-circle-question"></i></button>
      <a href="controllers/logout.php" class="logout-btn"><i class="fa-solid fa-right-from-bracket"></i></a>
    </div>

    <button class="hamburger" id="hamburger"><i class="fa-solid fa-bars"></i></button>
  </header>

  <main class="dash-content">

    <section class="tab-panel active" id="panel-areas">
      <div class="panel-header">
        <h1>Mis Áreas</h1>
        <p>Selecciona un área para ver sus AFIs</p>
      </div>
      <div class="areas-grid" id="areasGrid">
      </div>
    </section>

    <section class="tab-panel" id="panel-progreso">
      <div class="panel-header">
        <h1>Mi Progreso</h1>
        <p>Resumen de tus actividades y avance</p>
      </div>
      <div id="progresoContent"></div>
    </section>

    <section class="tab-panel" id="panel-perfil">
      <div class="panel-header">
        <h1>Mi Perfil</h1>
        <p>Tus datos personales</p>
      </div>
      <div id="perfilContent"></div>
    </section>

  </main>

</div>

<script>
  const USER_DATA = {
    nombre: "<?= htmlspecialchars($_SESSION['nombre']) ?>",
    apellidop: "<?= htmlspecialchars($_SESSION['apellidop']) ?>",
    apellidom: "<?= htmlspecialchars($_SESSION['apellidom'] ?? '') ?>",
    matricula: "<?= htmlspecialchars($_SESSION['matricula']) ?>",
    institutional_email: "<?= htmlspecialchars($_SESSION['institutional_email'] ?? '') ?>",
    personal_email: "<?= htmlspecialchars($_SESSION['personal_email'] ?? '') ?>",
    cell: "<?= htmlspecialchars($_SESSION['cell'] ?? '') ?>",
    semestre: <?= $semestre ?>
  };
</script>
<script src="assets/js/dashboard.js"></script>
</body>
</html>
