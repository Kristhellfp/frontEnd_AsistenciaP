
import { crearVistaAsistencia } from "../asistencia/asistencia.js";
import { crearVistaUniforme } from "../uniforme/uniforme.js";
import { crearVistaReporte } from "../reporte/reporte.js";
import { crearVistaGraficas } from "../graficas/graficas.js";

export function crearDashboardProfesor(navegarA) {
  const contenedor = document.createElement("div");
  contenedor.className = "dashboard-profesor";
  contenedor.innerHTML = `
    <h2>Panel del Profesor</h2>
    <div class="botones-profesor">
      <button class="btn" id="btn-asistencia">Tomar Asistencia</button>
      <button class="btn" id="btn-uniforme">Uniforme</button>
      <button class="btn" id="btn-reporte">Enviar Reporte</button>
      <button class="btn" id="btn-graficas">Proyecciones</button>
      <button class="btn" id="btn-cerrar">Cerrar Sesión</button>
    </div>
  `;

  contenedor.querySelector("#btn-asistencia").addEventListener("click", () => {
    navegarA(crearVistaAsistencia(navegarA));
  });

  contenedor.querySelector("#btn-uniforme").addEventListener("click", () => {
    navegarA(crearVistaUniforme(navegarA));
  });

  contenedor.querySelector("#btn-reporte").addEventListener("click", () => {
    navegarA(crearVistaReporte(navegarA));
  });

  contenedor.querySelector("#btn-graficas").addEventListener("click", () => {
    navegarA(crearVistaGraficas(navegarA));
  });

  contenedor.querySelector("#btn-cerrar").addEventListener("click", () => {
    location.reload(); 
  });

  return contenedor;
}
