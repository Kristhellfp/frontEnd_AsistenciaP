import { crearLogin } from './componentes/login/login.js';
import { crearRegistro } from './componentes/registro/registro.js';
import { crearRecuperar } from './componentes/recuperar/recuperar.js';
import { crearDashboardProfesor } from './componentes/dashboardProfesor/dashboardProfesor.js';
import { crearVistaAsistencia } from './componentes/asistencia/asistencia.js';
import { crearGraficas } from './componentes/graficas/graficas.js';
import { crearDashboardCoordinador } from './componentes/dashboardCoordinador/dashboardCoordinador.js';
import { crearDashboardAdministrador } from './componentes/dashboardAdministrador/dashboardAdministrador.js';

const historial = [];

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (!root) {
    console.error("Error: No se encontró el elemento con ID 'root'. Revisa tu HTML.");
    return;
  }

  const navegarA = (vista) => {
    if (root.firstChild) {
      historial.push(root.firstChild);
    }
    root.innerHTML = "";
    root.appendChild(vista);
  };

  window.volverAAnterior = () => {
    if (historial.length > 0) {
      const anterior = historial.pop();
      root.innerHTML = "";
      root.appendChild(anterior);
    } else {
      navegarA(crearLogin(navegarA)); 
    }
  };

  window.crearLogin                 = crearLogin;
  window.crearRegistro              = crearRegistro;
  window.crearRecuperar             = crearRecuperar;
  window.crearDashboardProfesor     = (navegarA, gradoId = null) => crearDashboardProfesor(navegarA, gradoId);
  window.crearDashboardCoordinador  = (navegarA) => crearDashboardCoordinador(navegarA);
  window.crearDashboardAdministrador = (navegarA) => crearDashboardAdministrador(navegarA);
  window.crearVistaAsistencia       = crearVistaAsistencia;
  window.crearGraficas              = crearGraficas;
  window.navegarA                   = navegarA;

  navegarA(crearLogin(navegarA));
});
