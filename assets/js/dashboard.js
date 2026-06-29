document.addEventListener("DOMContentLoaded", () => {

  const areasData = [
    {
      id: 1,
      nombre: "Área 1",
      descripcion: "Formación integral y desarrollo personal",
      icono: "fa-solid fa-leaf",
      color: "#2f1e50",
      afis: [
        { id: 101, nombre: "Salud Mental y Bienestar", fecha: "15/07/2026", hora: "10:00", duracion: "45 min", estado: "no_inscrito" },
        { id: 102, nombre: "Manejo del Estrés Académico", fecha: "22/07/2026", hora: "14:00", duracion: "30 min", estado: "inscrito" },
      ]
    },
    {
      id: 2,
      nombre: "Área 2",
      descripcion: "Salud pública y comunidad",
      icono: "fa-solid fa-heart-pulse",
      color: "#543b67",
      afis: [
        { id: 201, nombre: "Prevención de Enfermedades Crónicas", fecha: "18/07/2026", hora: "09:00", duracion: "60 min", estado: "no_inscrito" },
        { id: 202, nombre: "Vacunación y Cobertura", fecha: "25/07/2026", hora: "11:00", duracion: "40 min", estado: "no_inscrito" },
        { id: 203, nombre: "Nutrición Comunitaria", fecha: "30/07/2026", hora: "08:00", duracion: "50 min", estado: "completado" },
      ]
    },
    {
      id: 3,
      nombre: "Área 3",
      descripcion: "Investigación y metodología",
      icono: "fa-solid fa-flask",
      color: "#7c4293",
      afis: [
        { id: 301, nombre: "Introducción a la Investigación Clínica", fecha: "20/07/2026", hora: "12:00", duracion: "35 min", estado: "no_inscrito" },
      ]
    }
  ];

  function renderAreas() {
    const grid = document.getElementById("areasGrid");
    grid.innerHTML = areasData.map(a => `
      <div class="area-card" data-area-id="${a.id}">
        <div class="area-icon" style="background:${a.color}20; color:${a.color}">
          <i class="${a.icono}"></i>
        </div>
        <h2>${a.nombre}</h2>
        <p class="area-desc">${a.descripcion}</p>
        <span class="area-count">${a.afis.length} AFI${a.afis.length !== 1 ? 's' : ''}</span>
      </div>
    `).join("");

    document.querySelectorAll(".area-card").forEach(card => {
      card.addEventListener("click", () => {
        const areaId = card.dataset.areaId;
        window.location.href = `views/student/afis_list.php?area=${areaId}`;
      });
    });
  }

  function renderProgreso() {
    const container = document.getElementById("progresoContent");

    const completados = areasData.flatMap(a => a.afis).filter(a => a.estado === "completado");
    const totalAFIs = 2;
    const completadosCount = completados.length;

    container.innerHTML = `
      <div class="progreso-grid">
        <div class="perfil-card stats-card">
          <h3><i class="fa-solid fa-chart-simple"></i> Mi progreso</h3>
          <div class="stats-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e6e6e6" stroke-width="10"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="#7c4293" stroke-width="10"
                stroke-dasharray="${2 * Math.PI * 52}"
                stroke-dashoffset="${2 * Math.PI * 52 * (1 - completadosCount / totalAFIs)}"
                stroke-linecap="round" transform="rotate(-90 60 60)"/>
            </svg>
            <div class="stats-circle-text">
              <span class="stats-num">${completadosCount}</span>
              <span>de ${totalAFIs}</span>
            </div>
          </div>
          <p class="stats-label">AFIs completados este semestre</p>
        </div>

        <div class="perfil-card historial-card">
          <h3><i class="fa-solid fa-clock-rotate-left"></i> Historial</h3>
          ${completados.length === 0
            ? '<p class="historial-empty">Aún no completas ningún AFI.</p>'
            : `<div class="historial-list">
                ${completados.map(a => `
                  <div class="historial-item">
                    <div>
                      <span class="historial-nombre">${a.nombre}</span>
                      <span class="historial-fecha">${a.fecha}</span>
                    </div>
                    <span class="historial-calif">Aprobado</span>
                  </div>
                `).join("")}
              </div>`
          }
        </div>
      </div>
    `;
  }

  function renderPerfil() {
    const container = document.getElementById("perfilContent");

    const notifsOn = localStorage.getItem("notif_afihub") !== "off";

    container.innerHTML = `
      <div class="perfil-grid">

        <div class="perfil-card datos-card">
          <h3><i class="fa-solid fa-id-card"></i> Datos personales</h3>
          <div class="datos-row"><span class="datos-label">Matrícula</span><span class="datos-value">${USER_DATA.matricula}</span></div>
          <div class="datos-row"><span class="datos-label">Nombre</span><span class="datos-value">${USER_DATA.nombre} ${USER_DATA.apellidop} ${USER_DATA.apellidom}</span></div>
          <div class="datos-row"><span class="datos-label">Correo institucional</span><span class="datos-value">${USER_DATA.institutional_email}</span></div>
          <div class="datos-row"><span class="datos-label">Correo personal</span><span class="datos-value" id="perfilCorreoPersonal">${USER_DATA.personal_email || ''}</span></div>
          <div class="datos-row"><span class="datos-label">Celular</span><span class="datos-value" id="perfilCelular">${USER_DATA.cell}</span></div>
          <div class="datos-row"><span class="datos-label">Semestre</span><span class="datos-value">${USER_DATA.semestre}°</span></div>
        </div>

        <div class="perfil-card notifs-card">
          <h3><i class="fa-solid fa-bell"></i> Notificaciones</h3>
          <div class="toggle-row">
            <span>Recibir recordatorios por correo</span>
            <label class="toggle">
              <input type="checkbox" id="notifToggle" ${notifsOn ? "checked" : ""}>
              <span class="slider"></span>
            </label>
          </div>
          <p class="toggle-desc">${notifsOn ? "Recibirás avisos antes de cada AFI." : "No recibirás recordatorios por correo."}</p>
        </div>

        <div class="perfil-card editar-card">
          <h3><i class="fa-solid fa-pen"></i> Editar perfil</h3>
          <div class="edit-field">
            <label>Correo personal</label>
            <div class="edit-input-group">
              <input type="email" id="editEmail" value="${USER_DATA.personal_email || ''}">
              <button class="edit-save-btn" id="saveEmail"><i class="fa-solid fa-check"></i></button>
            </div>
          </div>
          <div class="edit-field">
            <label>Celular</label>
            <div class="edit-input-group">
              <input type="tel" id="editCell" value="${USER_DATA.cell}" maxlength="10" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
              <button class="edit-save-btn" id="saveCell"><i class="fa-solid fa-check"></i></button>
            </div>
          </div>
          <div class="edit-field">
            <label>Semestre</label>
            <div class="edit-input-group">
              <select id="editSemestre">
                ${[1,2,3,4,5,6,7,8,9,10,11,12].map(s =>
                  `<option value="${s}" ${s === USER_DATA.semestre ? "selected" : ""}>${s}° Semestre</option>`
                ).join("")}
              </select>
              <button class="edit-save-btn" id="saveSemestre"><i class="fa-solid fa-check"></i></button>
            </div>
          </div>
          <span class="edit-feedback" id="editFeedback"></span>
        </div>

      </div>
    `;

    document.getElementById("notifToggle").addEventListener("change", function () {
      localStorage.setItem("notif_afihub", this.checked ? "on" : "off");
      document.querySelector(".toggle-desc").textContent = this.checked
        ? "Recibirás avisos antes de cada AFI."
        : "No recibirás recordatorios por correo.";
    });

    document.getElementById("saveEmail").addEventListener("click", async () => {
      const val = document.getElementById("editEmail").value.trim();
      if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showEditFeedback("Ingresa un correo válido", "error");
        return;
      }
      const res = await fetch("controllers/actualizar_perfil.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campo: "personal_email", valor: val })
      });
      const data = await res.json();
      if (data.success) {
        USER_DATA.personal_email = val;
        document.getElementById("perfilCorreoPersonal").textContent = val;
        showEditFeedback("Correo actualizado", "ok");
      } else {
        showEditFeedback(data.message || "Error al actualizar", "error");
      }
    });

    document.getElementById("saveCell").addEventListener("click", async () => {
      const val = document.getElementById("editCell").value;
      if (val.length !== 10) {
        showEditFeedback("El celular debe tener 10 dígitos", "error");
        return;
      }
      const res = await fetch("controllers/actualizar_perfil.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campo: "cell", valor: val })
      });
      const data = await res.json();
      if (data.success) {
        USER_DATA.cell = val;
        document.getElementById("perfilCelular").textContent = val;
        showEditFeedback("Celular actualizado", "ok");
      } else {
        showEditFeedback(data.message || "Error al actualizar", "error");
      }
    });

    document.getElementById("saveSemestre").addEventListener("click", async () => {
      const val = parseInt(document.getElementById("editSemestre").value);
      const res = await fetch("controllers/actualizar_perfil.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campo: "semestre", valor: val })
      });
      const data = await res.json();
      if (data.success) {
        USER_DATA.semestre = val;
        document.querySelectorAll(".datos-row").forEach(row => {
          if (row.querySelector(".datos-label")?.textContent === "Semestre") {
            row.querySelector(".datos-value").textContent = val + "°";
          }
        });
        document.querySelector(".dash-semestre").textContent = "Semestre " + val;
        showEditFeedback("Semestre actualizado", "ok");
      } else {
        showEditFeedback(data.message || "Error al actualizar", "error");
      }
    });
  }

  function showEditFeedback(msg, type) {
    const el = document.getElementById("editFeedback");
    el.textContent = msg;
    el.className = "edit-feedback visible " + type;
    setTimeout(() => el.classList.remove("visible"), 3000);
  }

  renderAreas();
  renderProgreso();
  renderPerfil();

  const supportBtn = document.getElementById("supportBtn");
  supportBtn.addEventListener("click", () => {
    alert("¿Tienes dudas? Contacta a tu tutor o escribe a soporte@afihub.uanl.mx");
  });

  const tabs = document.querySelectorAll(".tab-btn");
  const panels = {
    areas: document.getElementById("panel-areas"),
    progreso: document.getElementById("panel-progreso"),
    perfil: document.getElementById("panel-perfil"),
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      Object.values(panels).forEach(p => p.classList.remove("active"));
      const target = tab.dataset.tab;
      if (panels[target]) panels[target].classList.add("active");
    });
  });

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("dashNav");
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

});
