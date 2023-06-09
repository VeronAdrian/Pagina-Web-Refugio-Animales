
$(document).ready(function () {
    var organizaciones = JSON.parse(window.localStorage.getItem("organizaciones"));
    let botonVeterinaria = document.getElementById("filtro1");
    let botonForrajeria = document.getElementById("filtro2");
    let botonSacarFiltro = document.getElementById("sinFiltro");
    var contenedor = document.getElementById("cajadeOrgas");
    var map = L.map('map').setView([-34.522151, -58.700609], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    limpiarContenedor();
    armarContendor(contenedor, map, organizaciones);
    
    botonVeterinaria.addEventListener("click", function () {
        limpiarContenedor();
        armarContendor(contenedor,map,busquedaporfiltro("veterinaria",organizaciones));
       
    })

    botonForrajeria.addEventListener("click",function(){
        limpiarContenedor();
        armarContendor(contenedor,map,busquedaporfiltro("Forrajeria",organizaciones));
    })
    botonSacarFiltro.addEventListener("click",function(){
        limpiarContenedor();
        armarContendor(contenedor, map, organizaciones);
    });
});


function armarContendor(contenedor, map, organizaciones) {

    for (let i = 0; i < organizaciones.length; i++) {
        let segmentoOrga = document.createElement("article");
        let liNombre = document.createElement("li");
        let liNrotel = document.createElement("li");
        let liDescripcion = document.createElement("li");
        liNombre.textContent = organizaciones[i].nombre;
        segmentoOrga.append(liNombre);
        liNrotel.textContent = organizaciones[i].telefono;
        segmentoOrga.append(liNrotel);
        liDescripcion.textContent = organizaciones[i].descripcion;
        segmentoOrga.append(liDescripcion)
        contenedor.append(segmentoOrga);
        segmentoOrga.addEventListener("click", function () {
            let divMapa = document.getElementById("map");
            divMapa.style.display="block";
            map.invalidateSize();
            map.setView([organizaciones[i].x, organizaciones[i].y], 15);
            L.marker([organizaciones[i].x, organizaciones[i].y]).addTo(map);
        }, false);
        

    }
}


function limpiarContenedor() {
    let contenedorOrgas = document.getElementById("cajadeOrgas");
    while (contenedorOrgas.firstChild) {
        contenedorOrgas.removeChild(contenedorOrgas.firstChild);
    }
}

function busquedaporfiltro(filtro,organizaciones) {
    
     let actividadOrganizacion = [];
    for (let i = 0; i < organizaciones.length; i++) {
      
       if (organizaciones[i].actividad == filtro) {
            console.log();
            actividadOrganizacion.push(organizaciones[i]);
        }
    }
    
    return actividadOrganizacion;
}

