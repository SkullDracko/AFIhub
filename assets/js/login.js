document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const generalError = document.getElementById("login-general-error");

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

    const matricula = document.getElementById("matricula").value;
    const correo = document.getElementById("correo").value;

    let valid = true;

    valid &= validateField("matricula", matricula,
      v => /^\d{7,}$/.test(v),
      "La matrícula debe tener al menos 7 dígitos");

    valid &= validateField("correo", correo,
      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Ingresa un correo válido");

    if (!valid) return;

    const btn = form.querySelector(".login-btn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Ingresando...';

    try {
      const res = await fetch("controllers/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ matricula, correo })
      });

      const data = await res.json();

      if (data.success) {
        document.querySelector(".panel-content").classList.add("fade-out");
        setTimeout(() => { window.location.href = data.redirect; }, 300);
      } else {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Iniciar sesión';

        if (data.errors) {
          const fieldMap = { matricula: "matricula", correo: "correo" };
          for (const [field, msg] of Object.entries(data.errors)) {
            showError(fieldMap[field] || field, msg);
          }
        }
        if (data.message) {
          generalError.textContent = data.message;
          generalError.classList.add("visible");
        }
      }
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Iniciar sesión';
      generalError.textContent = "Error de conexión. Intenta de nuevo.";
      generalError.classList.add("visible");
    }
  });

  document.querySelectorAll(".input-group input").forEach(input => {
    input.addEventListener("input", () => {
      const ig = input.closest(".input-group");
      ig.classList.remove("error", "success");
      const id = input.id;
      const err = document.getElementById("err-" + (id === "matricula" ? "matricula" : "correo"));
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
