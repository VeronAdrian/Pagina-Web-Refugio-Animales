function buscarAviso() {
    var nombre = document.getElementById("nombreAnimal").value;
    var edad = document.getElementById("edadAnimal").value;
  
    var avisos = document.getElementsByClassName("aviso");
    var resultado = document.getElementById("resultado");
  
    // Oculta todos los avisos
    for (var i = 0; i < avisos.length; i++) {
      avisos[i].style.display = "none";
    }
  
    if (nombre === "" || edad === "") {
      resultado.textContent =
        "Usted no ha ingresado ningún dato, por favor complete los campos.";
    } else {
      // Obtener datos del localStorage
      var datosFormulario = localStorage.getItem("datosFormulario");
  
      if (datosFormulario) {
        var datos = JSON.parse(datosFormulario);
  
        if (datos.nombre === nombre && datos.edad === edad) {
          resultado.innerHTML = ""; // Limpiar el resultado
          // Mostrar la foto
          var foto = document.createElement("img");
          foto.src = datos.imagen;
          foto.classList.add("aviso-imagen"); // Agrega la clase "aviso-imagen" al elemento
          resultado.appendChild(foto);
  
          // Mostrar el nombre
          var nombreElemento = document.createElement("h3");
          nombreElemento.textContent = datos.nombre;
          nombreElemento.classList.add("aviso-nombre"); // Agrega la clase "aviso-nombre" al elemento
          resultado.appendChild(nombreElemento);
  
          // Mostrar la edad
          var edadElemento = document.createElement("p");
          edadElemento.textContent = "Edad: " + datos.edad;
          edadElemento.classList.add("aviso-edad"); // Agrega la clase "aviso-edad" al elemento
          resultado.appendChild(edadElemento);
  
          // Mostrar la descripción
          var descripcionElemento = document.createElement("p");
          descripcionElemento.textContent = "Descripción: " + datos.comentario;
          descripcionElemento.classList.add("aviso-descripcion"); // Agrega la clase "aviso-descripcion" al elemento
          resultado.appendChild(descripcionElemento);
  
          // Mostrar el estado
          var estadoElemento = document.createElement("p");
          estadoElemento.textContent = "Estado: " + datos.estado;
          estadoElemento.classList.add("aviso-estado"); // Agrega la clase "aviso-estado" al elemento
          resultado.appendChild(estadoElemento);
  
          // Mostrar el aviso
          resultado.style.display = "block";
          resultado.classList.add("aviso", "aviso-border"); // Agrega la clase "aviso" y "aviso-border" al elemento
  
          // Crear el botón de adoptar
          var adoptarButton = document.createElement("button");
          adoptarButton.textContent = "Adoptar";
          adoptarButton.classList.add("aviso-button"); // Agrega la clase "aviso-button" al botón
          resultado.appendChild(adoptarButton);
  
          // Agregar evento de clic al botón de adoptar
          adoptarButton.addEventListener("click", function() {
            // Eliminar el aviso del DOM
            resultado.innerHTML = "";
  
            // Eliminar los datos del LocalStorage
            localStorage.removeItem("datosFormulario");
          });
        } else {
          resultado.textContent =
            "No se encontró ninguna mascota con los parámetros ingresados.";
        }
      } else {
        resultado.textContent = "No se encontraron datos en el LocalStorage.";
      }
    }
  }