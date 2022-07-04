//--TITULOS DE CATEGORIAS--
"use strict"

//--FUNCIONES--------------------------------------

const mostrarTitulo = (texto) => {
  $('#titulo')
    .empty()
    .append(texto)
    .slideDown(1000);
}

const eliminarTitulo = () => {
  $('#titulo')
    .hide()
    .empty();
}
