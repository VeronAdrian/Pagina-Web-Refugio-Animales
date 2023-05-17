const registerForm = document.getElementById('formularioRegistro')
var errorText = ''

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.getElementById('userRegister').value
    const dni = document.getElementById('dniRegister').value
    const phone = document.getElementById('phoneRegister').value
    const mail = document.getElementById('mailRegister').value
    const password = document.getElementById('passwordRegister').value

    const users = JSON.parse(localStorage.getItem('users')) || []
    const isUserReg = users.find(user => user.mail === mail)

    if(validateData(name, dni, phone, mail, password)){
        register(name, dni, phone, mail, password)
    }

})

function register(name, dni, phone, mail, password){
    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push({name: name, dni: dni, phone: phone, mail: mail, password: password, admin: false, particular: true, organization: false, sponsor: false})
    localStorage.setItem('users', JSON.stringify(users))
    alert('Registro exitoso')
    return window.location="login.html"
}

function validateData(name, dni, phone, mail, password){
    validateName(name)
    validateDNI(dni)
    validatePhone(phone)
    validateMail(mail)
    validatePassword(password)

    if(errorText.length>1){
        alert(errorText)
        return false
    }
    else{
        return true
    }
}

function validateName(name){
    if(name.length<2 || name.length>30) {
        errorText +='Nombre invalido '
    }
}

function validateDNI(dni){
    if(dni.length!==8 || dni<10000000 || dni>50000000) {
        errorText +='El DNI ingresado no es valido '
    }
}

function validatePhone(phone){
    if(phone.length!==10) {
        errorText +='El telefono no es valido '
    }
}

function validateMail(mail){
    const users = JSON.parse(localStorage.getItem('users')) || []
    const isUserReg = users.find(user => user.mail === mail)
    if(isUserReg){
        return alert('El mail '+mail+' ya esta registrado.')
    }
    else if(!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(mail)){
        errorText += 'El mail es invalido '
    }
}

function validatePassword(password){
    if(password.length < 5 || password.length > 20) {
        errorText +='Contraseña invalida '
    }
}