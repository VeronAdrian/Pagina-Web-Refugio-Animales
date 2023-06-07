
$(document).ready(function () {
    let botonConfirmar = document.getElementById("botonConfirmar");
    let botonCancel = document.getElementById("botonCancel");
    if (localStorage.length == 0) {
        var organizaciones = [];
        crearOrganizacion(organizaciones);
        window.localStorage.setItem("organizaciones", JSON.stringify(organizaciones));
    }
    else {
        let organizaciones = JSON.parse(window.localStorage.getItem("organizaciones"));
        let botonEnviar = document.getElementById("botonEnviar");
        botonEnviar.addEventListener("click", function () {
            
            let xhttp = new XMLHttpRequest();
            let direccion = document.getElementById("dirOrga").value;
            let normalizarURL = "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=";
            normalizarURL = normalizarURL + direccion;
            
            xhttp.open("GET", normalizarURL, false);
            xhttp.send();

            if (xhttp.status = 200) {
                let listaDirecciones = JSON.parse(xhttp.responseText);
                if (direccionInvalida(listaDirecciones)) {
                    alert("La direccion de la organizacion es invalida");
                }
                else if (listaDirecciones.direccionesNormalizadas.length > 1) {
                    llenarSelector(listaDirecciones)
                    mostrarSelect();
                    console.log(listaDirecciones);
                }
                else {
                    console.log(listaDirecciones.direccionesNormalizadas);
                    organizaciones.push(añadirOrganizacion(listaDirecciones));
                    window.localStorage.setItem("organizaciones", JSON.stringify(organizaciones));
                }
            }
        });
    }
    botonConfirmar.addEventListener("click",function(){
        let select = document.getElementById("direcciones");
        let opcionElegida =select.options[select.selectedIndex].value;
        let organizacion = JSON.parse(opcionElegida);
        console.log(organizacion);
        //añadirOrganizacion(organizacion);
        ocultarSelect();
    });
    botonCancel.addEventListener("click",function(){
        ocultarSelect();
        limpiarSelect();
    });

});


function crearOrganizacion(organizaciones) {
    let nombre = "Luz Del Alma";
    let telefono = "0237 462-3491";
    let x = -58.7970394704081;
    let y = -34.648663494898;
    let orga1 = new Organizacion(nombre, telefono, x, y);
    organizaciones.push(orga1);

    let nombre2 = "Luz Del Alma";
    let telefono2 = "0237 462-3491";
    let x2 = -34.61315;
    let y2 = -58.37723;
    let orga2 = new Organizacion(nombre2, telefono2, x2, y2);
    organizaciones.push(orga2);

}

class Organizacion {
    constructor(nombre, telefono, x, y) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.x = x;
        this.y = y;
    }
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

function añadirOrganizacion(listaDireccion) {
    let nombre = document.getElementById("nombreOrga").value;
    let nrotel = document.getElementById("telOrganizacion").value;
    let x = listaDireccion.direccionesNormalizadas[0].coordenadas.x;
    let y = listaDireccion.direccionesNormalizadas[0].coordenadas.y;
    let organizacion = new Organizacion(nombre, nrotel, y, x);
    return organizacion;
}

function mostrarSelect(){
    let fondoSelect = document.getElementById("fondoSelect");
    let contSelect = document.getElementById("contenedorSelect");
    contSelect.style.display="block";
    fondoSelect.style.display="block";
}


function ocultarSelect (){
    let fondoSelect = document.getElementById("fondoSelect");
    let contSelect = document.getElementById("contenedorSelect");
    contSelect.style.display="none";
    fondoSelect.style.display="none";
}

function limpiarSelect (){
    let select = document.getElementById("direcciones");
    for (let i = select.length;i>=0; i--){
        select.remove(i);
    }
}