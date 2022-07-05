//--TARJETAS / CARDS--
"use strict"

//--FUNCIONES--------------------------------------

const crearTarjeta = (producto, idTarjetaProducto, idButtonTarjetaProducto, esCarrito = false) => {
  let productos = '<div class="agotado"><strong> Agotado </strong></div>'; // Si no es carrito, o el producto no tiene mas stock, se muestra agotado.
  let precio = esCarrito ? producto.precio * producto.cantidad : producto.precio;    // Si es tarjeta de carrito muestra el valor de la cantidad * precio
  if (esCarrito || producto.stockProductos > 0) {
    // Si es carrito, se muestra "cantidad: numero", si no es carrito se muestra "cantidad: number box"
    const cantidadProductos = esCarrito ? producto.cantidad : `<input type="number" class="input-cantidad" id="${producto.id}_cantidad" name="cantidad" min="0" max="${producto.obtenerStock}" value="${producto.cantidad || 0}">`;
    const cantidadClasses = esCarrito ? '' : ' d-flex flex-row';
    productos = `<div id="${idTarjetaProducto}_cantidad" class="cantidad ${cantidadClasses}">
                  <label for="cantidadProductos">Cantidad:</label>
                  ${cantidadProductos}
                </div>
                <div id="div_${idButtonTarjetaProducto}">
                  <button id="${idButtonTarjetaProducto}" class="btn btn-primary card-btn"></button>
                </div>`;
  }
  return `<div class="col-lg-4 d-flex justify-content-center my-5 ${esCarrito && 'carrito'}" id="${idTarjetaProducto}">
            <div class="card p-3 bg-white rounded" style="width: 100%;">
              <img src="${producto.imagen}" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title text-left">${producto.nombre}</h5>
                <div class="d-flex justify-content-between flex-row">
                  <p class="card-text text-left precio"><strong>$ ${precio}</strong></p>  
                </div>          
                <div class="d-flex justify-content-between flex-row">                
                  ${productos}
                </div>
              </div>
            </div>
          </div>`;
}

const imprimirTarjeta = (producto, carrito) => {
  // Creo Tarjeta
  const idTarjetaProducto = `producto_${producto.id}`;
  const idButtonTarjetaProducto = `button_${idTarjetaProducto}`;

  // Busco la lista, creo la tarjeta html y la incluyo en la lista
  const tarjetaProducto = crearTarjeta(producto, idTarjetaProducto, idButtonTarjetaProducto);
  $('#cardsId').append(tarjetaProducto);

  // Busca el botón, le agrega el texto y la funcionalidad para el click
  $(`#${idButtonTarjetaProducto}`)
    .append('<i class="fas fa-shopping-cart"></i>')
    .click(() => { agregarAlCarrito(producto, carrito) });
}

const imprimirTarjetaCarrito = (productos, carrito, itemCarrito) => {
  // Crea Tarjeta de carrito
  const idTarjetaProducto = `producto_${itemCarrito.id}`;
  const idButtonTarjetaProducto = `button_${idTarjetaProducto}`;

  const tarjetaProducto = crearTarjeta(itemCarrito, idTarjetaProducto, idButtonTarjetaProducto, true);
  $('#cardsId').append(tarjetaProducto);

  // Botón para eliminar producto de carrito
  $(`#${idButtonTarjetaProducto}`)
    .html('<i class="fas fa-trash"></i>')
    .attr('class', 'btn boton-carrito')
    .click(() => { eliminarDelCarrito(productos, carrito, itemCarrito) });
}

// Se vacía, se remueve la clase, y se ocultan las tarjetas
const eliminarTarjetas = () => {
  $('#cardsId')
    .empty()
    .removeClass('search_card')
    .hide();
}

const eliminarLaTarjeta = (itemCarrito) => {
  // Elimina la card del HTML
  const idTarjetaProducto = `producto_${itemCarrito.id}`;
  $(`#${idTarjetaProducto}`).remove();   // Borra el elemento seleccionado
}

const resetearVista = () => {
  scrollTop();                    // Se posiciona en la parte superior
  eliminarTarjetas();             // Se eliminan las tarjetas
  eliminarMensaje();              // Se elimina el contenido del mensaje superior
  eliminarBotonesPagoCarrito();   // Se eliminan botones del carrito
  eliminarCarousel();             // Se elimina carousel
  eliminarTitulo();               // Se elimina titulo
  eliminarSeccion();              // Se elimina Seccion
  eliminarBoton();                // Se elimina boton de volver a inicio
}

const fadeInTarjetas = () => {
  $('#cardsId').fadeIn(1000);
}

const imprimirTarjetasFiltradas = (productos, tipo, carrito, busqueda = '') => {
  resetearVista();

  if (tipo === "INICIO") {                     // Si recibe INICIO imprimo todas las tarjetas
    imprimirCarousel();   
    imprimirSeccion();    
  } else if (tipo == "PRODUCTOS")
  {    mostrarTitulo("Productos"); 
    productos.forEach(producto => {
      imprimirTarjeta(producto, carrito);
    });    
    fadeInTarjetas();
  }else if (tipo === "CARRITO") {             // Si recibo CARRITO, imprimo la lista del carrito
    // IMPRIMIR TARJETAS DE CARRITO
    if (carrito.length === 0) {
      // Mensaje de carrito vacío
      mostrarTitulo(`No posee elementos en el carrito`);
      imprimirBoton();     

    } else {                                   // Si recibo otro tipo y coincide con las tarjetas, se imprimen las tarjetas de ese tipo
      mostrarTitulo("Carrito");
      imprimirBotonesPagoCarrito(productos, carrito);  // IMPRIMIR BOTONES DE PAGO
      carrito.forEach(itemCarrito => {
        imprimirTarjetaCarrito(productos, carrito, itemCarrito);
      });
      fadeInTarjetas();
    }
  } else if (tipo === "BUSQUEDA") {
    buscador(productos, carrito, busqueda);
  } else {
    const titulo = ARREGLO_MENU.find(m => m.tipo === tipo).texto;
    mostrarTitulo(titulo);                   // Muestra el resto de tipos (Peluqueria, Estetica, Maquillaje)
    const productosFiltrados = productos.filter(producto => producto.tipo === tipo);
    productosFiltrados.forEach(producto => {
      imprimirTarjeta(producto, carrito);
    });
    fadeInTarjetas();
  }

 
}
