export function crearRegistro(navegarA) {
  const div = document.createElement('div');
  div.className = "form-container";
  div.innerHTML = `
    <h2>Crear Cuenta</h2>
    <input type="text" placeholder="Nombre completo">
    <input type="email" placeholder="Correo electrónico">
    <input type="password" placeholder="Contraseña">
    <button class="btn">Registrarse</button>

    <div class="form-links">
      <button class="link-btn" id="to-login">¿Ya tienes cuenta?</button>
    </div>
  `;

  div.querySelector("#to-login").addEventListener("click", () => {
    navegarA(window.crearLogin(navegarA));
  });

  return div;
}
