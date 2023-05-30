// Array vacío para guardar los productos (destinos)
let miViaje = [];

// Espacio para mostrar los objetos (productos)
const productos = document.getElementById('productos');

// Precio final de la compra
const precioFinal = document.getElementById('precioFinal');

// Espacio para mi carrito
const destinosElegidos = document.getElementById('miViaje');

// Función para mostrar los productos con array como parámetro
mostrarDestinos(destinos);

// Función para mostrar los destinos
function mostrarDestinos(array) {
  productos.innerHTML = '';

  // Recorrer los destinos e indicar que cada objeto sea un producto
  for (const destino of array) {
    let contenedor = document.createElement('div');
    contenedor.className = 'destino'; // Clase para ese contenedor

    // Contenido HTML para cada destino
    contenedor.innerHTML = `
        <div class="contenedorViajes">
            <h4>${destino.nombre}</h4>
            <img src="${destino.img}" alt="">
            <div>
            <p>Cantidad de días: ${destino.dias}</p>
            <p>${destino.cantidad}</p>
            <p>${destino.descripcion}</p>
            </div>
            <strong><p class="precio">Precio $${destino.precio}</p></strong>
        </div>
        <button id="botonElegir${destino.id}">Agregar</button>  
        <br>     
        `;

    // Cada objeto será un elemento HTML hijo
    productos.appendChild(contenedor);

    // Botón para agregar
    let botonElegir = document.getElementById(`botonElegir${destino.id}`);
    botonElegir.addEventListener('click', agregarDestinos.bind(null, destino.id));
  }
}

// Función para agregar destinos al carrito
function agregarDestinos(id) {
  let add = miViaje.find(item => item.id === id);

  // Condiciones
  if (add) {
    add.cantidad = add.cantidad + 1;
    let cantidadElement = document.getElementById(`cantidad${add.id}`);
    cantidadElement.innerHTML = `Cantidad: ${add.cantidad}`;
    actualizarCarrito();
  } else {
    let sumarDestino = destinos.find(elemento => elemento.id === id);

    // Agregar y mostrar
    miViaje.push(sumarDestino);
    actualizarCarrito();

    // Eliminar
    let trash = document.getElementById(`eliminar${sumarDestino.id}`);
    trash.addEventListener('click', () => {
      console.log(`${sumarDestino.nombre} ELIMINADO`);

      actualizarCarrito();

      // Eliminar el producto del array
      miViaje = miViaje.filter(item => item.id !== sumarDestino.id);

      // Actualizar el contenido del carrito en el DOM
      destinosElegidos.removeChild(div);

      // Almacenar el cambio en el localStorage si se elimina un producto
      localStorage.setItem('compraViaje', JSON.stringify(miViaje));
    });

    // Almacenar lo agregado
    localStorage.setItem('compraViaje', JSON.stringify(miViaje));
  }
}

// Función para actualizar el carrito
function actualizarCarrito() {
  destinosElegidos.innerHTML = '';
  let total = 0;
  miViaje.forEach(destino => {
    let div = document.createElement('div');
    div.className = 'compra';
    div.innerHTML = `
        <div class="contenedorViajes">
            <h5>${destino.nombre}</h5>
            <img src="${destino.img}" alt="">
            <strong><p class="precio">Precio por unidad: ${destino.precio}</p></strong>
            <button id="eliminar${destino.id}" class="btn-eliminar">Eliminar</button>
        </div>
        `;
    destinosElegidos.appendChild(div);
    total += destino.precio * destino.cantidad;

    let trash = document.getElementById(`eliminar${destino.id}`);
    trash.addEventListener('click', () => {
      console.log(`${destino.nombre} ELIMINADO`);

      actualizarCarrito();

      // Eliminar el producto del array
      miViaje = miViaje.filter(item => item.id !== destino.id);

      // Actualizar el contenido del carrito en el DOM
      destinosElegidos.removeChild(div);

      // Almacenar el cambio en el localStorage si se elimina un producto
      localStorage.setItem('compraViaje', JSON.stringify(miViaje));
    });
  });

  precioFinal.innerText = total.toFixed(2);
}

// Función para guardar
function guardar() {
  let guardarStorage = JSON.parse(localStorage.getItem('compraViaje'));

  if (guardarStorage) {
    guardarStorage.forEach(element => {
      agregarDestinos(element.id);
    });
  }
}

guardar(); // Llamada a la función guardar

let resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
  // Vaciar el arreglo miViaje
  miViaje = [];

  // Limpiar el contenido
  destinosElegidos.innerHTML = '';

  // Actualizar el carrito en el localStorage
  localStorage.setItem('compraViaje', JSON.stringify(miViaje));

  // Actualizar el carrito en la interfaz
  actualizarCarrito();

  // Volver a mostrar los destinos en la interfaz
  mostrarDestinos(destinos);
});
