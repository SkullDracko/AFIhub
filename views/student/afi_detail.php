<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: ../../index.php');
    exit;
}
$afiId = (int)($_GET['id'] ?? 0);
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Detalle AFI - AFIHub</title>
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
    <a href="javascript:history.back()" class="logout-btn" style="font-size:clamp(14px,1.1vw,16px);display:flex;align-items:center;gap:8px;">
      <i class="fa-solid fa-arrow-left"></i> Volver
    </a>
  </header>

  <main class="dash-content" id="afiDetailContent">
    <div id="afiDetail"></div>
  </main>

</div>

<script>
  const AFI_ID = <?= $afiId ?>;
</script>
<script src="../../assets/js/afi_detail.js"></script>
</body>
</html>
