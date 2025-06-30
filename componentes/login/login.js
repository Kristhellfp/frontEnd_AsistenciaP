export function crearLogin(navegarA) {
  const div = document.createElement('div');
  div.className = "form-container";
  div.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <input id="login-usuario" type="text" placeholder="Usuario o correo" required>
    <input id="login-pass" type="password" placeholder="Contraseña" required>
    <button id="btn-login" class="btn">Ingresar</button>

    <div id="role-selection" class="hidden">
      <h3>Selecciona tu rol:</h3>
      <button class="btn-role" data-role="coordinador">Coordinador</button>
      <button class="btn-role" data-role="administrador">Administrador</button>
      <button class="btn-role" data-role="profesor">Profesor</button>
    </div>

    <div class="form-links">
      <button class="link-btn" id="to-registro">¿No tienes cuenta?</button>
      <button class="link-btn" id="to-recuperar">¿Olvidaste tu contraseña?</button>
    </div>
  `;

  const btnLogin = div.querySelector('#btn-login');
  const roleSelection = div.querySelector('#role-selection');
  const roleButtons = div.querySelectorAll('.btn-role');

  btnLogin.addEventListener('click', () => {
    const usuario = div.querySelector('#login-usuario').value.trim();
    const pass = div.querySelector('#login-pass').value.trim();

    if (!usuario || !pass) {
      alert('Por favor, ingresa usuario y contraseña.');
      return;
    }

    localStorage.setItem('token', 'token-falso'); 

    btnLogin.classList.add('hidden');
    roleSelection.classList.remove('hidden');
  });

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const rol = btn.dataset.role;

      switch (rol) {
        case 'profesor':
          navegarA(window.crearDashboardProfesor(navegarA));
          break;
        case 'coordinador':
          navegarA(window.crearDashboardCoordinador(navegarA));
          break;
        case 'administrador':
         
          navegarA(window.crearDashboardAdministrador(navegarA));
          break;
        default:
          alert('Rol no reconocido');
      }

      btnLogin.classList.remove('hidden');
      roleSelection.classList.add('hidden');
    });
  });

  div.querySelector("#to-registro").addEventListener("click", () => {
    navegarA(window.crearRegistro(navegarA));
  });

  div.querySelector("#to-recuperar").addEventListener("click", () => {
    navegarA(window.crearRecuperar(navegarA));
  });

  return div;
}
