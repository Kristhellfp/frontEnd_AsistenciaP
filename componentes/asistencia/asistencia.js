export function crearVistaAsistencia(navegarA) {
  const container = document.createElement('div');
  container.classList.add('asistencia-container');

  container.innerHTML = `
    <h2>Tomar Asistencia (Datos Simulados)</h2>

    <div class="controles">
      <label for="grado-select">Selecciona un grado:</label>
      <select id="grado-select">
        <option value="">-- Elige un grado --</option>
      </select>

      <button id="marcar-todos-presentes" class="btn">Marcar todos Presentes</button>
      <button id="marcar-todos-ausentes" class="btn">Marcar todos Ausentes</button>
    </div>

    <div id="lista-alumnos" class="lista-alumnos"></div>

    <button id="volver" class="btn btn-secundario">Volver al Dashboard</button>
  `;

  // Simulación de datos locales
  const gradosSimulados = [
    { id: 1, nombre: "Primer Grado" },
    { id: 2, nombre: "Segundo Grado" },
    { id: 3, nombre: "Tercer Grado" }
  ];

  const alumnosSimulados = {
    1: [
      { id: 101, nombre: "Ana Pérez" },
      { id: 102, nombre: "Luis Gómez" }
    ],
    2: [
      { id: 201, nombre: "Carlos Ruiz" }
    ],
    3: [
      { id: 301, nombre: "Juan López" },
      { id: 302, nombre: "Lucía Torres" }
    ]
  };

  const gradoSelect = container.querySelector('#grado-select');
  const listaAlumnos = container.querySelector('#lista-alumnos');
  const btnMarcarTodosPresentes = container.querySelector('#marcar-todos-presentes');
  const btnMarcarTodosAusentes = container.querySelector('#marcar-todos-ausentes');
  const btnVolver = container.querySelector('#volver');

  let asistencia = {};

  // Cargar grados simulados en select
  function cargarGrados() {
    gradosSimulados.forEach(g => {
      const option = document.createElement('option');
      option.value = g.id;
      option.textContent = g.nombre;
      gradoSelect.appendChild(option);
    });
  }

  // Mostrar alumnos del grado simulado
  function mostrarAlumnos(gradoId) {
    listaAlumnos.innerHTML = '';
    asistencia = {};

    if (!gradoId) {
      listaAlumnos.textContent = 'Selecciona un grado para ver los alumnos.';
      return;
    }

    const alumnos = alumnosSimulados[gradoId] || [];
    if (alumnos.length === 0) {
      listaAlumnos.textContent = 'No hay alumnos en este grado.';
      return;
    }

    alumnos.forEach(alumno => {
      asistencia[alumno.id] = 'ausente';

      const divAlumno = document.createElement('div');
      divAlumno.classList.add('alumno-item');
      divAlumno.innerHTML = `
        <span class="nombre-alumno">${alumno.nombre}</span>
        <button class="btn-asistencia" data-id="${alumno.id}" data-estado="presente" title="Presente">✅</button>
        <button class="btn-asistencia" data-id="${alumno.id}" data-estado="ausente" title="Ausente">❌</button>
        <button class="btn-asistencia" data-id="${alumno.id}" data-estado="tarde" title="Tarde">⏰</button>
        <span class="estado-asistencia" id="estado-${alumno.id}">Ausente</span>
      `;
      listaAlumnos.appendChild(divAlumno);
    });
  }

  function actualizarEstadoVisual(alumnoId, estado) {
    asistencia[alumnoId] = estado;
    const spanEstado = container.querySelector(`#estado-${alumnoId}`);
    if (!spanEstado) return;

    spanEstado.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);
    spanEstado.style.color =
      estado === 'presente' ? 'green' :
      estado === 'ausente' ? 'red' :
      estado === 'tarde' ? 'orange' : 'black';
  }

  listaAlumnos.addEventListener('click', e => {
    if (e.target.classList.contains('btn-asistencia')) {
      const alumnoId = e.target.dataset.id;
      const estado = e.target.dataset.estado;
      actualizarEstadoVisual(alumnoId, estado);
    }
  });

  btnMarcarTodosPresentes.addEventListener('click', () => {
    Object.keys(asistencia).forEach(id => actualizarEstadoVisual(id, 'presente'));
  });

  btnMarcarTodosAusentes.addEventListener('click', () => {
    Object.keys(asistencia).forEach(id => actualizarEstadoVisual(id, 'ausente'));
  });

  gradoSelect.addEventListener('change', () => {
    mostrarAlumnos(gradoSelect.value);
  });

  btnVolver.addEventListener('click', () => {
    navegarA(window.crearDashboardProfesor(navegarA));
  });

  cargarGrados();
  mostrarAlumnos(null);

  return container;
}
