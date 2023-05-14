const user = JSON.parse(localStorage.getItem('login_success')) || false
const profileData = document.getElementById('profileData')

profileData.innerHTML = "<h2>Bienvenido "+user.name+"</h2>"+
"<h3>Mail: "+user.mail+"</h3>"+
"<h3>DNI: "+user.dni+"</h3>"+
"<h3>Telefono: "+user.phone+"</h3>"+ "<h3>El perfil es de tipo: "+tipoUsuario(user)+"</h3>"

function tipoUsuario(user){
    if(user.admin){
        return "Admin"
    }
    if(user.particular){
        return "Particular"
    }
}