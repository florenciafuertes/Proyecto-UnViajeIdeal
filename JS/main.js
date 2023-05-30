//array vacío para que se guarden los productos(destinos)
let miViaje = [];

//espacio para mostrar los objetos(productos)
const productos = document.getElementById('productos');

//precio final de la compra
const precioFinal = document.getElementById('precioFinal');

// espacio donde para mi carrito
const destinosElegidos = document.getElementById('miViaje');

//func para mostrar los productos con array para parámetros
mostrarDestinos(destinos);

//func para mostrarlos
function mostrarDestinos(array) {
  productos.innerHTML = '';

  //recorrer los destinos e indicar que cada objeto sea un producto
  for (const destino of array) {
    let contenedor = document.createElement('div');
    contenedor.className = 'destino'; //classname para ese contenedor
    //abajo hago uno para cada destino
    contenedor.innerHTML = `
        <div class="contenedorViajes">
            <h5>${destino.nombre}</h5>
            <img src="${destino.img}" alt="">
            <div>
            <p>Cantidad de días: ${destino.dias}</p>
            <p>${destino.cantidad}</p>
            <p>${destino.descripcion}</p>
            </div>
            <p class="precio">Precio $${destino.precio}</p>
        </div>
        <button id="botonElegir${destino.id}">Agregar</button>  
        <br>     
        `;
    // cada objeto será un elemnto HTML hijo
    productos.appendChild(contenedor);

    //boton
    let botonElegir = document.getElementById(`botonElegir${destino.id}`);
    botonElegir.addEventListener('click', () => {
      console.log(`Elegido ${destino.nombre}`);
      agregarDestinos(destino.id);
    });
  }
}

//agregar destinos al carrito
function agregarDestinos(id) {
  let add = miViaje.find(item => item.id === id);

  //condiciones
  if (add) {
    add.cantidad = add.cantidad + 1;
    let cantidadElement = document.getElementById(`cantidad${add.id}`);
    cantidadElement.innerHTML = `Cantidad: ${add.cantidad}`;
    actualizarCarrito();
  } else {
    let sumarDestino = destinos.find(elemento => elemento.id == id);

    //agregar y mostrar
    miViaje.push(sumarDestino);
    actualizarCarrito();

    //el div en donde se va a mostrar
    let div = document.createElement('div');
    div.className = 'compra';
    div.innerHTML = `
        <div class="contenedorViajes">
            <h5>${sumarDestino.nombre}</h5>
            <img src="${sumarDestino.img}" alt="">
            <p class="precio">Precio por unidad: ${sumarDestino.precio}</p>
            <button id="eliminar${sumarDestino.id}" class="btn-eliminar">Eliminar</button>
        </div>
        `;
    destinosElegidos.appendChild(div);

    //eliminar
    let trash = document.getElementById(`eliminar${sumarDestino.id}`);
    trash.addEventListener('click', () => {
      console.log(`${sumarDestino.nombre} ELIMINADO`);

      actualizarCarrito();

      // Eliminar el producto del array
      miViaje = miViaje.filter(item => item.id !== sumarDestino.id);

      // Actualizar el contenido del carrito en el DOM
      destinosElegidos.removeChild(div);

      // que el cambio se almacene en mi storage si elimino un producto
      localStorage.setItem('compraViaje', JSON.stringify(miViaje));
    });

    // Que lo agregado se almacene
    localStorage.setItem('compraViaje', JSON.stringify(miViaje));
  }
}

// Función actualizar carrito
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
            <p class="precio">Precio por unidad: ${destino.precio}</p>
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

      // que el cambio se almacene en mi storage si elimino un producto
      localStorage.setItem('compraViaje', JSON.stringify(miViaje));
    });
  });

  precioFinal.innerText = total.toFixed(2);
}

// Función guardar
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
