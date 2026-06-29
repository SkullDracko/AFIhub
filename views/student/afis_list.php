<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: ../../index.php');
    exit;
}
$area = (int)($_GET['area'] ?? 1);
$areaNombres = [1 => 'Área 1', 2 => 'Área 2', 3 => 'Área 3'];
$areaNombre = $areaNombres[$area] ?? 'Área Desconocida';
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= $areaNombre ?> - AFIHub</title>
<link rel="stylesheet" href="../../assets/css/style.css">
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
    <div style="flex:1"></div>
    <a href="../../dashboard.php" class="logout-btn" style="font-size:clamp(14px,1.1vw,16px);display:flex;align-items:center;gap:8px;">
      <i class="fa-solid fa-arrow-left"></i> Volver
    </a>
  </header>

  <main class="dash-content" id="afiListContent">
    <div class="panel-header">
      <h1><?= $areaNombre ?></h1>
      <p>AFIs disponibles para tu semestre</p>
    </div>
    <div class="afis-list" id="afisList">
    </div>
  </main>

</div>

<script>
  const AREA_ID = <?= $area ?>;
</script>
<script src="../../assets/js/afis_list.js"></script>
</body>
</html>
