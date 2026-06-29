document.addEventListener("DOMContentLoaded", () => {

  const allAreas = [
    {
      id: 1,
      nombre: "Área 1",
      afis: [
        { id: 101, nombre: "Salud Mental y Bienestar", fecha: "15/07/2026", hora: "10:00", duracion: "45 min", descripcion: "Estrategias para el cuidado de la salud mental en el ámbito universitario.", estado: "no_inscrito" },
        { id: 102, nombre: "Manejo del Estrés Académico", fecha: "22/07/2026", hora: "14:00", duracion: "30 min", descripcion: "Técnicas para reducir el estrés durante exámenes y carga académica.", estado: "inscrito" },
      ]
    },
    {
      id: 2,
      nombre: "Área 2",
      afis: [
        { id: 201, nombre: "Prevención de Enfermedades Crónicas", fecha: "18/07/2026", hora: "09:00", duracion: "60 min", descripcion: "Importancia de la detección temprana y prevención.", estado: "no_inscrito" },
        { id: 202, nombre: "Vacunación y Cobertura", fecha: "25/07/2026", hora: "11:00", duracion: "40 min", descripcion: "Panorama actual de vacunación en México.", estado: "no_inscrito" },
        { id: 203, nombre: "Nutrición Comunitaria", fecha: "30/07/2026", hora: "08:00", duracion: "50 min", descripcion: "Hábitos alimenticios en comunidades vulnerables.", estado: "completado" },
      ]
    },
    {
      id: 3,
      nombre: "Área 3",
      afis: [
        { id: 301, nombre: "Introducción a la Investigación Clínica", fecha: "20/07/2026", hora: "12:00", duracion: "35 min", descripcion: "Fundamentos de la investigación en ciencias de la salud.", estado: "no_inscrito" },
      ]
    }
  ];

  const area = allAreas.find(a => a.id === AREA_ID);
  if (!area) {
    document.getElementById("afisList").innerHTML = '<p style="color:#b99ac8;">Área no encontrada.</p>';
    return;
  }

  function estadoLabel(estado) {
    const map = {
      no_inscrito: { text: "No inscrito", cls: "badge-gray" },
      inscrito: { text: "Inscrito", cls: "badge-purple" },
      completado: { text: "Completado", cls: "badge-green" },
    };
    return map[estado] || map.no_inscrito;
  }

  function estadoBoton(estado) {
    if (estado === "completado") return '<button class="btn-afi disabled-btn" disabled><i class="fa-solid fa-check"></i> Completado</button>';
    if (estado === "inscrito") return '<button class="btn-afi btn-inscrito"><i class="fa-solid fa-clock"></i> Inscrito — Esperando fecha</button>';
    return '<button class="btn-afi btn-primary-afi"><i class="fa-solid fa-pen-to-square"></i> Inscribirme</button>';
  }

  const list = document.getElementById("afisList");
  list.innerHTML = area.afis.map(afi => {
    const badge = estadoLabel(afi.estado);
    return `
      <div class="afi-card" data-afi-id="${afi.id}">
        <div class="afi-info">
          <h2>${afi.nombre}</h2>
          <p class="afi-desc">${afi.descripcion}</p>
          <div class="afi-meta">
            <span><i class="fa-regular fa-calendar"></i> ${afi.fecha}</span>
            <span><i class="fa-regular fa-clock"></i> ${afi.hora}</span>
            <span><i class="fa-solid fa-hourglass-half"></i> ${afi.duracion}</span>
          </div>
          <span class="afi-badge ${badge.cls}">${badge.text}</span>
        </div>
        <div class="afi-action">
          ${estadoBoton(afi.estado)}
        </div>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".afi-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-afi")) return;
      const afiId = card.dataset.afiId;
      window.location.href = `../../views/student/afi_detail.php?id=${afiId}`;
    });
  });

});
