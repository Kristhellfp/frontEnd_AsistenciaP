import { crearUniforme } from '../uniforme/uniforme.js';
import { crearReporte } from '../reporte/reporte.js';

export function crearDashboardCoordinador(navegarA) {
  const container = document.createElement('div');
  container.classList.add('dashboard-coordinador', 'dashboard-profesor');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Dashboard Coordinador';
  container.appendChild(titulo);

  const btnCerrarSesion = document.createElement('button');
  btnCerrarSesion.textContent = 'Cerrar sesión';
  btnCerrarSesion.className = 'btn-cerrar';
  btnCerrarSesion.addEventListener('click', () => {
    localStorage.clear();
    navegarA(window.crearLogin(navegarA));
  });
  container.appendChild(btnCerrarSesion);

  const niveles = ['Primero', 'Segundo', 'Tercero', 'Cuarto'];
  const selectorContainer = document.createElement('div');
  selectorContainer.className = 'selector-container';

  const selectNivel = document.createElement('select');
  selectNivel.innerHTML = '<option value="">Seleccione un nivel</option>';
  niveles.forEach((nivel, i) => {
    const option = document.createElement('option');
    option.value = i + 1;
    option.textContent = nivel + ' Nivel';
    selectNivel.appendChild(option);
  });
  selectorContainer.appendChild(selectNivel);
  container.appendChild(selectorContainer);

  const acciones = document.createElement('div');
  acciones.className = 'acciones-coordinador';

  const btnAgregarProf = crearBoton('Agregar Profesor', mostrarFormularioAgregar, 'btn-agregar');
  const btnEliminarProf = crearBoton('Eliminar Profesor', eliminarProfesor, 'btn-eliminar');
  const btnVerReporte = crearBoton('Proyección General', mostrarGraficaGeneral, 'btn-reporte');

  acciones.append(btnAgregarProf, btnEliminarProf, btnVerReporte);
  container.appendChild(acciones);

  const profesoresContainer = document.createElement('div');
  profesoresContainer.className = 'profesores-container';
  container.appendChild(profesoresContainer);

  const formContainer = document.createElement('div');
  formContainer.className = 'form-profesor';
  container.appendChild(formContainer);

  const graficasContainer = document.createElement('div');
  graficasContainer.className = 'graficas-container';

  const canvasGeneral = document.createElement('canvas');
  canvasGeneral.id = 'graficaGeneral';
  canvasGeneral.height = 300;
  canvasGeneral.width = 500;
  graficasContainer.appendChild(canvasGeneral);

  container.appendChild(graficasContainer);

  const alumnosContainer = document.createElement('div');
  alumnosContainer.className = 'alumnos-container';
  container.appendChild(alumnosContainer);

  let profesores = [
    { nombre: 'Profa. Fernanda Paz', nivel: 1, grados: ['Primero A', 'Primero B'] },
    { nombre: 'Prof. Josué Fuentes', nivel: 2, grados: ['Segundo A'] },
    { nombre: 'Profa. Ana Morales', nivel: 3, grados: ['Tercero A', 'Tercero B', 'Tercero C'] },
  ];

  const alumnosPorGrado = {
    'Primero A': ['Ana López', 'Carlos Pérez'],
    'Primero B': ['Laura Sánchez'],
    'Segundo A': ['María Díaz', 'José García'],
    'Tercero A': ['Luis Rodríguez'],
    'Tercero B': ['Elena Martínez'],
    'Tercero C': ['Paola Jiménez']
  };

  let estadoAsistencia = {};
  let chartIndividual = null;
  let chartGeneral = null;

  selectNivel.addEventListener('change', () => {
    const nivelId = parseInt(selectNivel.value);
    mostrarProfesores(nivelId);
  });

  function mostrarProfesores(nivelId) {
    profesoresContainer.innerHTML = '';
    alumnosContainer.innerHTML = '';

    profesores.filter(p => p.nivel === nivelId).forEach(p => {
      const div = document.createElement('div');
      div.className = 'profesor-item';

      const spanNombre = document.createElement('span');
      spanNombre.textContent = p.nombre;

      const divGrados = document.createElement('div');
      divGrados.className = 'grados-asignados';
      divGrados.innerHTML = `<strong>Grados asignados:</strong> ${p.grados.join(', ')}`;

      const btnVerGrado = crearBoton('Ver Alumnos', () => mostrarAlumnos(p.grados));
      const btnProyeccion = crearBoton('Ver Proyección', () => mostrarGraficaProfesor(p.nombre));

      div.append(spanNombre, divGrados, btnVerGrado, btnProyeccion);
      profesoresContainer.appendChild(div);
    });
  }

  function mostrarAlumnos(grados) {
    alumnosContainer.innerHTML = '';
    grados.forEach(grado => {
      const tituloGrado = document.createElement('h3');
      tituloGrado.textContent = grado;
      alumnosContainer.appendChild(tituloGrado);

      const alumnos = alumnosPorGrado[grado] || [];
      alumnos.forEach((nombre, idx) => {
        const alumnoId = `${grado}-${idx}`;
        estadoAsistencia[alumnoId] = 'pendiente';

        const div = document.createElement('div');
        div.classList.add('alumno');

        const spanNombre = document.createElement('span');
        spanNombre.className = 'nombre';
        spanNombre.textContent = nombre;
        spanNombre.style.cursor = 'pointer';

        const spanEstado = document.createElement('span');
        spanEstado.className = 'estado';
        spanEstado.textContent = 'Estado: pendiente';

        const btnPresente = crearBoton('✅', () => setEstado(alumnoId, spanEstado, 'presente'));
        const btnAusente = crearBoton('❌', () => setEstado(alumnoId, spanEstado, 'ausente'));
        const btnTarde = crearBoton('⏰', () => setEstado(alumnoId, spanEstado, 'tarde'));

        const btnUniforme = crearBoton('Uniforme', () =>
          navegarA(crearUniforme(navegarA, () => navegarA(crearDashboardCoordinador(navegarA))))
        );

        const btnReporte = crearBoton('Reporte', () => navegarA(crearReporte({ nombre, volver: () => navegarA(crearDashboardCoordinador(navegarA)) }, navegarA)));

        div.append(spanNombre, spanEstado, btnPresente, btnAusente, btnTarde, btnUniforme, btnReporte);
        alumnosContainer.appendChild(div);

        spanNombre.addEventListener('click', () => mostrarGraficaAlumno(nombre));
      });
    });
  }

  function setEstado(id, span, estado) {
    estadoAsistencia[id] = estado;
    span.textContent = `Estado: ${estado}`;
  }

  function mostrarGraficaProfesor(nombre) {
    if (chartGeneral) chartGeneral.destroy();
    const ctx = document.getElementById('graficaGeneral').getContext('2d');
    const datos = {
      presente: Math.floor(Math.random() * 30 + 10),
      ausente: Math.floor(Math.random() * 10),
      tarde: Math.floor(Math.random() * 5),
    };

    chartGeneral = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Presente', 'Ausente', 'Tarde'],
        datasets: [{
          label: `Asistencia de ${nombre}`,
          data: [datos.presente, datos.ausente, datos.tarde],
          backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Proyección de asistencia: ${nombre}`
          },
          legend: { position: 'bottom' }
        }
      }
    });
  }

  function mostrarGraficaGeneral() {
    if (chartGeneral) chartGeneral.destroy();
    const ctx = document.getElementById('graficaGeneral').getContext('2d');
    const presentes = [80, 65, 90, 75];
    const ausentes = [10, 20, 5, 15];
    const tardes = [5, 10, 3, 8];

    chartGeneral = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: niveles,
        datasets: [
          { label: 'Presentes', data: presentes, backgroundColor: 'rgba(40, 167, 69, 0.7)' },
          { label: 'Ausentes', data: ausentes, backgroundColor: 'rgba(220, 53, 69, 0.7)' },
          { label: 'Tarde', data: tardes, backgroundColor: 'rgba(255, 193, 7, 0.7)' },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Proyección general de asistencia por nivel'
          },
          legend: { position: 'top' }
        },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  function mostrarGraficaAlumno(nombre) {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    alumnosContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const datos = {
      presente: Math.floor(Math.random() * 20 + 10),
      ausente: Math.floor(Math.random() * 5),
      tarde: Math.floor(Math.random() * 3),
    };

    if (chartIndividual) chartIndividual.destroy();

    chartIndividual = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Presente', 'Ausente', 'Tarde'],
        datasets: [{
          label: `Asistencia de ${nombre}`,
          data: [datos.presente, datos.ausente, datos.tarde],
          backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
          hoverOffset: 20
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Asistencia individual: ${nombre}`
          },
          legend: { position: 'bottom' }
        }
      }
    });
  }

  function mostrarFormularioAgregar() {
    formContainer.innerHTML = '';

    const form = document.createElement('form');
    form.innerHTML = `
      <h3>Agregar Nuevo Profesor</h3>
      <input type="text" placeholder="Nombre del profesor" required />
      <select required>
        <option value="">Seleccione nivel</option>
        ${niveles.map((n, i) => `<option value="${i + 1}">${n} Nivel</option>`).join('')}
      </select>
      <input type="text" placeholder="Grados asignados (separados por coma)" required />
      <button type="submit">Agregar</button>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.querySelector('input[type="text"]').value.trim();
      const nivel = parseInt(form.querySelector('select').value);
      const gradosInput = form.querySelectorAll('input[type="text"]')[1].value.trim();
      const grados = gradosInput.split(',').map(g => g.trim()).filter(g => g);

      if (!nombre || !nivel || grados.length === 0) return alert('Complete todos los campos');

      profesores.push({ nombre, nivel, grados });
      form.reset();
      alert(`Profesor ${nombre} agregado.`);
      if (selectNivel.value == nivel) mostrarProfesores(nivel);
    });

    formContainer.appendChild(form);
  }

  function eliminarProfesor() {
    const nombre = prompt('Ingrese el nombre completo del profesor a eliminar:');
    if (!nombre) return;
    profesores = profesores.filter(p => p.nombre !== nombre);
    alert(`Profesor ${nombre} eliminado.`);
    if (selectNivel.value) mostrarProfesores(parseInt(selectNivel.value));
  }

  function crearBoton(texto, accion, clase = '') {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.className = clase;
    btn.addEventListener('click', accion);
    return btn;
  }

  return container;
}
