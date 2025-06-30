import { crearUniforme } from '../uniforme/uniforme.js';
import { crearReporte } from '../reporte/reporte.js';

export function crearDashboardProfesor(navegarA) {
  const container = document.createElement('div');
  container.classList.add('dashboard-profesor');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Dashboard Profesor';
  container.appendChild(titulo);

  const btnCerrarSesion = document.createElement('button');
  btnCerrarSesion.textContent = 'Cerrar sesión';
  btnCerrarSesion.className = 'btn-cerrar';
  btnCerrarSesion.addEventListener('click', () => {
    localStorage.clear();
    navegarA(window.crearLogin(navegarA));
  });
  container.appendChild(btnCerrarSesion);

  const gradosContainer = document.createElement('div');
  gradosContainer.classList.add('grados-container');
  container.appendChild(gradosContainer);

  const gradosSelect = document.createElement('select');
  gradosSelect.innerHTML = `<option value="">Seleccione un grado</option>`;
  ['Primero', 'Segundo', 'Tercero', 'Cuarto'].forEach((grado, idx) => {
    const option = document.createElement('option');
    option.value = idx + 1;
    option.textContent = grado + ' grado';
    gradosSelect.appendChild(option);
  });
  gradosContainer.appendChild(gradosSelect);

  const accionesContainer = document.createElement('div');
  accionesContainer.classList.add('acciones-container');

  const btnTodosPresentes = crearBoton('Marcar todos como Presentes', () => marcarTodos('presente'));
  const btnTodosAusentes = crearBoton('Marcar todos como Ausentes', () => marcarTodos('ausente'));
  const btnGuardar = crearBoton('Guardar Asistencia del Grado', guardarAsistencia);
  btnGuardar.classList.add('btn-guardar');
  const btnEnviarReporteGeneral = crearBoton('Enviar reporte a todos', enviarReporteGeneral);
  btnEnviarReporteGeneral.classList.add('btn-reporte-general');

  accionesContainer.append(btnTodosPresentes, btnTodosAusentes, btnGuardar, btnEnviarReporteGeneral);
  container.appendChild(accionesContainer);

  const alumnosContainer = document.createElement('div');
  alumnosContainer.classList.add('alumnos-container');
  container.appendChild(alumnosContainer);

  const graficasContainer = document.createElement('div');
  graficasContainer.classList.add('graficas-container');
  container.appendChild(graficasContainer);

  const canvasGeneral = document.createElement('canvas');
  canvasGeneral.id = 'graficaGeneral';
  graficasContainer.appendChild(canvasGeneral);

  const canvasAlumno = document.createElement('canvas');
  canvasAlumno.id = 'graficaAlumno';
  graficasContainer.appendChild(canvasAlumno);

  const alumnosPorGrado = {
    1: ['Ana López', 'Carlos Pérez'],
    2: ['María Díaz', 'José García'],
    3: ['Luis Rodríguez', 'Elena Martínez'],
    4: ['Juan Torres', 'Paola Jiménez'],
  };

  let estadoAsistencia = {};

  let chartGeneral = null;
  let chartIndividual = null;

  gradosSelect.addEventListener('change', () => {
    const gradoId = parseInt(gradosSelect.value);
    if (gradoId) {
      mostrarAlumnos(gradoId);
      mostrarGraficaGeneral();
    } else {
      alumnosContainer.innerHTML = '';
      borrarGraficas();
    }
  });

  function mostrarAlumnos(gradoId) {
    alumnosContainer.innerHTML = '';
    estadoAsistencia = {};

    alumnosPorGrado[gradoId]?.forEach((nombre, idx) => {
      const alumnoId = `${gradoId}-${idx}`;
      estadoAsistencia[alumnoId] = 'pendiente';

      const div = document.createElement('div');
      div.classList.add('alumno');

      const spanNombre = document.createElement('span');
      spanNombre.className = 'nombre';
      spanNombre.textContent = nombre;
      spanNombre.style.cursor = 'pointer';
      spanNombre.title = 'Click para ver gráfica individual';

      const spanEstado = document.createElement('span');
      spanEstado.className = 'estado';
      spanEstado.textContent = 'Estado: pendiente';

      const btnPresente = crearBoton('✅', () => setEstado(alumnoId, spanEstado, 'presente'), 'btn-asistencia');
      const btnAusente = crearBoton('❌', () => setEstado(alumnoId, spanEstado, 'ausente'), 'btn-asistencia');
      const btnTarde = crearBoton('⏰', () => setEstado(alumnoId, spanEstado, 'tarde'), 'btn-asistencia');

      const btnUniforme = crearBoton('Uniforme', () => navegarA(crearUniforme(navegarA)), 'btn-uniforme');
      const btnReporte = crearBoton('Reporte', () => navegarA(crearReporte({ nombre }, navegarA)), 'btn-reporte');
      const btnEliminar = crearBoton('Eliminar', () => eliminarAlumno(nombre), 'btn-eliminar');

      spanNombre.addEventListener('click', () => {
        mostrarGraficaAlumno(nombre);
      });

      div.append(spanNombre, spanEstado, btnPresente, btnAusente, btnTarde, btnUniforme, btnReporte, btnEliminar);
      alumnosContainer.appendChild(div);
    });

    agregarFormularioAlumno(gradoId);
  }

  function setEstado(id, span, estado) {
    estadoAsistencia[id] = estado;
    span.textContent = `Estado: ${estado}`;
  }

  function marcarTodos(estado) {
    document.querySelectorAll('.alumno').forEach(alumno => {
      const spanEstado = alumno.querySelector('.estado');
      spanEstado.textContent = `Estado: ${estado}`;
      const id = alumno.querySelector('.nombre').textContent;
      for (const key in estadoAsistencia) {
        if (key.includes(id.split(' ')[0])) { 
          estadoAsistencia[key] = estado;
        }
      }
    });
  }

  function guardarAsistencia() {
    const resumen = Object.entries(estadoAsistencia)
      .map(([id, estado]) => `• ${id}: ${estado}`)
      .join('\n');
    alert(`📋 Asistencia guardada:\n\n${resumen}`);
  }

  function eliminarAlumno(nombre) {
    const pwd = prompt(`Confirma tu contraseña para eliminar a "${nombre}":`);
    if (pwd) {
      alert(`Alumno "${nombre}" eliminado (simulado).`);
    }
  }

  function agregarFormularioAlumno(gradoId) {
    const formExistente = alumnosContainer.querySelector('form');
    if (formExistente) formExistente.remove();

    const form = document.createElement('form');
    form.innerHTML = `
      <h3>Agregar nuevo alumno</h3>
      <input type="text" placeholder="Nombre alumno" required />
      <button type="submit">Agregar</button>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.querySelector('input').value.trim();
      if (!nombre) return alert('Ingrese un nombre');

      if (!alumnosPorGrado[gradoId]) alumnosPorGrado[gradoId] = [];
      alumnosPorGrado[gradoId].push(nombre);
      mostrarAlumnos(gradoId);
      alert(`Alumno "${nombre}" agregado.`);
    });

    alumnosContainer.appendChild(form);
  }

  function crearBoton(texto, accion, clase = '') {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.className = clase;
    btn.addEventListener('click', accion);
    return btn;
  }

  function mostrarGraficaGeneral() {
    const ctx = document.getElementById('graficaGeneral').getContext('2d');

    const grados = ['Primero', 'Segundo', 'Tercero', 'Cuarto'];
    const presentes = [80, 65, 90, 75];  // Simulados
    const ausentes = [10, 20, 5, 15];
    const tardes = [5, 10, 3, 8];

    if (chartGeneral) chartGeneral.destroy();

    chartGeneral = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: grados,
        datasets: [
          { label: 'Presentes', data: presentes, backgroundColor: 'rgba(40, 167, 69, 0.7)' },
          { label: 'Ausentes', data: ausentes, backgroundColor: 'rgba(220, 53, 69, 0.7)' },
          { label: 'Tardes', data: tardes, backgroundColor: 'rgba(255, 193, 7, 0.7)' },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Asistencia general por grado'
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  function mostrarGraficaAlumno(nombre) {
    const ctx = document.getElementById('graficaAlumno').getContext('2d');

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
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  function enviarReporteGeneral() {
    alert('Simulación: Enviando reporte por correo a todos los alumnos del grado seleccionado.');
  }

  function borrarGraficas() {
    if(chartGeneral) {
      chartGeneral.destroy();
      chartGeneral = null;
    }
    if(chartIndividual) {
      chartIndividual.destroy();
      chartIndividual = null;
    }
  }

  return container;
}