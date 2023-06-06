function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var comentario = document.getElementById("campo_comentario").value;
    var imagenInput = document.getElementById("imagen");

    var imagen = imagenInput.value;
    var estado = "";

    // Verificar el estado seleccionado
    var perdidoCheckbox = document.getElementById("perdido");
    var adopcionCheckbox = document.getElementById("adopcion");

    if (perdidoCheckbox.checked) {
        estado = "Perdido";
    } else if (adopcionCheckbox.checked) {
        estado = "Adopción";
    }

    var datos = {
        nombre: nombre,
        edad: edad,
        imagen: imagen,
        comentario: comentario,
        estado: estado,
    };

    // Lee la imagen seleccionada y conviértela en una cadena de texto
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
        datos.imagen = event.target.result;

        // Guarda los datos en el LocalStorage
        localStorage.setItem("datosFormulario", JSON.stringify(datos));

        alert("Los datos se han almacenado correctamente.");
    };
    fileReader.readAsDataURL(imagenInput.files[0]);
}
