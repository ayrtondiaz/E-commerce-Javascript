//--CAROUSEL--
"use strict"

//--FUNCIONES--------------------------------------

const crearCarousel = () => {
  $("#carouselExampleCaptions")
    .hide()
    .append(`
			<ol class="carousel-indicators">
				<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
				<li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
				<li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
				<li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
			</ol>
			<div class="carousel-inner" role="listbox">
			<div class="carousel-item active">
					<a id="btnCarouselindex" role="button">
						<img src="../assets/img/1.jpg"class="d-block w-100" alt="Imagen 1">
						<div class="carousel-caption d-md-block">
							<h5>Nosotros</h5>
						<p>¡Comprá todos tus productos al mejor precio!</p>
					</div>
					</a>
				</div>
				<div class="carousel-item">
					<a id="btnCarouselPelu" role="button">
						<img src="../assets/img/2.jpg"class="d-block w-100" alt="Imagen 1">
						<div class="carousel-caption d-md-block">
							<h5>PELUQUERIA</h5>
						<p>¡Comprá todos tus productos al mejor precio!</p>
					</div>
					</a>
				</div>
				<div class="carousel-item">
					<a id="btnCarouselMaqui" role="button">
						<img src="../assets/img/4.jpg" class="d-block w-100" alt="Imagen 2">
						<div class="carousel-caption d-md-block">              
							<h5>MAQUILLAJE</h5>              
							<p>¡Comprá todos tus productos al mejor precio!</p>
						</div>
					</a>
				</div>
				<div class="carousel-item">
					<a id="btnCarouselEste" role="button">
						<img src="../assets/img/3.jpg" class="d-block w-100" alt="Imagen 3">
						<div class="carousel-caption d-md-block">         
							<h5>ESTÉTICA</h5>             
							<p>¡Comprá todos tus productos al mejor precio!</p>
						</div>
					</a>
				</div>
			</div>
			<a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Anterior</span>
			</a>
			<a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Siguiente</span>
			</a>`
    );
  $("#btnCarouselPelu").click(() => { imprimirTarjetasFiltradas(productosStorageConvertidos, 'Peluqueria', listaDeCarrito) });
  $("#btnCarouselMaqui").click(() => { imprimirTarjetasFiltradas(productosStorageConvertidos, 'Maquillaje', listaDeCarrito) });
  $("#btnCarouselEste").click(() => { imprimirTarjetasFiltradas(productosStorageConvertidos, 'Estetica', listaDeCarrito) });
}

const imprimirCarousel = () => {
  $("#carouselExampleCaptions")
    .fadeIn(300);
}

const eliminarCarousel = () => {
  $("#carouselExampleCaptions")
    .hide();
}