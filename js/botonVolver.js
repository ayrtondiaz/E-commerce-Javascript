//--CAROUSEL--
"use strict"

//--FUNCIONES--------------------------------------
function imprimirBoton(){
let btnvolver = document.getElementById("btn-volver");
      btnvolver.innerHTML=`
      <button class="btn-volver" id="btn-volver">Volver al Inicio</button>      `      
      btnvolver.onclick=()=>{ window.location.href="../index.html";}
}
function eliminarBoton(){
    let btnvolver = document.getElementById("btn-volver");
      btnvolver.innerHTML=``
}