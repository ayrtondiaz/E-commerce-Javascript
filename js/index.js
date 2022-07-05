// Proyecto final - Diaz Ayrton

//-- CONSTANTES ----------------------------------------------------------

const KEY_PRODUCTOS = "productos";
const ARREGLO_MENU = [
  { tipo: "Peluqueria", texto: "Peluqueria" },
  { tipo: "Maquillaje", texto: "Maquillaje" },
  { tipo: "Estetica", texto: "Estetica" },
];


//-- CLASE Producto -------------------------------------------------

class Producto {
  constructor(datosProducto) {
    this.id = parseInt(datosProducto.id);
    this.tipo = datosProducto.tipo; // Peluqueria, Estetica, Maquillaje
    this.nombre = datosProducto.nombre;
    this.lugar = datosProducto.lugar;
    this.precio = parseFloat(datosProducto.precio);
    this.stockProductos = parseInt(datosProducto.stockProductos);
    this.imagen = datosProducto.imagen;
    this.productosVendidos = (datosProducto.productosVendidos || 0);
  }

  set actualizarStock(cantidad) {
    this.stockProductos -= cantidad;
    this.productosVendidos += cantidad;
    return true;
  }

  get obtenerStock() {
    return this.stockProductos;
  }

  comprarProducto(cantidad) {
    this.actualizarStock = cantidad;
  }

  devolverProducto(cantidad) {
    this.actualizarStock = -cantidad;
  }
}

//-- CLASE Elementos de carrito --------------------------

class ItemCarrito {
  constructor(nuevoItem) {
    this.id = nuevoItem.id;
    this.tipo = nuevoItem.tipo;
    this.nombre = nuevoItem.nombre;
    this.precio = nuevoItem.precio;
    this.lugar = nuevoItem.lugar;
    this.cantidad = nuevoItem.cantidad;
    this.imagen = nuevoItem.imagen;
  }
}

//-- FUNCIONES --------------------------------------------------------


const imprimirBotonesPagoCarrito = (productos, carrito) => {
  const total = calcularTotalAPagar(carrito);
  $('#boton-pago').hide()
    .append(`<div class="container pagos-container">
                <h5 class="carrito-total text-center">El total a pagar es de: $${total}.</h5>
              <div>
              <button id="idButtonPagoCarrito" class="btn btn-success">Finalizar Compra</button>
              <button id="idButtonVaciarCarrito" class="btn btn-danger">Vaciar Carrito</button><div><div>`
    )
    .fadeIn(500);
  $("#idButtonPagoCarrito").click(() => { finalizarCompra(productos, carrito) });
  $("#idButtonVaciarCarrito").click(() => { vaciarCarrito(productos, carrito) });
}


const eliminarBotonesPagoCarrito = () => {
  $('#boton-pago').empty();
}


const actualizarCantidadDisponibleEnTarjeta = (productos) => {
  // Busca el input de cantidad y lo asigna al maximo posible a comprar
  const idTarjetaProducto = `${productos.id}_cantidad`;
  // Se actualiza el maximo, y se reinicia el number box a 0
  $(`#${idTarjetaProducto}`)
    .attr({ 'max': productos.obtenerStock })
    .val('0');

  if (productos.obtenerStock === 0) {
    // Si seleccionó todo el stock disponible y lo guardó en el carrito, se deshabilita el number box, y se deshabilita y cambia a color rojo el boton para agregar a carrito
    const idTarjetaProducto = `producto_${productos.id}`;
    const idButtonTarjetaProducto = `button_${idTarjetaProducto}`;
    const idCantidadTarjetaProducto = `${idTarjetaProducto}_cantidad`;
    const idDivButtonTarjetaProducto = `div_button_${idTarjetaProducto}`;
    $(`#${idDivButtonTarjetaProducto}`).attr('class', 'disabled');     // Se deshabilita el boton de agregar al carrito
    $(`#${idButtonTarjetaProducto}`).attr('class', 'btn btn-danger');  // Se cambia el boon de carrito por uno rojo
    $(`#${idCantidadTarjetaProducto} input`).addClass('disabled').prop('disabled', true); // Deshabilita number box
  }
}

const agregarAlCarrito = (productos, carrito) => {
  const idTarjetaProducto = `${productos.id}_cantidad`;  // Con los datos de mi producto, creo el nombre del id a buscar.
  const contador = document.getElementById('contadorCarrito'); //contador del carrito en 0 
  if ($(`#${idTarjetaProducto}`)) {        // Si esta en el HTML
    const cantProductos = parseInt($(`#${idTarjetaProducto}`).val()); // Obtiene la cantidad ingresada en el input del number box
    if (cantProductos && cantProductos > 0 && cantProductos <= productos.obtenerStock) {   // Validar que la cantidad sea menor al stock de productos disponible
      let pos = carrito.findIndex(elemento => elemento.id === productos.id);   // Busco posicion del elemento en "carrito" (si no existe devuelve -1)
      if (pos >= 0) {             // Si existe le sumo la cantidad, sino lo creo y agrego al carrito
        carrito[pos].cantidad = carrito[pos].cantidad + cantProductos;
      } else {
        const item = new ItemCarrito({
          id: productos.id,
          tipo: productos.tipo,
          nombre: productos.nombre,
          precio: productos.precio,
          lugar: productos.lugar,
          imagen: productos.imagen,
          cantidad: cantProductos,
        });
        carrito.push(item);
      }
      productos.comprarProducto(cantProductos);  // Descuento los productos disponibles en listaDeProductos
      actualizarCantidadDisponibleEnTarjeta(productos);  // actualiza la UI
      Swal.fire({                                          //Muestro un mensaje de confirmación al agregar
        icon: 'success',
        title: 'Se agregaron '+cantProductos+' '+productos.nombre+' al carrito',        
      })
      contador.innerText = carrito.length
    } else if (cantProductos === 0) {
      Swal.fire({                                          //Muestro un mensaje de confirmación al agregar
        icon: 'warning',
        title: 'Por favor seleccione la cantidad de productos',        
      })
    } else if (cantProductos > productos.obtenerStock) {
      Swal.fire({                                          //Muestro un mensaje de confirmación al agregar
        icon: 'warning',
        title: 'Superó el número de productos disponibles para '+productos.nombre+' quedan '+productos.obtenerStock+' productos.',        
      })
    }
  }
}

const calcularTotalAPagar = (carrito) => {
  let total = 0;
  carrito.forEach(item => { total += (item.cantidad * item.precio) });
  return total;
}

const eliminarItemsCarrito = (carrito) => {
  while (carrito.length > 0) { carrito.pop() };
}

const vaciarCarrito = (productos, carrito) => {
  // Devuelvo el stock de productos del carrito a la lista de productos
  carrito.forEach((item, i) => {
    let pos = productos.findIndex(elemento => elemento.id === item.id); // Busco posicion del elemento en "productos"
    productos[pos].devolverProducto(item.cantidad);                    // Se actualiza el stock producto correspondiente
  });
  Swal.fire({                                        //Muestro un mensaje de confirmación al vaciar carrito
    icon: 'error',
    title: 'Su Carrito se Vació',
    text: 'esperamos poder ayudarte nuevamente'

  })
  eliminarItemsCarrito(carrito);                                // Saco el item del carrito
  imprimirTarjetasFiltradas(productos, "CARRITO", carrito);  // Llama de nuevo a imprimir pantalla carrito
  const contador = document.getElementById('contadorCarrito');
  contador.innerText = carrito.length; 
}

const actualizarTotalPago = (productos, carrito) => {
  eliminarBotonesPagoCarrito();
  imprimirBotonesPagoCarrito(productos, carrito);
}

const eliminarDelCarrito = (productos, carrito, itemCarrito) => {
  const pos = carrito.findIndex(elemento => elemento.id === itemCarrito.id);  // Busco posición del elemento en el carrito
  const posProducto = productos.findIndex(elemento => elemento.id === itemCarrito.id);  // Busco posición del elemento en la lista de productos
  productos[posProducto].devolverProducto(carrito[pos].cantidad); // Actualizar cantidad de productos
  carrito.splice(pos, 1);   // Elimina el elemento del carrito
  eliminarLaTarjeta(itemCarrito);
  Swal.fire({                                        //Muestro un mensaje de confirmación al eliminar un producto
    icon: 'error',
    title: itemCarrito.nombre+' se elimino del carrito',        
  })
  const contador = document.getElementById('contadorCarrito');
  contador.innerText = carrito.length;
  if (carrito.length === 0) {
    imprimirTarjetasFiltradas(productos, "CARRITO", carrito)
  } else {
    actualizarTotalPago(productos, carrito);
  };
}

const agregarCompraAStorage = (carrito) => {
  // Guardar carrito en storage como una lista de listas
  if (localStorage.getItem("compras")) {
    let comprasStorage = JSON.parse(localStorage.getItem("compras"));
    comprasStorage.push(carrito);
    localStorage.setItem("compras", JSON.stringify(comprasStorage));
  } else {
    const listaDeCompras = [carrito];
    localStorage.setItem("compras", JSON.stringify(listaDeCompras));
  }
}

const finalizarCompra = (productos, carrito) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  agregarCompraAStorage(carrito);   // Guardar compra en lista de compras en Storage
  eliminarItemsCarrito(carrito);
  eliminarTarjetas();
  eliminarBotonesPagoCarrito();
  localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productos));   // Actualizo los productos en el Storage
  imprimirTarjetasFiltradas(productos, "CARRITO", carrito);
  const contador = document.getElementById('contadorCarrito');
  contador.innerText = carrito.length;
  Swal.fire({                                        //Muestro un mensaje de confirmación de toda la compra
    icon: 'success',
    title: 'Compra confirmada',
    text: 'y se registro con Éxito el : '+hoy.toLocaleDateString()

  })
}

// Realiza la busqueda ingresa, y dependiendo el resultado imprime el mensaje correspondiente y en caso de encontrar coincidencias, las cards.
const buscador = (productos, carrito, busqueda) => {
  $('#cardsId').addClass('search');
  if (busqueda.trim() === '') {
    mostrarTitulo("Es necesario escribir una busqueda");
  } else {
    const listaResultados = productos.filter(producto => producto.nombre.toLowerCase().includes(`${busqueda.trim().toLowerCase()}`));
    if (listaResultados.length === 0) {
      mostrarTitulo("No se encontró ningún Producto que incluya "+busqueda+" en su nombre.");
    } else {
      mostrarTitulo("Resultado de la busqueda "+busqueda+":");
      listaResultados.forEach(producto => {
        imprimirTarjeta(producto, carrito);
      });
      fadeInTarjetas();
    }
  }
}

// Funcion que recibe un elemento del arreglo traído del Storage y crea una instancia de la clase Producto
const crearProducto = (element) => {
  const producto = new Producto({
    id: element.id,
    tipo: element.tipo,
    nombre: element.nombre,
    lugar: element.lugar,
    precio: element.precio,
    stockProductos: element.stockProductos,
    imagen: element.imagen,
    productosVendidos: element.productosVendidos,
  });
  return producto;
}

const iniciarPagina = (listaConvertida, carrito) => {
  //-- CREAR SECCIONES DE LA PAGINA -- 
  crearMenuNavBar(ARREGLO_MENU, listaConvertida, carrito);       // Crea el menú del NavBar de HTML
  crearCarousel();                                                                    // Crea el carousel
  imprimirTarjetasFiltradas(listaConvertida, "INICIO", carrito) // Imprimir todas las Cards utilizando productosStorageConvertidos
}

const convertirProductosStorageEIniciarPagina = (listaStorage, listaConvertida, carrito) => {
  // Se convierte productosStorage en una lista con objetos de la clase Producto (productosStorageConvertidos)
  listaStorage.forEach(element => {
    const producto = crearProducto(element);
    listaConvertida.push(producto);
  });
  iniciarPagina(listaConvertida, carrito);
}

const inicializarDatosYPagina = (productosStorageConvertidos, listaDeCarrito) => {
  // Si key "productos" existe en el localStorage, no se hace nada, sino se traen los productos del JSON y se guardan en el localStorage
  if (!localStorage.key(KEY_PRODUCTOS)) {
    // Se declara la URL del archivo JSON local
  const  URLJSON = "json/productos.json";
    // Se pide la información almacenada en el JSON
    $.getJSON(URLJSON, (listaDeProductos, estado) => {
      if (estado === "success") {
        // Se guarda en el sessionStorage (con key productos) el arreglo traido desde el archivo JSON
        localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(listaDeProductos));
        convertirProductosStorageEIniciarPagina(listaDeProductos, productosStorageConvertidos, listaDeCarrito);  // Se convierte productosStorage a un array de objetos Producto
      }
    })
  } else {
    const productosStorage = JSON.parse(localStorage.getItem(KEY_PRODUCTOS));             // Se trae la lista de productos del Storage
    convertirProductosStorageEIniciarPagina(productosStorage, productosStorageConvertidos, listaDeCarrito);  // Se convierte productosStorage a un array de objetos Producto
  }
}


//-- VARIABLES ----------------------------------------------------------

// Arreglo para carrito
let listaDeCarrito = [];

// Arreglo de productos convertidos del Storage
const productosStorageConvertidos = [];

//-- PROGRAMA PRINCIPAL ----------------------------------------------------------

//-- CARGAR DE ARCHIVO JSON, GUARDAR EN STORAGE, CARGAR DE STORAGE, CREAR NUEVO ARREGLO CON OBJETOS PRODUCTO, CREA SECCIONES DE LA PAGINA --
inicializarDatosYPagina(productosStorageConvertidos, listaDeCarrito);

window.onbeforeunload = function () {
  scrollTop();
};