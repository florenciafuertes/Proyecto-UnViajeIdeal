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
function mostrarDestinos(array){
    productos.innerHTML = '';

    //recorrer los destinos  e indicar que cada objeto sea un producto
    for(const destinos of array){
        let contenedor = document.createElement('div');
        contenedor.className = 'destino'; //classname para ese contenedor
        //abajo hago uno para cada destino
        contenedor.innerHTML = `
        <div class="contenedorViajes">
            <h5>${destinos.nombre}</h5>
            <img src="${destinos.img}" alt="">
            <div>
            <p>Cantidad de días:${destinos.dias}</p>
            <p>${destinos.cantidad}</p>
            <p>${destinos.descripcion}</p>
            </div>
            <p class="precio">Precio $${destinos.precio}</p>
        </div>
        <button id="botonElegir${destinos.id}">Agregar</button>  
        <br>     
        `
        // cada objeto será un elemnto HTML hijo
        productos.appendChild(contenedor)

        //boton
        let botonElegir = document.getElementById(`botonElegir${destinos.id}`);
        botonElegir.addEventListener('click', () => {
        console.log(`Elegido ${destinos.nombre}`);
        });
        // agrego los destinos al carrito
        agregarDestinos(destinos.id)
    }
}

//agregar destinos
function  agregarDestinos(id){

    let add = miViaje.find(item => item.id == id);

    //condiciones
    if(add){
        add.cantidad = add.cantidad+1;
        console.log(add.cantidad);
        console.log(document.getElementById(`cantidad${add.id}`));
        document.getElementById(`cantidad${add.id}`).innerHTML = `<p id="cantidad${add.id}"> Cantidad: ${add.cantidad}</p>`;
    
        actualizarCarrito()
    }else{
        let sumarDestino = destinos.find(elemento => elemento.id == id)
    
        //agregar y mostrar
        miViaje.push(sumarDestino);

        actualizarCarrito()

        //el div en donde se va a mostrar
        let div = document.createElement('div')
        div.className = 'compra'

        div.innerHTML= `
        <div class="contenedorViajes">
            <h5>${sumarDestino.nombre}</h5>
            <img src="${sumarDestino.img}" alt="">
            <p class="precio">precio por unidad: ${sumarDestino.precio}</p>
            <button id="eliminar${sumarDestino.id}" class="btn-eliminar">eliminar</button>
        </div>
        `
        destinosElegidos.appendChild(div)

        //eliminar
        let trash = document.getElementById(`eliminar${sumarDestino.id}`)

        trash.addEventListener('click',() =>{
            console.log(sumarDestino.nombre + ' ELIMINADO');

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
    destinosElegidos.innerHTML = miViaje.reduce((acc, el) => acc + el.cantidad, 0);
    precioFinal.innerText = miViaje.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
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

guardar();  // Llamada a la función guardar

