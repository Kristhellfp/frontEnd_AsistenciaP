import { crearDashboardCoordinador } from '../dashboardCoordinador/dashboardCoordinador.js';

export function crearReporte(alumno = {}, gradoId = null, navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('reporte-container');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Reporte de alumno';
  contenedor.appendChild(titulo);

  const form = document.createElement('form');
  form.classList.add('form-reporte');

  const campoNombre = document.createElement('div');
  const labelNombre = document.createElement('label');
  labelNombre.textContent = 'Nombre del alumno:';
  const inputNombre = document.createElement('input');
  inputNombre.type = 'text';
  inputNombre.placeholder = 'Ej. Juan Pérez';
  inputNombre.value = alumno?.nombre || '';
  campoNombre.append(labelNombre, inputNombre);

  const campoCorreo = document.createElement('div');
  const labelCorreo = document.createElement('label');
  labelCorreo.textContent = 'Correo del representante:';
  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'ejemplo@correo.com';
  campoCorreo.append(labelCorreo, inputCorreo);

  const campoMotivos = document.createElement('div');
  const labelMotivos = document.createElement('label');
  labelMotivos.textContent = 'Motivos del reporte:';
  campoMotivos.appendChild(labelMotivos);

  const opciones = ['Llegada tarde', 'Uniforme incompleto', 'Informe de mala conducta'];
  const checks = opciones.map(opcion => {
    const div = document.createElement('div');
    div.classList.add('check-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = opcion;

    const label = document.createElement('label');
    label.textContent = opcion;

    div.append(checkbox, label);
    campoMotivos.appendChild(div);
    return checkbox;
  });

  const campoComentario = document.createElement('div');
  const labelComentario = document.createElement('label');
  labelComentario.textContent = 'Comentario adicional:';
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Escribe aquí el comentario...';
  campoComentario.append(labelComentario, textarea);

  const btnEnviar = document.createElement('button');
  btnEnviar.textContent = 'Enviar reporte';
  btnEnviar.type = 'submit';

  btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const nombreAlumno = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const motivosSeleccionados = checks.filter(chk => chk.checked).map(chk => chk.value);
    const comentario = textarea.value.trim();

    if (!nombreAlumno || !correo || motivosSeleccionados.length === 0) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    alert(`📧 Reporte enviado para ${nombreAlumno} a ${correo}.\nMotivos: ${motivosSeleccionados.join(', ')}\nComentario: ${comentario}`);
    navegarA(crearDashboardCoordinador(navegarA));  
  });

  // Botón volver
  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Volver';
  btnVolver.type = 'button';
  btnVolver.addEventListener('click', () => {
    navegarA(crearDashboardCoordinador(navegarA));  
  });

  form.append(campoNombre, campoCorreo, campoMotivos, campoComentario, btnEnviar, btnVolver);
  contenedor.appendChild(form);

  return contenedor;
}
