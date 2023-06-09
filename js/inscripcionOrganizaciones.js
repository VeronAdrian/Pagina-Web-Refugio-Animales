$(document).ready(function () {
    var normalizarURL = "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=";
    let select = document.getElementById("direcciones")
    let botonConfirmar = document.getElementById("botonConfirmar");
    let botonCancel = document.getElementById("botonCancel");
    let botonVerificar = document.getElementById("botonVerificar");
    let botonEnviar = document.getElementById("botonEnviar");
    let organizacionesLS = JSON.parse(window.localStorage.getItem("organizaciones")) || [];
    var map = L.map('map').setView([-34.522151, -58.700609], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    if (localStorage.length == 0) {
        var organizaciones = [];
        crearOrganizacion(organizaciones);
        window.localStorage.setItem("organizaciones", JSON.stringify(organizaciones));
    }
    else  {
        botonVerificar.addEventListener("click", function () {
            if (camposNoVacios()){
            let url = normalizarURL;
            limpiarSelect();
            let direccion = document.getElementById("dirOrga").value;
            let listaDirecciones = respuestaNormalizacion(url, direccion)
            if (direccionInvalida(listaDirecciones)) {
                alert("La direccion de la organizacion NO EXISTE");
            }
            else if (!direccionTieneAltura(listaDirecciones)) {
                alert("Ingrese la altura de la calle");
            }
            else if (muchosCallesEncontradas(listaDirecciones)) {
                mostrarSelect();
                llenarSelector(listaDirecciones);
            }

            else {
                mostrarMapa(map, normalizarURL);
                mostrarEnviar();
            }
        }
        else{
            alert("complete todos los campos")
        }
        });
    }
    
    botonConfirmar.addEventListener("click", function () {
        let select = document.getElementById("direcciones").value;
        let direccion = document.getElementById("dirOrga").value;
        let organizacion = JSON.parse(select);
        direccion = direccion + " , " + organizacion.cod_partido;
        organizacion = respuestaNormalizacion(normalizarURL, direccion);
        organizacionesLS.push(añadirOrganizacion(organizacion));
        window.localStorage.setItem("organizaciones", JSON.stringify(organizacionesLS));
        location.reload();
        alert("LA INSCRIPCION FUE EXITOSA");
    });

    botonCancel.addEventListener("click", function () {
        ocultarSelect();
        limpiarSelect();
    });

    select.addEventListener("change", function () {
        mostrarMapaSelect(map, normalizarURL);
    });


    botonEnviar.addEventListener("click", function () {
        let direccion = document.getElementById("dirOrga").value;
        let organizacion = respuestaNormalizacion(normalizarURL, direccion);
        console.log(organizacion);
        organizacionesLS.push(añadirOrganizacion(organizacion));
        window.localStorage.setItem("organizaciones", JSON.stringify(organizacionesLS));
        location.reload();
        alert("LA INSCRIPCION FUE EXITOSA");
    });


});

//estas organizaciones estan hardcodeadas para que aparezca algo al pricipio y no este vacio el sitio
function crearOrganizacion(organizaciones) {
    let orga1 = new Organizacion("Sinergia animal", "0237 462-3491", -34.648663494898, -58.7970394704081, "Sinergia Animal es una organización internacional de protección animal y queremos ver el fin de las peores prácticas de la ganadería industrial. Nuestro equipo tiene amplia experiencia en el área y ha conquistado grandes victorias por los animales.", "Forrajeria");
    organizaciones.push(orga1);
    let orga2 = new Organizacion("Adopta no compres", "0237 462-3491", -34.61315, -58.37723, "Somos una  es una entidad sin ánimo de lucro, comprometida con promover mediante diferentes actividades la adopción responsable, la conciencia de esterilizar y recuperar animales en condición de maltrato y abandono con el fin de enseñar, contribuir y entregar una calidad de vida a todos los perros y gatos que lo necesiten.", "veterinaria");
    organizaciones.push(orga2);

}



function direccionInvalida(direccion) {
    return direccion.direccionesNormalizadas.length == 0;

}

function llenarSelector(listaDirecciones) {
    let selector = document.getElementById("direcciones");
    listaDirecciones.direccionesNormalizadas.forEach(element => {
        var option = document.createElement("option");
        option.text = element.direccion;
        option.value = JSON.stringify(element);
        selector.add(option);
    });
}
//constructor(nombre, telefono, x, y, descripcion, actividad
function añadirOrganizacion(orga) {
    let nombre = document.getElementById("nombreOrga").value;
    let nrotel = document.getElementById("telOrganizacion").value;
    let descr = document.getElementById("descrpOrganizacion").value;
    let actividad = document.getElementById("actividades").value;
    let x = orga.direccionesNormalizadas[0].coordenadas.x;
    let y = orga.direccionesNormalizadas[0].coordenadas.y;
    let organizacion = new Organizacion(nombre, nrotel, y, x, descr, actividad);
    return organizacion;
}

function mostrarSelect() {
    let contSelect = document.getElementById("contenedorSelect");
    contSelect.style.display = "block";

}


function ocultarSelect() {
    let contSelect = document.getElementById("contenedorSelect");
    contSelect.style.display = "none";
}

function limpiarSelect() {
    let select = document.getElementById("direcciones");
    for (let i = select.length; i >= 0; i--) {
        select.remove(i);
    }
}

function direccionTieneAltura(listaDirecciones) {
    return listaDirecciones.direccionesNormalizadas[0].altura != null;
}

function muchosCallesEncontradas(listaDirecciones) {
    return listaDirecciones.direccionesNormalizadas.length > 1;
}



function mostrarMapaSelect(map, normalizarURL) {
    let direccion = document.getElementById("dirOrga").value;
    let select = document.getElementById("direcciones").value;
    let organizacion = JSON.parse(select);
    direccion = direccion + " , " + organizacion.cod_partido;
    organizacion = respuestaNormalizacion(normalizarURL, direccion);
    let divMapa = document.getElementById("map");
    divMapa.style.display = "block";
    map.invalidateSize();
    map.setView([organizacion.direccionesNormalizadas[0].coordenadas.y, organizacion.direccionesNormalizadas[0].coordenadas.x], 8);
    L.marker([organizacion.direccionesNormalizadas[0].coordenadas.y, organizacion.direccionesNormalizadas[0].coordenadas.x]).addTo(map);
}



function respuestaNormalizacion(normalizarURL, direccion) {
    let xhttp = new XMLHttpRequest();
    normalizarURL = normalizarURL + direccion;
    xhttp.open("GET", normalizarURL, false);
    xhttp.send();
    if (xhttp.status = 200) {
        let listaDirecciones = JSON.parse(xhttp.responseText);
        return listaDirecciones;
    }
}


function mostrarMapa(map, normalizarURL) {
    let direccion = document.getElementById("dirOrga").value;
    let organizacion = respuestaNormalizacion(normalizarURL, direccion);
    let divMapa = document.getElementById("map");
    divMapa.style.display = "block";
    map.invalidateSize();
    map.setView([organizacion.direccionesNormalizadas[0].coordenadas.y, organizacion.direccionesNormalizadas[0].coordenadas.x], 8);
    L.marker([organizacion.direccionesNormalizadas[0].coordenadas.y, organizacion.direccionesNormalizadas[0].coordenadas.x]).addTo(map);
    
}

function mostrarEnviar() {
    let divEnviar = document.getElementById("enviar");
    divEnviar.style.display = "block";
}


function camposNoVacios() {
    let nombre = document.getElementById("nombreOrga").value;
    let nrotel = document.getElementById("telOrganizacion").value;
    let descr = document.getElementById("descrpOrganizacion").value;
    if (nombre.length == 0) { 
        return false; 
    }
    if (nrotel.length == 0) { 
        return false; 
    }
    if (descr.length == 0) {
         return false; 
        }
    return true;
}



class Organizacion {
    constructor(nombre, telefono, x, y, descripcion, actividad) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.x = x;
        this.y = y;
        this.descripcion = descripcion;
        this.actividad = actividad;
    }
}
