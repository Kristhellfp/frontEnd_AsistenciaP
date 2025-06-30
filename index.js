import { crearLogin } from './componentes/login/login.js';
import { crearDashboardCoordinador } from './componentes/dashboardCoordinador/dashboardCoordinador.js'; // NUEVO

const root = document.getElementById('root');

function navegarA(vista) {
  root.innerHTML = '';
  root.appendChild(vista);
}

window.crearDashboardCoordinador = (navegarA) => crearDashboardCoordinador(navegarA);

document.addEventListener('DOMContentLoaded', () => {
  navegarA(crearLogin(navegarA));
});
