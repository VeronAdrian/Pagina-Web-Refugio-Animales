
function validarEmail(valor) {
    if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(valor)){
        return true;
    } else {
        alert("La dirección de email es incorrecta.");
        return false;
    }
  }

function prueba(text){
    var personas = convertirArray(leerTXT("datos/personas.txt"));
    for(var i=0; i<personas.length; i++){
        document.write("<h2>Persona: "+personas[i]+"</h2><br/>");
        document.write("Mascota: "+personas[i]+"<br/>");
        document.write("<br/>");
    }
}

function leerTXT(direccion){
    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", direccion, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null)
    return allText;
}

function convertirArray(text){
    var array = [];
    var palabra ="";
    for(var i=0; i<text.length; i++){
        if(text[i]=="-"){
            array.push(palabra);
            palabra ="";
        }
        else if(text[i]!=" "){
            palabra += text[i];
        }
    }
    return array;
}