export function crearGraficas(navegarA) {
  const container = document.createElement('div');
  container.classList.add('graficas-container');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Proyecciones de Asistencia';
  container.appendChild(titulo);

  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Volver al Dashboard';
  btnVolver.addEventListener('click', () => {
    navegarA(window.crearDashboardProfesor(navegarA));
  });
  container.appendChild(btnVolver);

  const grafGeneralCanvas = document.createElement('canvas');
  grafGeneralCanvas.id = 'graficoGeneral';
  container.appendChild(grafGeneralCanvas);

  const grafIndividualCanvas = document.createElement('canvas');
  grafIndividualCanvas.id = 'graficoIndividual';
  container.appendChild(grafIndividualCanvas);

  const datosGrados = {
    labels: ['1°', '2°', '3°', '4°', '5°', '6°'],
    datasets: [{
      label: 'Asistencia promedio (%)',
      data: [95, 88, 90, 85, 92, 87],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
    }]
  };

  const datosAlumno = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    datasets: [{
      label: 'Estado asistencia',
      data: [1, 0, 1, 2, 1], // 1=presente, 0=ausente, 2=tarde
      backgroundColor: ['green', 'red', 'green', 'orange', 'green'],
      borderColor: 'black',
      borderWidth: 1,
      type: 'bar'
    }]
  };

  const opcionesGeneral = {
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  const opcionesIndividual = {
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            switch(value) {
              case 0: return 'Ausente';
              case 1: return 'Presente';
              case 2: return 'Tarde';
              default: return '';
            }
          },
          stepSize: 1,
          min: 0,
          max: 2,
        }
      }
    }
  };

  // Crear gráficos con Chart.js
  const ctxGeneral = grafGeneralCanvas.getContext('2d');
  const graficoGeneral = new Chart(ctxGeneral, {
    type: 'bar',
    data: datosGrados,
    options: opcionesGeneral
  });

  const ctxIndividual = grafIndividualCanvas.getContext('2d');
  const graficoIndividual = new Chart(ctxIndividual, {
    type: 'bar',
    data: datosAlumno,
    options: opcionesIndividual
  });

  return container;
}
