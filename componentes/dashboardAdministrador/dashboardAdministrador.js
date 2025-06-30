import { crearDashboardProfesor } from '../dashboardProfesor/dashboardProfesor.js';
import { crearDashboardCoordinador } from '../dashboardCoordinador/dashboardCoordinador.js';

export function crearDashboardAdministrador(navegarA) {
  const container = document.createElement('div');
  container.classList.add('dashboard-admin');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Dashboard Administrador';
  container.appendChild(titulo);

  const btnCerrarSesion = document.createElement('button');
  btnCerrarSesion.textContent = 'Cerrar sesión';
  btnCerrarSesion.className = 'btn-cerrar';
  btnCerrarSesion.addEventListener('click', () => {
    localStorage.clear();
    navegarA(window.crearLogin(navegarA));
  });
  container.appendChild(btnCerrarSesion);

  const acciones = document.createElement('div');
  acciones.className = 'acciones-admin';

  const btnVistaProfesor = crearBoton('Vista Profesor', () => 
    navegarA(crearDashboardProfesor(navegarA, null, () => navegarA(crearDashboardAdministrador(navegarA))))
  );

  const btnVistaCoordinador = crearBoton('Vista Coordinador', () => 
    navegarA(crearDashboardCoordinador(navegarA, () => navegarA(crearDashboardAdministrador(navegarA))))
  );

  const btnAgregarNivel = crearBoton('Agregar Nivel', () => mostrarFormularioNivel());
  const btnAgregarGrado = crearBoton('Agregar Grado', () => mostrarFormularioGrado());
  const btnEliminarEdicion = crearBoton('Eliminar Ediciones', () => alert('⚠️ Ediciones eliminadas (simulado)'));
  const btnHorarioAsistencia = crearBoton('Establecer Horario', () => mostrarFormularioHorario());

  // Secciones de botones agrupadas para mejor organización visual
  const seccionVistas = document.createElement('div');
  seccionVistas.className = 'seccion-botones';
  const tituloVistas = document.createElement('h4');
  tituloVistas.textContent = '🔄 Cambiar vista';
  seccionVistas.append(
    tituloVistas,
    btnVistaProfesor,
    btnVistaCoordinador
  );

  const seccionGestion = document.createElement('div');
  seccionGestion.className = 'seccion-botones';
  const tituloGestion = document.createElement('h4');
  tituloGestion.textContent = '📚 Gestión Académica';
  seccionGestion.append(
    tituloGestion,
    btnAgregarNivel,
    btnAgregarGrado,
    btnEliminarEdicion
  );

  const seccionHorario = document.createElement('div');
  seccionHorario.className = 'seccion-botones';
  const tituloHorario = document.createElement('h4');
  tituloHorario.textContent = '⏰ Horario';
  seccionHorario.append(
    tituloHorario,
    btnHorarioAsistencia
  );

  acciones.append(seccionVistas, seccionGestion, seccionHorario);
  container.appendChild(acciones);

  const formulario = document.createElement('div');
  formulario.className = 'formulario-admin';
  container.appendChild(formulario);

  function crearBoton(texto, accion) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.addEventListener('click', accion);
    return btn;
  }

  function mostrarFormularioNivel() {
    formulario.innerHTML = '';
    const form = document.createElement('form');
    form.innerHTML = `
      <h3>Agregar Nuevo Nivel</h3>
      <input type="text" placeholder="Nombre del Nivel (Ej. Quinto)" required />
      <button type="submit">Guardar Nivel</button>
    `;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✅ Nivel agregado correctamente (simulado).');
      form.reset();
    });
    formulario.appendChild(form);
  }

  function mostrarFormularioGrado() {
    formulario.innerHTML = '';
    const form = document.createElement('form');
    form.innerHTML = `
      <h3>Agregar Nuevo Grado</h3>
      <input type="text" placeholder="Nombre del Grado (Ej. Quinto A)" required />
      <select required>
        <option value="">Seleccione Nivel</option>
        <option value="1">Primero</option>
        <option value="2">Segundo</option>
        <option value="3">Tercero</option>
        <option value="4">Cuarto</option>
      </select>
      <button type="submit">Guardar Grado</button>
    `;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✅ Grado agregado correctamente (simulado).');
      form.reset();
    });
    formulario.appendChild(form);
  }

  function mostrarFormularioHorario() {
    formulario.innerHTML = '';
    const form = document.createElement('form');
    form.innerHTML = `
      <h3>Establecer Horario de Asistencia</h3>
      <label>Hora de inicio:</label>
      <input type="time" required />
      <label>Hora de fin:</label>
      <input type="time" required />
      <button type="submit">Guardar Horario</button>
    `;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🕒 Horario establecido correctamente (simulado).');
      form.reset();
    });
    formulario.appendChild(form);
  }

  return container;
}
