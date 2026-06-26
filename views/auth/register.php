<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registro - AFIHub</title>
<link rel="stylesheet" href="../../assets/css/style.css">
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
      <img src="../../assets/img/facmed.png" alt="FacMed">
      <div class="separator"></div>
      <img src="../../assets/img/medprev.png" alt="MedPrev">
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

  <div class="right-panel right-panel-scroll">
    <div class="dots top-right"></div>
    <div class="dots bottom-right"></div>

    <div class="panel-content">
    <div class="mobile-header">
      <div class="mobile-logos">
        <img src="../../assets/img/facmed.png" alt="FacMed">
        <div class="separator"></div>
        <img src="../../assets/img/medprev.png" alt="MedPrev">
      </div>
      <div class="mobile-brand">
        <i class="fas fa-graduation-cap"></i>
        <span>AFI<span>Hub</span></span>
      </div>
    </div>

    <div class="register-card">
      <h2>Crear cuenta</h2>
      <h1>AFI<span>Hub</span></h1>

      <div class="small-line">
        <div></div>
        <div class="dot"></div>
        <div></div>
      </div>

      <p>Completa tus datos para registrarte</p>

      <div class="general-error" id="register-general-error"></div>

      <form id="registerForm" method="POST" action="../../controllers/register.php">
        <label for="reg-matricula">Matrícula</label>
        <div class="input-group" id="ig-matricula">
          <i class="fa-regular fa-id-card"></i>
          <input type="text" id="reg-matricula" name="matricula" inputmode="numeric" placeholder="Tu matrícula" oninput="this.value = this.value.replace(/[^0-9]/g, '')" autocomplete="off">
        </div>
        <span class="error-msg" id="err-matricula"></span>

        <div class="row-fields">
          <div class="field-half">
            <label for="reg-apellidop">Apellido Paterno</label>
            <div class="input-group" id="ig-apellidop">
              <i class="fa-regular fa-user"></i>
              <input type="text" id="reg-apellidop" name="apellidop" placeholder="Paterno" autocomplete="off" oninput="this.value = this.value.replace(/[0-9]/g, '')">
            </div>
            <span class="error-msg" id="err-apellidop"></span>
          </div>
          <div class="field-half">
            <label for="reg-apellidom">Apellido Materno</label>
            <div class="input-group" id="ig-apellidom">
              <i class="fa-regular fa-user"></i>
              <input type="text" id="reg-apellidom" name="apellidom" placeholder="Materno" autocomplete="off" oninput="this.value = this.value.replace(/[0-9]/g, '')">
            </div>
            <span class="error-msg" id="err-apellidom"></span>
          </div>
        </div>

        <label for="reg-nombre">Nombre(s)</label>
        <div class="input-group" id="ig-nombre">
          <i class="fa-regular fa-user"></i>
          <input type="text" id="reg-nombre" name="nombre" placeholder="Tu nombre completo" autocomplete="off" oninput="this.value = this.value.replace(/[0-9]/g, '')">
        </div>
        <span class="error-msg" id="err-nombre"></span>

        <label for="reg-inst-email">Correo institucional</label>
        <div class="input-group" id="ig-inst_email">
          <i class="fa-regular fa-envelope"></i>
          <input type="email" id="reg-inst-email" name="inst_email" placeholder="ejemplo@uanl.edu.mx" autocomplete="off">
        </div>
        <span class="error-msg" id="err-inst_email"></span>

        <label for="reg-personal-email">Correo personal</label>
        <div class="input-group" id="ig-personal_email">
          <i class="fa-regular fa-envelope"></i>
          <input type="email" id="reg-personal-email" name="personal_email" placeholder="ejemplo@gmail.com" autocomplete="off">
        </div>
        <span class="error-msg" id="err-personal_email"></span>

        <label for="reg-cell">Celular</label>
        <div class="input-group" id="ig-cell">
          <i class="fa-solid fa-phone"></i>
          <input type="tel" id="reg-cell" name="cell" inputmode="numeric" placeholder="10 dígitos" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '')" autocomplete="off">
        </div>
        <span class="error-msg" id="err-cell"></span>

        <label for="reg-semestre">Semestre</label>
        <div class="input-group" id="ig-semestre">
          <i class="fa-solid fa-graduation-cap"></i>
          <select id="reg-semestre" name="semestre">
            <option value="" disabled selected>Selecciona tu semestre</option>
            <option value="1">1er Semestre</option>
            <option value="2">2do Semestre</option>
            <option value="3">3er Semestre</option>
            <option value="4">4to Semestre</option>
            <option value="5">5to Semestre</option>
            <option value="6">6to Semestre</option>
            <option value="7">7mo Semestre</option>
            <option value="8">8vo Semestre</option>
            <option value="9">9no Semestre</option>
            <option value="10">10mo Semestre</option>
            <option value="11">11vo Semestre</option>
            <option value="12">12vo Semestre</option>
          </select>
        </div>
        <span class="error-msg" id="err-semestre"></span>

        <button type="submit" class="login-btn">
          <i class="fa-solid fa-user-plus"></i>
          Crear cuenta
        </button>
      </form>

      <p class="register-link">
        ¿Ya tienes cuenta? <a href="../../index.php">Inicia sesión</a>
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

</div>

<script src="../../assets/js/register.js"></script>
</body>
</html>
