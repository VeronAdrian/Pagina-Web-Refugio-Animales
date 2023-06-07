var organizaciones = JSON.parse(window.localStorage.getItem("organizaciones"));
$(document).ready(function () {
    var contenedor = document.getElementById("cajadeOrgas");
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    armarContendor(contenedor, map);
    let botonFiltro= document.getElementById("filtro1");
    botonFiltro.addEventListener("click",function(){
        limpiarContenedor();
    })
});





function armarContendor(contenedor, map) {
    for (let i = 0; i < organizaciones.length; i++) {
        let segmentoOrga = document.createElement("article");
        let liNombre = document.createElement("li");
        let liNrotel = document.createElement("li");
        liNombre.textContent = organizaciones[i].nombre;
        segmentoOrga.append(liNombre);
        liNrotel.textContent = organizaciones[i].telefono;
        segmentoOrga.append(liNrotel);
        contenedor.append(segmentoOrga);
        segmentoOrga.addEventListener("click", function () {
           
            map.setView([organizaciones[i].x, organizaciones[i].y], 8);
            L.marker([organizaciones[i].x, organizaciones[i].y]).addTo(map);
        }, false);
        

    }
}


function limpiarContenedor(){
    let contenedorOrgas = document.getElementById("cajadeOrgas");
    while(contenedorOrgas.firstChild){
        contenedorOrgas.removeChild(contenedorOrgas.firstChild);
        console.log(2);
    }
}


