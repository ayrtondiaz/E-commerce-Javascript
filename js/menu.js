//--MENU DE NAVBAR--
"use strict"

//--FUNCIONES--------------------------------------

const crearBotonMenuNavBar = (elementoMenu, productos, carrito) => {
  const button = ($('<button>')
    .text(elementoMenu.texto)
    .attr('class', 'dropdown-item nav-button')
    .click(() => { imprimirTarjetasFiltradas(productos, elementoMenu.tipo, carrito) }));
  return button;
}

const crearMenuNavBar = (arregloMenu, productos, carrito) => {
  $('#btnInicio').click(() => { imprimirTarjetasFiltradas(productos, 'INICIO', carrito) });
  $('#btnProductos').click(() => { imprimirTarjetasFiltradas(productos, 'PRODUCTOS', carrito) });
  $('#btnCarrito').click(() => { imprimirTarjetasFiltradas(productos, 'CARRITO', carrito) });  
  arregloMenu.forEach(elementoMenu => {
    const button = crearBotonMenuNavBar(elementoMenu, productos, carrito);
    const divCategorias = $('<div>').append(button);
    $('#categorias').append(divCategorias);
  });

  $("#formBusqueda").submit((event) => {
    event.preventDefault();
    imprimirTarjetasFiltradas(productos, "BUSQUEDA", carrito, $('#textoBusqueda').val());
    $('#textoBusqueda').val('');
    $('.navbar-collapse').collapse('hide');
  })
}

$('.nav-item').on('click', function () {
  $('.navbar-collapse').collapse('hide');
});

// Boton en logo lleva a inicio
$("#botonLogo").click(() => {
  imprimirTarjetasFiltradas(productosStorageConvertidos, "INICIO", listaDeCarrito)
});
