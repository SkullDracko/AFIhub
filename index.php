<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AFIHub</title>
<link rel="stylesheet" href="assets/css/style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>
<body>

<div class="container">

  <div class="left-panel">
    <div class="dots top-left"></div>
    <div class="dots bottom-left"></div>

    <div class="logos">
      <img src="assets/img/facmed.png" alt="FacMed">
      <div class="separator"></div>
      <img src="assets/img/medprev.png" alt="MedPrev">
    </div>

    <div class="hero">
      <div class="graduation">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <h1>AFI<span>Hub</span></h1>
      <div class="line">
        <div class="circle"></div>
      </div>
      <p>Consulta. Aprende. Evalúa. Crece.</p>
    </div>

    <div class="features">
      <div class="feature">
        <i class="fa-solid fa-book-open"></i>
        <h3>Consulta</h3>
        <p>material de AFIs</p>
      </div>
      <div class="feature">
        <i class="fa-solid fa-clipboard-list"></i>
        <h3>Realiza</h3>
        <p>test y evaluaciones</p>
      </div>
      <div class="feature">
        <i class="fa-solid fa-chart-column"></i>
        <h3>Monitorea</h3>
        <p>tu progreso</p>
      </div>
    </div>

    <div class="footer-card">
      <div class="shield">
        <i class="fa-solid fa-shield"></i>
      </div>
      <div>
        <p>Plataforma oficial de Actividades de Formación Integral</p>
        <b>Facultad de Medicina, UANL</b>
      </div>
    </div>
  </div>


  <div class="right-panel">
    <div class="dots top-right"></div>
    <div class="dots bottom-right"></div>

    <div class="mobile-header">
      <div class="mobile-logos">
        <img src="assets/img/facmed.png" alt="FacMed">
        <div class="separator"></div>
        <img src="assets/img/medprev.png" alt="MedPrev">
      </div>
      <div class="mobile-brand">
        <i class="fas fa-graduation-cap"></i>
        <span>AFI<span>Hub</span></span>
      </div>
    </div>

    <div class="login-card">
      <h2>Bienvenido a</h2>
      <h1>AFI<span>Hub</span></h1>

      <div class="small-line">
        <div></div>
        <div class="dot"></div>
        <div></div>
      </div>

      <p>Inicia sesión para continuar</p>

      <label for="matricula">Matrícula</label>
      <div class="input-group">
        <i class="fa-regular fa-user"></i>
        <input type="text" id="matricula" inputmode="numeric" placeholder="Ingresa tu matrícula" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
      </div>

      <label for="correo">Correo universitario</label>
      <div class="input-group">
        <i class="fa-regular fa-envelope"></i>
        <input type="email" id="correo" placeholder="Ingresa tu correo">
      </div>

      <button class="login-btn">
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
        Iniciar sesión
      </button>

      <p class="register-link">
        ¿No tienes cuenta? <a href="#">Regístrate</a>
      </p>
    </div>

    <div class="mobile-footer">
      <div class="mobile-footer-content">
        <i class="fa-solid fa-shield"></i>
        <div>
          <p>Plataforma oficial de Actividades de Formación Integral</p>
          <b>Facultad de Medicina, UANL</b>
        </div>
      </div>
    </div>

    <div class="secure">
      <i class="fa-solid fa-shield"></i>
      Sistema seguro de la Facultad de Medicina, UANL
    </div>
  </div>

</div>

<script src="assets/js/login.js"></script>
</body>
</html>
