//--SECCION--
'use strict'
//--FUNCIONES--------------------------------------

function crearSeccion(){    
    const seccion = document.getElementById('seccion');
    seccion.innerHTML=`
    <div id="seccion">
    <div class="row seccion-banner" data-aos="fade-left" data-aos-duration="1500">
    <div class= "col-lg-12">
    <div class=" text-center">
    <h2>TODO LO QUE VOS QUIERAS EN UN SOLO LUGAR</h2>
    </div>
    </div>
    </div>
    <div class="row card-cat" data-aos="fade-left" data-aos-duration="1500">
    <div class= "col-lg-12">
    <div class= "cards">
    <div class="card-deck">
  <button class="card card-seccion nav-button" id="btnPeluqueria">
    <img src="../assets/img/seccion/peluqueria.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">PELUQUERIA</h5>
      <p class="card-text">Encontrá desde tinturas a alisados de todo tipo y marca en nuestro catalogo!</p>
    </div>
  </button>
  <button class="card card-seccion nav-button" id="btnEstetica">
    <img src="../assets/img/seccion/estetica.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">ESTÉTICA</h5>
      <p class="card-text">En nuestra seccion Estética contamos con todo tipo de insumos para lashistas, manicuristas y más!</p>
    </div>
  </button>
  <button class="card card-seccion nav-button" id="btnMaquillaje">
    <img src="../assets/img/seccion/maquillaje.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">MAQUILLAJE</h5>
      <p class="card-text">Tenemos todo tipo de tonos, paletas y pinceles para que resaltes lo mejor de lo de mejor!</p>
    </div>
  </button>
</div>
    </div>
    </div>
    </div>
    <div class="row" data-aos="fade-right" data-aos-duration="1500">
    <div class= "col-lg-12">
    <div class="seccion-banner2 text-center">
    <h2>NUESTROS PRODUCTOS MAS SOLICITADOS</h2>
    <i class="fa-regular fa-star"></i>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="row" data-aos="fade-right" data-aos-duration="1500">
    <div class= "col-lg-12">
    <div class="seccion-banner2 text-center">
    <div class="row row-cols-1 row-cols-md-3">
  <div class="col mb-4">
    <div class="card h-100">
      <img src="../assets/img/peluqueria/alisado.jpeg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Alisado</h5>
      </div>
    </div>
  </div>
  <div class="col mb-4">
    <div class="card h-100">
      <img src="../assets/img/estetica/esmalte.jpeg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Esmalte</h5>
      </div>
    </div>
  </div>
  <div class="col mb-4">
    <div class="card h-100">
      <img src="../assets/img/maquillaje/crema1.jpeg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Crema Facial</h5>
      </div>
    </div>
  </div>
  </div>
    </div>
    </div>
    </div>
    </div>
    <div class="row" data-aos="fade-left" data-aos-duration="1500">
    <div class= "col-lg-12">
    <div class="seccion-banner text-center">
    <h2>¿QUIENES SOMOS?</h2>
    <i class="fa-solid fa-people-group"></i>
    <p class="seccion-txt">Somos un conjunto de emprendedores especializados en rubros de peluqueria, estetica, maquillaje, belleza que buscan contantemente ofertas en el mercado para poder traer todo insumo necesario en un solo lugar para tu comodidad.</p>
    </div>
    </div>
    </div>   
    <div class="row" data-aos="fade-right" data-aos-duration="1500">
    <div class= "col-lg-12">
    <div class="seccion-banner2 text-center">
    <h2>ENVIOS A TODO EL PAIS</h2>
    <i class="fa-solid fa-truck"></i>
    <p class="seccion-txt">Somos un conjunto de emprendedores especializados en rubros de peluqueria, estetica, maquillaje, belleza que buscan contantemente ofertas en el mercado para poder traer todo insumo necesario en un solo lugar para tu comodidad.</p>
    </div>
    </div>
    </div>  
    `
    $("#btnPeluqueria").click(() => { imprimirTarjetasFiltradas(espectaculosStorageConvertidos, 'Peluqueria', listaDeCarrito) });
  $("#btnMaquillaje").click(() => { imprimirTarjetasFiltradas(espectaculosStorageConvertidos, 'Maquillaje', listaDeCarrito) });
  $("#btnEstetica").click(() => { imprimirTarjetasFiltradas(espectaculosStorageConvertidos, 'Estetica', listaDeCarrito) });
}

const imprimirSeccion = () => {
    crearSeccion();
  $("#seccion")
    .fadeIn(300);
}

const eliminarSeccion = () => {
  $("#seccion")
    .hide();
}