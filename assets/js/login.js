document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.querySelector(".login-btn");
    loginBtn.addEventListener("click", login);

    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") login();
    });

    function login() {
        const matricula = document.getElementById("matricula").value;
        const correo = document.getElementById("correo").value;

        if (!matricula || !correo) {
            alert("Completa todos los campos");
            return;
        }

        if (!/^\d+$/.test(matricula)) {
            alert("La matrícula solo debe contener números");
            return;
        }

        console.log("Iniciando sesión...");
        // window.location.href = "dashboard.html";
    }

});
