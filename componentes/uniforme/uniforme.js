import { crearDashboardProfesor } from '../dashboardProfesor/dashboardProfesor.js';

export function crearUniforme(navegarA, volver) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('uniforme-container');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Revisión de Uniforme';
  contenedor.appendChild(titulo);

  const prendas = [
    {
      nombre: 'Pantalón beige',
      imagenes: ['https://media.wuerth.com/stmedia/modyf/eshop/products/std.lang.all/resolutions/normal/png-546x410px/569467303.png']
    },
    {
      nombre: 'Polo blanca o azul',
      imagenes: [
        'https://bordamax.net/cdn/shop/files/blanco_1m.png?v=1732843368&width=1946',
        'https://image.jimcdn.com/app/cms/image/transf/none/path/s51ecb0debe9f7d13/image/ic38c5d40dfa17c49/version/1466719066/image.png'
      ]
    },
    {
      nombre: 'Calcetas / Calcetines beige',
      imagenes: ['https://www.corbatasstore.es/assets/SKUImages/SK-004.png']
    },
    {
      nombre: 'Zapatos negros (niño/niña)',
      imagenes: [
        'https://www.brunorossi.cl/120093-medium_custom/zapato-casual-bruno-rossi.jpg',
        'https://anandanovia.com/cdn/shop/files/Zapato-vestir-hombre-negro-Tenerife-IslasCanarias-La-Laguna-online-2.png?v=1729275485&width=533'
      ]
    }
  ];

  prendas.forEach(prenda => {
    const fila = document.createElement('div');
    fila.classList.add('fila-prenda');
    fila.dataset.estado = '';
    fila.dataset.prenda = prenda.nombre;

    const imagenesContenedor = document.createElement('div');
    imagenesContenedor.classList.add('imagenes-prenda');

    prenda.imagenes.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = prenda.nombre;
      imagenesContenedor.appendChild(img);
    });

    const botones = document.createElement('div');
    botones.classList.add('botones-revision');

    const btnVerde = document.createElement('button');
    btnVerde.classList.add('boton-verde');
    btnVerde.textContent = '✔️';

    const btnRojo = document.createElement('button');
    btnRojo.classList.add('boton-rojo');
    btnRojo.textContent = '❌';

    btnVerde.addEventListener('click', () => {
      fila.dataset.estado = 'cumple';
      fila.classList.add('cumple');
      fila.classList.remove('no-cumple');
    });

    btnRojo.addEventListener('click', () => {
      fila.dataset.estado = 'no-cumple';
      fila.classList.add('no-cumple');
      fila.classList.remove('cumple');
    });

    botones.append(btnVerde, btnRojo);
    fila.append(imagenesContenedor, botones);
    contenedor.appendChild(fila);
  });

  const comentarios = document.createElement('textarea');
  comentarios.placeholder = "Detalles del uniforme o comentarios adicionales...";
  comentarios.classList.add('comentarios-uniforme');
  contenedor.appendChild(comentarios);

  const accionesFinales = document.createElement('div');
  accionesFinales.classList.add('botones-acciones-uniforme');

  const btnGuardar = document.createElement('button');
  btnGuardar.textContent = 'Guardar Revisión';
  btnGuardar.classList.add('boton-guardar');
  btnGuardar.addEventListener('click', () => {
    alert('✅ Revisión guardada (funcionalidad backend pendiente).');
    volver ? volver() : navegarA(crearDashboardProfesor(navegarA));
  });

  const btnVolver = document.createElement('button');
  btnVolver.textContent = '← Volver al Dashboard';
  btnVolver.classList.add('boton-volver');
  btnVolver.addEventListener('click', () => {
    volver ? volver() : navegarA(crearDashboardProfesor(navegarA));
  });

  accionesFinales.append(btnGuardar, btnVolver);
  contenedor.appendChild(accionesFinales);

  return contenedor;
}
