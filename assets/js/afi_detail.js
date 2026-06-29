document.addEventListener("DOMContentLoaded", () => {

  const allAfis = {
    101: { nombre: "Salud Mental y Bienestar", fecha: "15/07/2026", hora: "10:00", duracion: "45 min", descripcion: "Estrategias para el cuidado de la salud mental en el ámbito universitario.", contexto: "En este AFI exploraremos las principales estrategias de prevención y cuidado de la salud mental, con un enfoque en estudiantes de ciencias de la salud. Revisaremos factores de riesgo, señales de alerta y recursos de apoyo disponibles en la comunidad universitaria.", estado: "no_inscrito" },
    102: { nombre: "Manejo del Estrés Académico", fecha: "22/07/2026", hora: "14:00", duracion: "30 min", descripcion: "Técnicas para reducir el estrés durante exámenes y carga académica.", contexto: "El estrés académico es una de las principales causas de deserción universitaria. En esta actividad conocerás técnicas de respiración, organización del tiempo y manejo de ansiedad que te ayudarán a enfrentar tu vida académica con mayor bienestar.", estado: "inscrito" },
    201: { nombre: "Prevención de Enfermedades Crónicas", fecha: "18/07/2026", hora: "09:00", duracion: "60 min", descripcion: "Importancia de la detección temprana y prevención.", contexto: "Las enfermedades crónicas representan la principal carga de enfermedad a nivel global. Abordaremos estrategias de prevención primaria, tamizaje y estilos de vida saludables para reducir su incidencia en la población.", estado: "no_inscrito" },
    202: { nombre: "Vacunación y Cobertura", fecha: "25/07/2026", hora: "11:00", duracion: "40 min", descripcion: "Panorama actual de vacunación en México.", contexto: "La vacunación es una de las intervenciones más costo-efectivas en salud pública. En este AFI revisaremos el esquema nacional de vacunación, coberturas actuales y los retos para eliminar enfermedades prevenibles.", estado: "no_inscrito" },
    203: { nombre: "Nutrición Comunitaria", fecha: "30/07/2026", hora: "08:00", duracion: "50 min", descripcion: "Hábitos alimenticios en comunidades vulnerables.", contexto: "La malnutrición afecta desproporcionadamente a comunidades vulnerables. Analizaremos intervenciones comunitarias exitosas y el papel del personal de salud en la promoción de una alimentación adecuada.", estado: "completado" },
    301: { nombre: "Introducción a la Investigación Clínica", fecha: "20/07/2026", hora: "12:00", duracion: "35 min", descripcion: "Fundamentos de la investigación en ciencias de la salud.", contexto: "La investigación clínica es la base de la medicina basada en evidencia. Conocerás los tipos de estudios, consideraciones éticas y las fases de un proyecto de investigación en ciencias de la salud.", estado: "no_inscrito" },
  };

  const afi = allAfis[AFI_ID];
  const container = document.getElementById("afiDetail");

  if (!afi) {
    container.innerHTML = '<div class="panel-header"><h1>AFI no encontrado</h1></div>';
    return;
  }

  function render() {
    let btnHtml = "";
    if (afi.estado === "completado") {
      btnHtml = '<button class="btn-afi disabled-btn" disabled style="width:100%;justify-content:center;"><i class="fa-solid fa-check"></i> Completado</button>';
    } else if (afi.estado === "inscrito") {
      btnHtml = '<button class="btn-afi btn-inscrito" disabled style="width:100%;justify-content:center;"><i class="fa-solid fa-clock"></i> Inscrito — Esperando fecha</button>';
    } else {
      btnHtml = '<button class="btn-afi btn-primary-afi" id="btnInscribir" style="width:100%;justify-content:center;"><i class="fa-solid fa-pen-to-square"></i> Inscribirme</button>';
    }

    container.innerHTML = `
      <div class="panel-header">
        <h1>${afi.nombre}</h1>
        <p>${afi.descripcion}</p>
      </div>

      <div class="afi-detail-card">
        <div class="afi-detail-meta">
          <div class="meta-item">
            <i class="fa-regular fa-calendar"></i>
            <div>
              <span class="meta-label">Fecha</span>
              <span class="meta-value">${afi.fecha}</span>
            </div>
          </div>
          <div class="meta-item">
            <i class="fa-regular fa-clock"></i>
            <div>
              <span class="meta-label">Hora</span>
              <span class="meta-value">${afi.hora}</span>
            </div>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-hourglass-half"></i>
            <div>
              <span class="meta-label">Duración</span>
              <span class="meta-value">${afi.duracion}</span>
            </div>
          </div>
        </div>

        <div class="afi-contexto">
          <h3><i class="fa-solid fa-book-open"></i> Contexto</h3>
          <p>${afi.contexto}</p>
        </div>

        <div class="afi-detail-action">
          ${btnHtml}
          ${afi.estado === "inscrito" ? '<p class="inscrito-msg"><i class="fa-solid fa-envelope"></i> Te enviaremos un recordatorio a tu correo institucional y personal cuando se acerque la fecha.</p>' : ''}
        </div>
      </div>
    `;

    const btn = document.getElementById("btnInscribir");
    if (btn) {
      btn.addEventListener("click", () => {
        afi.estado = "inscrito";
        render();
      });
    }
  }

  render();

});
