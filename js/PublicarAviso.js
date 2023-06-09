function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var especie = document.getElementById("especie").value;
    var comentario = document.getElementById("comentario").value;
    var imagenInput = document.getElementById("imagen");

    var estado = "";

    var perdidoCheckbox = document.getElementById("perdido");
    var adopcionCheckbox = document.getElementById("adopcion");

    if (perdidoCheckbox.checked) {
        estado = "Perdido";
    } else if (adopcionCheckbox.checked) {
        estado = "Adopción";
    }

    var fileReader = new FileReader();
    fileReader.onload = function(event) {
        var imagen = event.target.result;

        var datos = {
            nombre: nombre,
            edad: edad,
            especie: especie,
            imagen: imagen,
            comentario: comentario,
            estado: estado,
        };

        localStorage.setItem("datosFormulario", JSON.stringify(datos));

        alert("Los datos se han almacenado correctamente.");
    };

    if (imagenInput.files && imagenInput.files[0]) {
        fileReader.readAsDataURL(imagenInput.files[0]);
    } else {
        alert("Selecciona una imagen válida.");
    }
}
