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

  renderAreas();

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
