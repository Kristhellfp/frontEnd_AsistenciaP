import { crearDashboardProfesor } from '../dashboardProfesor/dashboardProfesor.js';

export function crearGrados(navegarA) {
  const div = document.createElement('div');
  div.classList.add('grados-container');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Lista de Grados';
  div.appendChild(titulo);

  const gradosSimulados = [
    { id: 1, nombre: 'Primer Grado' },
    { id: 2, nombre: 'Segundo Grado' },
    { id: 3, nombre: 'Tercer Grado' },
  ];

  const lista = document.createElement('ul');
  lista.classList.add('lista-grados');

  gradosSimulados.forEach(grado => {
    const li = document.createElement('li');
    li.textContent = grado.nombre;
    li.classList.add('grado-item');
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      alert(`Aquí podrías navegar a los alumnos del grado: ${grado.nombre} (id: ${grado.id})`);
    });
    lista.appendChild(li);
  });

  div.appendChild(lista);

  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Volver al Dashboard';
  btnVolver.classList.add('boton-volver');
  btnVolver.addEventListener('click', () => {
    navegarA(crearDashboardProfesor(navegarA));
  });

  div.appendChild(btnVolver);

  return div;
}
