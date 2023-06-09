class Aviso {
  constructor(imagen, especie, nombre, edad, descripcion, estado) {
    this.imagen = imagen;
    this.especie = especie;
    this.nombre = nombre;
    this.edad = edad;
    this.descripcion = descripcion;
    this.estado = estado;
  }
}
var Avisos = [];
$(document).ready(function () {

  var resultado = document.getElementById("resultado");
  crearAvisos(Avisos);
  armarContenedorAvisos(Avisos, resultado);
  mostrarAvisos(resultado);

  function mostrarAvisos(resultado) {
    resultado.style.display = "block";
    resultado.classList.add("aviso", "aviso-border");
  }
});

function crearAvisos(Avisos) {
  let imagen = "img/Momo.jpg";
  let especie = "perro";
  let nombre = "momo";
  let edad = "4";
  let descripcion = "Hola soy momo el perro";
  let estado = "En adopcion";

  let aviso1 = new Aviso(imagen, especie, nombre, edad, descripcion, estado);
  Avisos.push(aviso1);

  let imagen2 = "img/conejo.jpg";
  let especie2 = "conejo";
  let nombre2 = "patan";
  let edad2 = "3";
  let descripcion2 = "Hola soy patan el Conejo";
  let estado2 = "Perdido";

  let aviso2 = new Aviso(imagen2, especie2, nombre2, edad2, descripcion2, estado2);
  Avisos.push(aviso2);

  let datosFormulario = localStorage.getItem("datosFormulario");
  if (datosFormulario && Avisos.length === 2) {
    let aviso = JSON.parse(datosFormulario);

    let avisoGuardado = new Aviso(
      aviso.imagen,
      aviso.especie,
      aviso.nombre,
      aviso.edad,
      aviso.comentario, // Corregido
      aviso.estado
    );
    Avisos.push(avisoGuardado);
  }
}

  function armarContenedorAvisos(Avisos, resultado) {
    for (let i = 0; i < Avisos.length; i++) {
      let contenedorAvisos = document.createElement("div");
      contenedorAvisos.classList.add("contenedor");

      let imagen = document.createElement("img");
      imagen.src = Avisos[i].imagen;
      imagen.classList.add("aviso-imagen");
      contenedorAvisos.appendChild(imagen);

      let liNombre = document.createElement("li");
      let liEspecie = document.createElement("li");
      let liEdad = document.createElement("li");
      let liDescripcion = document.createElement("li");
      let liEstado = document.createElement("li");

      liNombre.textContent = "Nombre: " + Avisos[i].nombre;
      liNombre.classList.add("aviso-nombre");
      contenedorAvisos.append(liNombre);

      liEspecie.textContent = "Especie: " + Avisos[i].especie;
      liEspecie.classList.add("aviso-nombre");
      contenedorAvisos.append(liEspecie);

      liEdad.textContent = "Edad: " + Avisos[i].edad;
      liEdad.classList.add("aviso-edad");
      contenedorAvisos.append(liEdad);

      liDescripcion.textContent = "Descripcion: " + Avisos[i].descripcion;
      liDescripcion.classList.add("aviso-descripcion");
      contenedorAvisos.append(liDescripcion);

      liEstado.textContent = "Estado: " + Avisos[i].estado;
      liEstado.classList.add("aviso-estado");
      contenedorAvisos.append(liEstado);

      let adoptarButton = document.createElement("button");
      adoptarButton.textContent = "Adoptar";
      adoptarButton.classList.add("aviso-button");
      contenedorAvisos.append(adoptarButton);

      adoptarButton.addEventListener("click", function () {
        contenedorAvisos.remove();
        Avisos.splice(i, 1);
      });

      resultado.append(contenedorAvisos);
    }
  }

  function buscarAviso(event) {
    event.preventDefault();
  
    var especieAnimal = document.getElementById("especieAnimal").value;
    var adopcionCheckbox = document.getElementById("adopcionCheckbox").checked;
    var perdidoCheckbox = document.getElementById("perdidoCheckbox").checked;
    var ambosCheckbox = document.getElementById("ambosCheckbox").checked; // Nuevo
  
    var resultado = document.getElementById("resultado");
  
    if (especieAnimal.trim() === "" || (!adopcionCheckbox && !perdidoCheckbox && !ambosCheckbox)) { // Modificado
        alert("Debe completar todos los datos del formulario");
        return;
    }
  
    resultado.innerHTML = "";
  
    for (let i = 0; i < Avisos.length; i++) {
        let aviso = Avisos[i];
  
        if (
            especieAnimal.trim() !== "" &&
            aviso.especie !== undefined &&
            aviso.especie.toLowerCase() === especieAnimal.toLowerCase() &&
            ((adopcionCheckbox && aviso.estado === "En adopcion") ||
            (perdidoCheckbox && aviso.estado === "Perdido") ||
            ambosCheckbox) // Modificado
        ) {
            let contenedorAvisos = document.createElement("div");
            contenedorAvisos.classList.add("contenedor");
  
            let imagen = document.createElement("img");
            imagen.src = aviso.imagen;
            imagen.classList.add("aviso-imagen");
            contenedorAvisos.appendChild(imagen);
  
            let liNombre = document.createElement("li");
            let liEspecie = document.createElement("li");
            let liEdad = document.createElement("li");
            let liDescripcion = document.createElement("li");
            let liEstado = document.createElement("li");
  
            liNombre.textContent = "Nombre: " + aviso.nombre;
            liNombre.classList.add("aviso-nombre");
            contenedorAvisos.append(liNombre);
  
            liEspecie.textContent = "Especie: " + aviso.especie;
            liEspecie.classList.add("aviso-nombre");
            contenedorAvisos.append(liEspecie);
  
            liEdad.textContent = "Edad: " + aviso.edad;
            liEdad.classList.add("aviso-edad");
            contenedorAvisos.append(liEdad);
  
            liDescripcion.textContent = "Descripcion: " + aviso.descripcion;
            liDescripcion.classList.add("aviso-descripcion");
            contenedorAvisos.append(liDescripcion);
  
            liEstado.textContent = "Estado: " + aviso.estado;
            liEstado.classList.add("aviso-estado");
            contenedorAvisos.append(liEstado);
  
            let adoptarButton = document.createElement("button");
            adoptarButton.textContent = "Adoptar";
            adoptarButton.classList.add("aviso-button");
            contenedorAvisos.append(adoptarButton);
  
            adoptarButton.addEventListener("click", function () {
                contenedorAvisos.remove();
                Avisos.splice(i, 1);
            });
  
            resultado.append(contenedorAvisos);
        }
    }
  }
  
  var formularioAvisos = document.getElementById("formularioAvisos");
  formularioAvisos.addEventListener("submit", buscarAviso);

  $("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    checkedOnClick(this)
  });

  function checkedOnClick(el){

    // Select all checkboxes by class
    var checkboxesList = document.getElementsByClassName("checkoption");
    for (var i = 0; i < checkboxesList.length; i++) {
       checkboxesList.item(i).checked = false; // Uncheck all checkboxes
    }
    el.checked = true; // Checked clicked checkbox
 }