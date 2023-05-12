const registerForm = document.getElementById('formularioInicio')

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const mail = document.getElementById('mailLogin').value
    const password = document.getElementById('passwordLogin').value

    const users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = users.find(user => user.mail === mail && user.password === password)

    if(!validUser){
        return alert("Usuario y/o contraseña incorrectos")
    }
    else{
        alert("Bienvenido "+(validUser.name))
        localStorage.setItem('login_success', JSON.stringify(validUser))
        return window.location="index.html"
    }
})