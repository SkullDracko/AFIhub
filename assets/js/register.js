document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registerForm");
  const generalError = document.getElementById("register-general-error");

  function clearErrors() {
    document.querySelectorAll(".error-msg").forEach(e => e.classList.remove("visible"));
    document.querySelectorAll(".input-group").forEach(e => e.classList.remove("error", "success"));
    generalError.classList.remove("visible");
  }

  function showError(id, msg) {
    const err = document.getElementById("err-" + id);
    const ig = document.getElementById("ig-" + id);
    if (err) { err.textContent = msg; err.classList.add("visible"); }
    if (ig) { ig.classList.add("error"); }
  }

  function showSuccess(id) {
    const ig = document.getElementById("ig-" + id);
    if (ig) ig.classList.add("success");
  }

  function validateField(id, value, test, errorMsg) {
    if (!test(value)) {
      showError(id, errorMsg);
      return false;
    }
    showSuccess(id);
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const fields = {
      matricula: document.getElementById("reg-matricula").value,
      apellidop: document.getElementById("reg-apellidop").value.trim(),
      apellidom: document.getElementById("reg-apellidom").value.trim(),
      nombre: document.getElementById("reg-nombre").value.trim(),
      inst_email: document.getElementById("reg-inst-email").value.trim(),
      personal_email: document.getElementById("reg-personal-email").value.trim(),
      cell: document.getElementById("reg-cell").value,
      semestre: document.getElementById("reg-semestre").value
    };

    let valid = true;

    valid &= validateField("matricula", fields.matricula,
      v => /^\d{7,}$/.test(v),
      "La matrícula debe tener al menos 7 dígitos");

    valid &= validateField("apellidop", fields.apellidop,
      v => v.length > 0 && !/\d/.test(v),
      "El apellido paterno es obligatorio y no debe contener números");

    if (fields.apellidom.length > 0) {
      valid &= validateField("apellidom", fields.apellidom,
        v => !/\d/.test(v),
        "El apellido no debe contener números");
    } else {
      showSuccess("apellidom");
    }

    valid &= validateField("nombre", fields.nombre,
      v => v.length > 0 && !/\d/.test(v),
      "El nombre es obligatorio y no debe contener números");

    valid &= validateField("inst_email", fields.inst_email,
      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Ingresa un correo institucional válido");

    if (fields.personal_email.length > 0) {
      valid &= validateField("personal_email", fields.personal_email,
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        "Ingresa un correo personal válido");
    } else {
      showSuccess("personal_email");
    }

    valid &= validateField("cell", fields.cell,
      v => /^\d{10}$/.test(v),
      "El celular debe tener exactamente 10 dígitos");

    valid &= validateField("semestre", fields.semestre,
      v => v !== "" && parseInt(v) >= 1 && parseInt(v) <= 12,
      "Selecciona un semestre válido");

    if (!valid) return;

    const btn = form.querySelector(".login-btn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registrando...';

    try {
      const res = await fetch("../../controllers/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields)
      });

      const data = await res.json();

      if (data.success) {
        document.querySelector(".panel-content").classList.add("fade-out");
        setTimeout(() => { window.location.href = data.redirect; }, 300);
      } else {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Crear cuenta';

        if (data.errors) {
          for (const [field, msg] of Object.entries(data.errors)) {
            showError(field, msg);
          }
        }
        if (data.message) {
          generalError.textContent = data.message;
          generalError.classList.add("visible");
        }
      }
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Crear cuenta';
      generalError.textContent = "Error de conexión. Intenta de nuevo.";
      generalError.classList.add("visible");
    }
  });

  document.querySelectorAll(".input-group input, .input-group select").forEach(el => {
    el.addEventListener("input", () => {
      const ig = el.closest(".input-group");
      ig.classList.remove("error", "success");
      const fieldId = el.id.replace("reg-", "");
      const err = document.getElementById("err-" + fieldId);
      if (err) err.classList.remove("visible");
    });
    el.addEventListener("change", () => {
      const ig = el.closest(".input-group");
      ig.classList.remove("error", "success");
      const fieldId = el.id.replace("reg-", "");
      const err = document.getElementById("err-" + fieldId);
      if (err) err.classList.remove("visible");
    });
  });

  document.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("target") === "_blank") return;
      e.preventDefault();
      const href = link.getAttribute("href");
      document.querySelector(".panel-content").classList.add("fade-out");
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });

});
